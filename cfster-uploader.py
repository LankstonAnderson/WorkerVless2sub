#!/usr/bin/env python3
"""
CloudflareSpeedTest 测速 + 多端上传脚本
功能：运行 CFST 测速，将结果上传到：
  1. Cloudflare R2（私有存储）
  2. GitHub 仓库（公开/私有）
依赖：Python 3 标准库（无需 pip 安装）
"""

import os
import sys
import subprocess
import hashlib
import hmac
import base64
import json
import datetime
import urllib.request
import urllib.parse
import urllib.error

# ==================== 配置区 ====================

# --- Cloudflare R2 ---
R2_ENABLED = True             # 是否启用 R2 上传
R2_ACCOUNT_ID = ""            # Cloudflare 账户 ID
R2_ACCESS_KEY_ID = ""         # R2 Access Key ID
R2_SECRET_ACCESS_KEY = ""    # R2 Secret Access Key
R2_BUCKET_NAME = "cfst-results"
R2_REGION = "auto"

# --- GitHub ---
GITHUB_ENABLED = True         # 是否启用 GitHub 上传
GITHUB_TOKEN = ""            # GitHub Personal Access Token
GITHUB_REPO = ""              # 仓库，格式：用户名/仓库名，如 "LankstonAnderson/cfst-results"
GITHUB_FILE_PATH = "result.csv"  # 仓库中的文件路径

# --- CFST ---
CFST_BIN = "/home/Chappie/cfst/cfst"
CFST_IP_FILE = "/home/Chappie/cfst/ip.txt"
CFST_ARGS = ["-tl", "200", "-dn", "10", "-sl", "5", "-p", "0"]
RESULT_CSV = "/home/Chappie/cfst/result.csv"

# --- 代理 ---
PROXY = "http://192.168.101.30:7897"

# ==================== 通用工具 ====================

def get_opener():
    """获取带代理的 URL opener"""
    proxy_handler = urllib.request.ProxyHandler({
        'http': PROXY,
        'https': PROXY,
    })
    return urllib.request.build_opener(proxy_handler)

def http_request(url, method='GET', data=None, headers=None):
    """发送 HTTP 请求（带代理）"""
    opener = get_opener()
    if isinstance(data, str):
        data = data.encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    try:
        resp = opener.open(req)
        return resp.status, resp.read().decode('utf-8', errors='replace')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', errors='replace')

# ==================== AWS Signature V4（R2）====================

def sha256_hash(data):
    if isinstance(data, str):
        data = data.encode('utf-8')
    return hashlib.sha256(data).hexdigest()

def hmac_sha256(key, msg):
    if isinstance(key, str):
        key = key.encode('utf-8')
    if isinstance(msg, str):
        msg = msg.encode('utf-8')
    return hmac.new(key, msg, hashlib.sha256).digest()

def get_signature_key(secret_key, date_stamp, region, service):
    k_date = hmac_sha256(("AWS4" + secret_key).encode('utf-8'), date_stamp)
    k_region = hmac_sha256(k_date, region)
    k_service = hmac_sha256(k_region, service)
    return hmac_sha256(k_service, "aws4_request")

def upload_to_r2(local_path, r2_key):
    """上传文件到 R2"""
    if not all([R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY]):
        print("⚠️  R2 凭据未配置，跳过 R2 上传")
        return False

    if not os.path.isfile(local_path):
        print(f"⚠️  文件不存在: {local_path}")
        return False

    with open(local_path, 'rb') as f:
        file_data = f.read()

    t = datetime.datetime.utcnow()
    amz_date = t.strftime('%Y%m%dT%H%M%SZ')
    date_stamp = t.strftime('%Y%m%d')

    host = f"{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
    canonical_uri = f"/{R2_BUCKET_NAME}/{r2_key}"
    content_type = "text/csv"
    payload_hash = sha256_hash(file_data)

    canonical_headers = f"content-type:{content_type}\nhost:{host}\nx-amz-content-sha256:{payload_hash}\nx-amz-date:{amz_date}\n"
    signed_headers = "content-type;host;x-amz-content-sha256;x-amz-date"
    canonical_request = f"PUT\n{canonical_uri}\n\n{canonical_headers}\n{signed_headers}\n{payload_hash}"

    algorithm = "AWS4-HMAC-SHA256"
    credential_scope = f"{date_stamp}/{R2_REGION}/s3/aws4_request"
    string_to_sign = f"{algorithm}\n{amz_date}\n{credential_scope}\n{sha256_hash(canonical_request)}"

    signing_key = get_signature_key(R2_SECRET_ACCESS_KEY, date_stamp, R2_REGION, "s3")
    signature = hmac.new(signing_key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()

    authorization = f"{algorithm} Credential={R2_ACCESS_KEY_ID}/{credential_scope}, SignedHeaders={signed_headers}, Signature={signature}"

    url = f"https://{host}{canonical_uri}"
    headers = {
        "Content-Type": content_type,
        "Host": host,
        "x-amz-content-sha256": payload_hash,
        "x-amz-date": amz_date,
        "Authorization": authorization,
    }

    print(f"📤 R2: {r2_key} ({len(file_data)} bytes)", end=" ")
    status, body = http_request(url, 'PUT', file_data, headers)
    if status == 200:
        print("✅")
        return True
    else:
        print(f"❌ HTTP {status}")
        return False

# ==================== GitHub PR API ====================

def github_api(method, path, data=None):
    """调用 GitHub API"""
    url = f"https://api.github.com{path}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "cfster-uploader",
    }
    if data is not None:
        headers["Content-Type"] = "application/json"
    return http_request(url, method, json.dumps(data) if data else None, headers)

