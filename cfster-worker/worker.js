/**
 * cfster-reader — Cloudflare R2 测速结果读取 Worker
 *
 * 功能：从 R2 bucket 读取 CloudflareSpeedTest 测速结果并返回
 *
 * 路由：
 *   GET /latest.csv          — 最新测速结果
 *   GET /history/YYYY-MM-DD.csv — 历史测速结果
 *
 * 可选 Token 验证：
 *   设置环境变量 CFST_TOKEN 后，访问时需要带 token 参数或头
 */

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname;

		// Token 验证（可选）
		if (env.CFST_TOKEN) {
			const token = url.searchParams.get('token') ||
						  request.headers.get('X-Auth-Token');
			if (token !== env.CFST_TOKEN) {
				return new Response('Unauthorized', { status: 401 });
			}
		}

		// 检查 R2 绑定
		if (!env.CFST_R2) {
			return new Response('R2 bucket not configured', { status: 500 });
		}

		// 路由处理
		let r2Key = '';

		if (path === '/' || path === '/latest.csv') {
			r2Key = 'speedtest/latest.csv';
		} else if (path.startsWith('/history/')) {
			const filename = path.replace('/history/', '');
			// 验证文件名格式：YYYY-MM-DD.csv
			if (/^\d{4}-\d{2}-\d{2}\.csv$/.test(filename)) {
				r2Key = `speedtest/${filename}`;
			} else {
				return new Response('Invalid date format. Use: /history/YYYY-MM-DD.csv', { status: 400 });
			}
		} else if (path === '/list') {
			// 列出所有历史文件
			try {
				const listed = await env.CFST_R2.list({ prefix: 'speedtest/', limit: 100 });
				const files = listed.objects.map(obj => ({
					key: obj.key,
					size: obj.size,
					modified: obj.modified,
				}));
				return new Response(JSON.stringify(files, null, 2), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} catch (e) {
				return new Response(`Error listing files: ${e.message}`, { status: 500 });
			}
		} else {
			return new Response('Not Found. Use: /latest.csv, /history/YYYY-MM-DD.csv, /list', { status: 404 });
		}

		// 从 R2 读取文件
		try {
			const object = await env.CFST_R2.get(r2Key);

			if (!object) {
				return new Response('File not found', { status: 404 });
			}

			const headers = new Headers();
			object.writeHttpMetadata(headers);
			headers.set('etag', object.httpEtag);
			headers.set('Content-Type', 'text/csv; charset=utf-8');
			headers.set('Access-Control-Allow-Origin', '*');
			headers.set('Cache-Control', 'max-age=3600'); // 缓存1小时

			return new Response(object.body, { headers });
		} catch (e) {
			return new Response(`Error reading from R2: ${e.message}`, { status: 500 });
		}
	},
};
