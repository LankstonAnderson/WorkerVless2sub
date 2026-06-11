#!/usr/bin/env python3
"""
CloudflareSpeedTest 测速 + 上传脚本
功能：运行 CFST 测速，通过 gh CLI 提交 PR 到 GitHub
依赖：Python 3 标准库 + gh CLI（已登录）
"""

import os
import sys
import subprocess
import datetime
import zoneinfo

# ==================== 配置区 ====================

# --- GitHub ---
GITHUB_REPO = "LankstonAnderson/WorkerVless2sub"  # 目标仓库
FORK_OWNER = "Chappie743"  # 你的 fork 用户名
GITHUB_FILE_PATH = "result.csv"  # 仓库中的文件路径

# --- CFST ---
CFST_BIN = "/home/Chappie/cfst/cfst"
CFST_IP_FILE = "/home/Chappie/cfst/ip.txt"
CFST_IP_LIMIT = 50  # 最多测前 N 个 IP
CFST_ARGS = ["-tl", "200", "-tll", "0", "-tlr", "0.2",
             "-sl", "1", "-dn", "10", "-dt", "5",
             "-p", "0", "-n", "500"]
RESULT_CSV = "/home/Chappie/cfst/result.csv"

# ==================== 工具函数 ====================

def run(cmd, check=True):
    """执行命令"""
    env = os.environ.copy()
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, env=env)
    if check and result.returncode != 0:
        print(f"❌ 命令失败: {cmd}")
        print(f"   {result.stderr.strip()}")
        return None
    return result.stdout.strip()

# ==================== CFST 测速 ====================

def check_config():
    if not os.path.isfile(CFST_BIN):
        print(f"❌ CFST 不存在: {CFST_BIN}")
        sys.exit(1)

    # 检查 gh 是否已登录
    result = run("gh auth status", check=False)
    if result is None or "Logged in" not in (result or ""):
        print("❌ gh 未登录，请先运行: gh auth login")
        sys.exit(1)

def run_speedtest():
    print("🚀 CloudflareSpeedTest 测速...")
    print(f"   参数: {' '.join(CFST_ARGS)}")
    print()

    # 限制 IP 数量
    with open(CFST_IP_FILE) as f:
        ips = [line.strip() for line in f if line.strip()]
    print(f"   原始 IP 池: {len(ips)} 个，取前 {CFST_IP_LIMIT} 个")
    limited_ip_file = CFST_IP_FILE + ".limited"
    with open(limited_ip_file, 'w') as f:
        f.write('\n'.join(ips[:CFST_IP_LIMIT]))

    cmd = f"{CFST_BIN} -f {limited_ip_file} -o {RESULT_CSV} {' '.join(CFST_ARGS)}"
    result = subprocess.run(cmd, shell=True, cwd=os.path.dirname(CFST_BIN))

    if result.returncode != 0:
        print(f"❌ CFST 失败，退出码: {result.returncode}")
        sys.exit(1)

    if not os.path.isfile(RESULT_CSV):
        print("❌ 未生成结果文件")
        sys.exit(1)

    with open(RESULT_CSV, 'r') as f:
        lines = f.readlines()
        total = len(lines) - 1  # 减去表头
        # 统计有速度的 IP
        has_speed = sum(1 for line in lines[1:] if float(line.split(',')[5]) > 0)
    print(f"\n✅ 测速完成，共 {total} 个 IP，{has_speed} 个有速度")

# ==================== GitHub PR ====================

def upload_to_github():
    """通过 gh CLI 提交 PR"""
    print("\n📦 提交到 GitHub...")

    tz = zoneinfo.ZoneInfo("Asia/Shanghai")
    today = datetime.datetime.now(tz).strftime("%Y-%m-%d")
    branch_name = f"speedtest/{today}"

    # 1. 创建分支
    print(f"   1/4 创建分支 {branch_name}...", end=" ")
    run(f"gh api repos/{GITHUB_REPO}/git/refs/heads/main")
    run(f"git checkout -B {branch_name}", check=False)
    print("✅")

    # 2. 复制结果文件
    print(f"   2/4 复制结果文件...", end=" ")
    # 提取有速度的 IP（过滤 0MB）
    with open(RESULT_CSV, 'r') as f:
        lines = f.readlines()
        header = lines[0]
        filtered = [header] + [l for l in lines[1:] if float(l.split(',')[5]) > 0]

    with open(GITHUB_FILE_PATH, 'w') as f:
        f.writelines(filtered)
    print(f"✅ ({len(filtered)-1} 个有速度 IP)")

    # 3. 提交并推送
    print(f"   3/4 提交并推送...", end=" ")
    run(f"git add {GITHUB_FILE_PATH}")
    run(f'git commit -m "cfst: {today}"', check=False)
    run(f"git push -u fork {branch_name} --force", check=False)
    print("✅")

    # 4. 创建 PR
    print(f"   4/4 创建 PR...", end=" ")
    result = run(f'gh pr create --repo {GITHUB_REPO} --head {FORK_OWNER}:{branch_name} --base main '
                 f'--title "cfst: {today}" --body "自动测速结果"', check=False)
    if result and "already exists" in result:
        print("⚠️ PR 已存在")
    else:
        print("✅")

    # 切回 main
    run("git checkout main", check=False)

    print(f"\n   PR: https://github.com/{GITHUB_REPO}/pulls")

# ==================== 主流程 ====================

def main():
    print("=" * 50)
    print("  CloudflareSpeedTest → GitHub PR")
    print("=" * 50)
    print()

    check_config()
    run_speedtest()
    upload_to_github()

    print()
    print("=" * 50)
    print("  ✅ 完成！")
    print("=" * 50)

if __name__ == "__main__":
    main()