def github_api_json(method, path, data=None):
    """调用 GitHub API 并解析 JSON"""
    status, body = github_api(method, path, data)
    try:
        return status, json.loads(body)
    except:
        return status, body

def upload_to_github_pr(local_path):
    """通过 GitHub PR 上传测速结果
    流程：创建分支 → 提交文件 → 创建 PR
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        print("⚠️  GitHub 凭据未配置，跳过 GitHub 上传")
        return False

    if not os.path.isfile(local_path):
        print(f"⚠️  文件不存在: {local_path}")
        return False

    with open(local_path, 'r') as f:
        content = f.read()

    today = datetime.date.today().isoformat()
    branch_name = f"speedtest/{today}"
    file_content_b64 = base64.b64encode(content.encode('utf-8')).decode('utf-8')

    # 1. 获取仓库默认分支
    print(f"   1/5 获取仓库信息...", end=" ")
    status, repo_info = github_api_json('GET', f"/repos/{GITHUB_REPO}")
    if status != 200:
        print(f"❌ 无法获取仓库信息")
        return False
    default_branch = repo_info.get('default_branch', 'main')
    print(f"✅ (默认分支: {default_branch})")

    # 2. 获取默认分支最新 commit SHA
    print(f"   2/5 获取最新 commit...", end=" ")
    status, ref_info = github_api_json('GET', f"/repos/{GITHUB_REPO}/git/ref/heads/{default_branch}")
    if status != 200:
        print(f"❌ 无法获取分支引用")
        return False
    latest_sha = ref_info['object']['sha']
    print(f"✅ ({latest_sha[:8]})")

    # 3. 创建新分支
    print(f"   3/5 创建分支 {branch_name}...", end=" ")
    # 检查分支是否已存在
    status, _ = github_api_json('GET', f"/repos/{GITHUB_REPO}/git/ref/heads/{branch_name}")
    if status == 200:
        # 分支已存在，删除旧分支
        github_api('DELETE', f"/repos/{GITHUB_REPO}/git/refs/heads/{branch_name}")

    status, new_ref = github_api_json('POST', f"/repos/{GITHUB_REPO}/git/refs", {
        "ref": f"refs/heads/{branch_name}",
        "sha": latest_sha,
    })
    if status not in (200, 201):
        print(f"❌ 创建分支失败")
        return False
    print("✅")

    # 4. 在新分支上提交文件
    print(f"   4/5 提交文件...", end=" ")
    # 先尝试获取文件 SHA（如果存在于默认分支）
    status, file_info = github_api_json('GET', f"/repos/{GITHUB_REPO}/contents/{GITHUB_FILE_PATH}?ref={default_branch}")
    file_sha = None
    if status == 200 and isinstance(file_info, dict):
        file_sha = file_info.get('sha')

    payload = {
        "message": f"cfst: update speedtest {today}",
        "content": file_content_b64,
        "branch": branch_name,
    }
    # 如果文件已存在，需要其 SHA 来更新
    if file_sha:
        status2, file_on_branch = github_api_json('GET', f"/repos/{GITHUB_REPO}/contents/{GITHUB_FILE_PATH}?ref={branch_name}")
        if status2 == 200 and isinstance(file_on_branch, dict):
            payload["sha"] = file_on_branch['sha']

    status, result = github_api_json('PUT', f"/repos/{GITHUB_REPO}/contents/{GITHUB_FILE_PATH}", payload)
    if status not in (200, 201):
        print(f"❌ 提交失败 (HTTP {status})")
        if isinstance(result, dict):
            print(f"   {result.get('message', '')}")
        return False
    print("✅")

    # 5. 创建 Pull Request
    print(f"   5/5 创建 PR...", end=" ")
    pr_title = f"cfst: speedtest result {today}"
    pr_body = f"## CloudflareSpeedTest 测速结果\n\n日期：{today}\n\n自动提交，由 cfster-uploader 生成。"

    status, pr = github_api_json('POST', f"/repos/{GITHUB_REPO}/pulls", {
        "title": pr_title,
        "body": pr_body,
        "head": branch_name,
        "base": default_branch,
    })

    if status in (200, 201) and isinstance(pr, dict):
        pr_url = pr.get('html_url', '')
        pr_number = pr.get('number', '')
        print(f"✅")
        print(f"   PR #{pr_number}: {pr_url}")

        # raw URL 用于 ADDCSV（PR 合并前也可以通过 branch raw URL 访问）
        raw_url = f"https://raw.githubusercontent.com/{GITHUB_REPO}/{branch_name}/{GITHUB_FILE_PATH}"
        print(f"   Raw URL: {raw_url}")
        return True
    else:
        print(f"❌ 创建 PR 失败 (HTTP {status})")
        if isinstance(pr, dict):
            msg = pr.get('message', '')
            if 'already exists' in str(msg).lower():
                print(f"   PR 可能已存在，检查: https://github.com/{GITHUB_REPO}/pulls")
        return False

# ==================== CFST 测速 ====================

def check_config():
    errors = []
    if R2_ENABLED and not R2_ACCOUNT_ID:
        errors.append("R2_ENABLED=True 但 R2_ACCOUNT_ID 未设置")
    if GITHUB_ENABLED and not GITHUB_TOKEN:
        errors.append("GITHUB_ENABLED=True 但 GITHUB_TOKEN 未设置")
    if errors:
        print("❌ 配置错误：")
        for e in errors:
            print(f"   - {e}")
        sys.exit(1)

    if not os.path.isfile(CFST_BIN):
        print(f"❌ CFST 不存在: {CFST_BIN}")
        sys.exit(1)

def run_speedtest():
    print("🚀 CloudflareSpeedTest 测速...")
    print(f"   参数: {' '.join(CFST_ARGS)}")
    print()

    cmd = [CFST_BIN, "-f", CFST_IP_FILE, "-o", RESULT_CSV] + CFST_ARGS
    result = subprocess.run(cmd, cwd=os.path.dirname(CFST_BIN))

    if result.returncode != 0:
        print(f"❌ CFST 失败，退出码: {result.returncode}")
        sys.exit(1)

    if not os.path.isfile(RESULT_CSV):
        print("❌ 未生成结果文件")
        sys.exit(1)

    with open(RESULT_CSV, 'r') as f:
        count = max(0, len(f.readlines()) - 1)
    print(f"\n✅ 测速完成，共 {count} 个结果")

# ==================== 主流程 ====================

def main():
    print("=" * 50)
    print("  CloudflareSpeedTest 测速 + 多端上传")
    print("=" * 50)
    print()

    check_config()
    run_speedtest()

    today = datetime.date.today().isoformat()
    results = []

    # R2 上传
    if R2_ENABLED:
        print(f"\n📦 R2 上传...\n")
        results.append(("R2 latest", upload_to_r2(RESULT_CSV, "speedtest/latest.csv")))
        results.append((f"R2 {today}", upload_to_r2(RESULT_CSV, f"speedtest/{today}.csv")))

    # GitHub 上传
    if GITHUB_ENABLED:
        print(f"\n📦 GitHub 上传...\n")
        results.append(("GitHub PR", upload_to_github_pr(RESULT_CSV)))

    # 汇总
    print()
    print("=" * 50)
    print("  结果汇总")
    print("=" * 50)
    for name, ok in results:
        status = "✅" if ok else "❌"
        print(f"  {status} {name}")

    print()
    print("WorkerVless2sub ADDCSV 可设置为：")
    if GITHUB_ENABLED and GITHUB_REPO:
        print(f"  GitHub:  PR 分支的 raw URL（见上方输出）")
        print(f"  或合并后: https://raw.githubusercontent.com/{GITHUB_REPO}/main/{GITHUB_FILE_PATH}")
    if R2_ENABLED:
        print(f"  R2:     你的cfster-worker URL/latest.csv")

if __name__ == "__main__":
    main()
