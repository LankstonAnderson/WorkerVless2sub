
let 速报通道 = ['auto'];
let 端点集 = [];
let 端点接口集 = [];

let 无密端点集 = [];
let 无密端点接口集 = [];

let 体检表集 = [];
let 速度下限 = 7;
let 备注偏移 = 1;//CSV备注所在列偏移量

let 转换后端 = 'SUBAPI.cmliussss.net';
let 配置源 = atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2NtbGl1L0FDTDRTU1IvbWFpbi9DbGFzaC9jb25maWcvQUNMNFNTUl9PbmxpbmVfRnVsbF9NdWx0aU1vZGUuaW5p');
let 协议头 = 'https';
let 无加密 = 'false';
let 外链;
let 隧道签名 = atob('ZWQ=');
let 获取中转;
let 中转IP集 = [
	atob('cHJveHlpcC5meHhrLmRlZHluLmlv'),
];
let 匹配中转IP = [];
let 袜套5数据源 = '';
let 机器人令牌 = '';
let 聊天号 = '';
let 临时跳板 = [];
let 临时跳板源 = '';
let 后缀 = '';
let 协议标识 = atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`);
let 档案名 = '优选订阅生成器';
let 更新间隔 = 6;
let 总量 = 24;
let 时间戳 = 4102329600000;
const 地址正则 = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[.*\]):?(\d+)?#?(.*)?$/;
let 假油爱滴;
let 假豪斯特;
let 安全端口集 = ["2053", "2083", "2087", "2096", "8443"];
let 保鲜期 = 7;
let 刷新点 = 3;
let MamaJustKilledAMan = ['telegram', 'twitter', 'miaoko'];
let 中转IP池 = [];
let 袜套5数据;
let 爱剖恩 = '';
let 页脚信息 = `<a href='https://t.me/CMLiussss'>萌ICP备-20240707号</a>`;//写你自己的维护者广告
let 附加码 = '0';
let 加密策略 = 'auto';
let 页签图标, 头像框, 背景图, 扩展头 = '';
const 无效地区集 = new Set(['', 'N/A', 'N\\A', 'NONE', 'NULL', 'UNKNOWN', 'UNKNOW', '-', '--']);
const 机场映射 = {
	AMS: 'NL', ARN: 'SE', ATH: 'GR', ATL: 'US', AKL: 'NZ', BAH: 'BH', BCN: 'ES', BKK: 'TH',
	BLR: 'IN', BNE: 'AU', BOG: 'CO', BOM: 'IN', BOS: 'US', BRU: 'BE', BUD: 'HU', CAI: 'EG',
	CDG: 'FR', CGK: 'ID', CPH: 'DK', CPT: 'ZA', DEL: 'IN', DEN: 'US', DFW: 'US', DOH: 'QA',
	DTW: 'US', DUB: 'IE', DUS: 'DE', DXB: 'AE', EDI: 'GB', EWR: 'US', EZE: 'AR', FCO: 'IT',
	FRA: 'DE', GIG: 'BR', GRU: 'BR', HAM: 'DE', HAN: 'VN', HEL: 'FI', HKG: 'HK', HYD: 'IN',
	IAD: 'US', ICN: 'KR', IST: 'TR', JED: 'SA', JNB: 'ZA', KIX: 'JP', KUL: 'MY', KWI: 'KW',
	LAS: 'US', LAX: 'US', LIM: 'PE', LIS: 'PT', LHR: 'GB', MAD: 'ES', MAN: 'GB', MAA: 'IN',
	MCI: 'US', MEL: 'AU', MEX: 'MX', MIA: 'US', MLE: 'MV', MNL: 'PH', MSP: 'US', MXP: 'IT',
	MUC: 'DE', NBO: 'KE', NRT: 'JP', ORD: 'US', OSL: 'NO', PER: 'AU', PDX: 'US', PHX: 'US',
	PRG: 'CZ', RUH: 'SA', SEA: 'US', SFO: 'US', SJC: 'US', SCL: 'CL', SIN: 'SG', SGN: 'VN',
	SYD: 'AU', TPE: 'TW', TPA: 'US', TLV: 'IL', VIE: 'AT', WAW: 'PL', YUL: 'CA', YVR: 'CA',
	YYZ: 'CA', ZRH: 'CH'
};
const 国家映射 = {
	UNITEDSTATES: 'US', USA: 'US', AMERICA: 'US', CANADA: 'CA', JAPAN: 'JP', GERMANY: 'DE',
	FRANCE: 'FR', NETHERLANDS: 'NL', UNITEDKINGDOM: 'GB', UK: 'GB', BRITAIN: 'GB',
	HONGKONG: 'HK', SINGAPORE: 'SG', KOREA: 'KR', SOUTHKOREA: 'KR', TAIWAN: 'TW',
	AUSTRALIA: 'AU', INDIA: 'IN', BRAZIL: 'BR', CHINA: 'CN', SOUTHAFRICA: 'ZA'
};

function 标准化地区(value) {
	return String(value || '').trim().replace(/^#+/, '').toUpperCase();
}

function 是否无效地区(value) {
	const code = 标准化地区(value);
	const compactCode = code.replace(/[\s_\-]+/g, '');
	return 无效地区集.has(code) || 无效地区集.has(compactCode);
}

function 获取地区别名(value) {
	const rawCode = 标准化地区(value);
	if (是否无效地区(rawCode)) return [];

	const tokens = rawCode.split(/[^A-Z0-9]+/).filter(Boolean);
	const codes = [];
	const compactRawCode = rawCode.replace(/[^A-Z0-9]/g, '');
	if (国家映射[compactRawCode]) codes.push(国家映射[compactRawCode]);

	for (const token of tokens.length > 0 ? tokens : [rawCode]) {
		if (是否无效地区(token)) continue;
		codes.push(token);
		if (机场映射[token]) codes.push(机场映射[token]);

		const compactToken = token.replace(/[^A-Z0-9]/g, '');
		if (国家映射[compactToken]) codes.push(国家映射[compactToken]);
	}

	return [...new Set(codes)];
}

function 地区标签匹配(主机地址ID, 地区标签) {
	const 主机地址文本 = String(主机地址ID || '').toLowerCase();
	const 标签文本 = String(地区标签 || '').trim().toLowerCase();
	if (!标签文本) return false;
	if (主机地址文本.includes(标签文本)) return true;

	const 主机地址码 = 获取地区别名(主机地址ID).map(code => code.toLowerCase());
	const 标签码 = 获取地区别名(地区标签).map(code => code.toLowerCase());
	return 标签码.some(code => 主机地址码.includes(code));
}

async function 整理精选列表(接口) {
	if (!接口 || 接口.length === 0) return [];

	let 新接口 = "";

	// 创建一个AbortController对象，用于控制fetch请求的取消
	const 控制器 = new AbortController();

	const 定时器 = setTimeout(() => {
		控制器.abort(); // 取消所有请求
	}, 2000); // 2秒后触发

	try {
		// 使用Promise.allSettled等待所有API请求完成，无论成功或失败
		// 对接口数组进行遍历，对每个API地址发起fetch请求
		const 响应集 = await Promise.allSettled(接口.map(apiUrl => fetch(apiUrl, {
			method: 'get',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'User-Agent': 档案名 + atob('IChodHRwczovL2dpdGh1Yi5jb20vY21saXUvV29ya2VyVmxlc3Myc3ViKQ==')
			},
			signal: 控制器.signal // 将AbortController的信号量添加到fetch请求中，以便于需要时可以取消请求
		}).then(响应 => 响应.ok ? 响应.text() : Promise.reject())));

		// 遍历所有响应
		for (const [索引, 响应] of 响应集.entries()) {
			// 检查响应状态是否为'fulfilled'，即请求成功完成
			if (响应.status === 'fulfilled') {
				// 获取响应的内容
				const 内容 = await 响应.value;

				const 行集 = 内容.split(/\r?\n/);
				let 端点备注 = '';
				let 体检端口 = '443';

				if (行集[0].split(',').length > 3) {
					const ID匹配 = 接口[索引].match(/id=([^&]*)/);
					if (ID匹配) 端点备注 = ID匹配[1];

					const 端口匹配 = 接口[索引].match(/port=([^&]*)/);
					if (端口匹配) 体检端口 = 端口匹配[1];

					for (let i = 1; i < 行集.length; i++) {
						const 列值 = 行集[i].split(',')[0];
						if (列值) {
							新接口 += `${列值}:${体检端口}${端点备注 ? `#${端点备注}` : ''}\n`;
							if (接口[索引].includes('proxyip=true')) 中转IP池.push(`${列值}:${体检端口}`);
						}
					}
				} else {
					// 验证当前apiUrl是否带有'proxyip=true'
					if (接口[索引].includes('proxyip=true')) {
						// 如果链接带有'proxyip=true'，则将内容添加到中转IP池
						中转IP池 = 中转IP池.concat((await 拆分整理(内容)).map(项 => {
							const baseItem = 项.split('#')[0] || 项;
							if (baseItem.includes(':')) {
								const 端口 = baseItem.split(':')[1];
								if (!安全端口集.includes(端口)) {
									return baseItem;
								}
							} else {
								return `${baseItem}:443`;
							}
							return null; // 不符合条件时返回 null
						}).filter(Boolean)); // 过滤掉 null 值
					}
					// 将内容添加到新接口中
					新接口 += 内容 + '\n';
				}
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		// 无论成功或失败，最后都清除设置的超时定时器
		clearTimeout(定时器);
	}

	const newAddressesapi = await 拆分整理(新接口);

	// 返回处理后的结果
	return newAddressesapi;
}

async function 整理体检结果(传输加密) {
	// 参数验证
	if (!传输加密) {
		console.error('TLS参数不能为空');
		return [];
	}

	// 检查CSV地址列表
	if (!Array.isArray(体检表集) || 体检表集.length === 0) {
		console.warn('没有可用的CSV地址列表');
		return [];
	}

	// 文本表格解析函数，兼容CSV/TSV以及带引号的单元格。
	function parseTable(文本) {
		const normalizedText = 文本
			.replace(/^\uFEFF/, '')
			.replace(/\r\n/g, '\n')
			.replace(/\r/g, '\n');
		const 行集 = normalizedText.split('\n').filter(line => line.trim() !== '');
		if (行集.length === 0) return [];

		const delimiter = detectDelimiter(行集[0]);
		return 行集.map(line => parseDelimitedLine(line, delimiter));
	}

	function detectDelimiter(headerLine) {
		const delimiters = [',', '\t', ';'];
		return delimiters
			.map(delimiter => ({ delimiter, count: parseDelimitedLine(headerLine, delimiter).length }))
			.sort((a, b) => b.count - a.count)[0].delimiter;
	}

	function parseDelimitedLine(line, delimiter) {
		const cells = [];
		let cell = '';
		let inQuotes = false;

		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			const nextChar = line[i + 1];

			if (char === '"') {
				if (inQuotes && nextChar === '"') {
					cell += '"';
					i++;
				} else {
					inQuotes = !inQuotes;
				}
			} else if (char === delimiter && !inQuotes) {
				cells.push(cell.trim());
				cell = '';
			} else {
				cell += char;
			}
		}

		cells.push(cell.trim());
		return cells;
	}

	function normalizeHeaderName(headerName) {
		return String(headerName || '')
			.replace(/^\uFEFF/, '')
			.trim()
			.toLowerCase()
			.replace(/[\s_\-()（）/\\:：.。]+/g, '');
	}

	function findColumn(normalizedHeader, aliases) {
		return normalizedHeader.findIndex(columnName => aliases.some(alias => columnName === alias || columnName.includes(alias)));
	}

	function findRemarkColumn(normalizedHeader) {
		return findColumn(normalizedHeader, [
			'数据中心', '地区码', '地区代码', '地区', '国家码', '国家代码', '国家', '城市',
			'colo', 'colocode', 'iata', 'airport', 'datacenter', 'dc', 'location',
			'regioncode', 'region', 'countrycode', 'country', 'city'
		]);
	}

	function parseNumber(value) {
		const 匹配 = String(value || '').replace(/,/g, '').match(/-?\d+(\.\d+)?/);
		return 匹配 ? parseFloat(匹配[0]) : NaN;
	}

	function getSpeed(row, 速度列索引) {
		if (速度列索引 !== -1) {
			const 速度 = parseNumber(row[速度列索引]);
			if (!Number.isNaN(速度)) return 速度;
		}

		for (let i = row.length - 1; i >= 0; i--) {
			const 速度 = parseNumber(row[i]);
			if (!Number.isNaN(速度)) return 速度;
		}

		return NaN;
	}

	function tlsMatches(rowValue, targetTls) {
		const tlsValue = String(rowValue || '').trim().toLowerCase();
		const targetValue = targetTls.toUpperCase() === 'TRUE';

		if (['true', 'tls', '1', 'yes', 'y'].includes(tlsValue)) return targetValue;
		if (['false', 'notls', 'no-tls', '0', 'no', 'n'].includes(tlsValue)) return !targetValue;

		return tlsValue.toUpperCase() === targetTls.toUpperCase();
	}

	function getRemark(row, TLS列索引, 备注列索引) {
		if (TLS列索引 !== -1 && row[TLS列索引 + 备注偏移] && !是否无效地区(row[TLS列索引 + 备注偏移])) {
			return row[TLS列索引 + 备注偏移].trim();
		}

		if (备注列索引 !== -1 && row[备注列索引] && !是否无效地区(row[备注列索引])) {
			return row[备注列索引].trim();
		}

		return '';
	}

	function isLikelyAddress(value) {
		const 主机地址 = String(value || '').trim();
		return /^(\d{1,3}\.){3}\d{1,3}$/.test(主机地址) || /^\[?[0-9a-f:]+\]?$/i.test(主机地址);
	}

	// 并行处理CSV
	const csvPromises = 体检表集.map(async (体检表地址) => {
		try {
			const 响应 = await fetch(体检表地址);

			if (!响应.ok) {
				throw new Error(`HTTP错误 ${响应.status}: ${响应.statusText}`);
			}

			const 文本 = await 响应.text();
			const 行集 = parseTable(文本);
			if (行集.length === 0) return [];

			// 解构和验证表头。支持iptest CSV，也支持CloudflareSpeedTest/result.csv这类无TLS/端口列的体检结果。
			const hasHeader = !isLikelyAddress(行集[0][0]);
			const 表头 = hasHeader ? 行集[0] : [];
			const dataRows = hasHeader ? 行集.slice(1) : 行集;
			const normalizedHeader = 表头.map(normalizeHeaderName);
			let IP列索引 = hasHeader ? findColumn(normalizedHeader, ['ip地址', 'ip', 'address', 'ipaddress']) : 0;
			const 端口列索引 = findColumn(normalizedHeader, ['端口', 'port']);
			const TLS列索引 = findColumn(normalizedHeader, ['tls', 'istls', '是否tls']);
			const 速度列索引 = findColumn(normalizedHeader, ['下载速度', '速度', 'speed', 'downloadspeed', 'download']);
			const 备注列索引 = findRemarkColumn(normalizedHeader);

			if (IP列索引 === -1) {
				IP列索引 = 0;
			}

			const 候选行 = dataRows
				.map(row => ({
					row,
					速度: getSpeed(row, 速度列索引),
					地区码: 备注列索引 === -1 ? '' : 标准化地区(row[备注列索引])
				}))
				.filter(({ row, 速度, 地区码 }) => {
					if (!isLikelyAddress(row[IP列索引])) return false;
					if (Number.isNaN(速度)) return false;
					const tlsOK = TLS列索引 === -1 || tlsMatches(row[TLS列索引], 传输加密);
					const regionOK = 备注列索引 === -1 || !是否无效地区(地区码);
					return regionOK && tlsOK;
				});
			const 已选行 = 候选行.filter(candidate => candidate.speed > 速度下限);

			if (备注列索引 !== -1) {
				const 地区最优 = new Map();
				for (const candidate of 候选行) {
					const 前一个 = 地区最优.get(candidate.regionCode);
					if (!前一个 || candidate.speed > 前一个.speed) 地区最优.set(candidate.regionCode, candidate);
				}
				已选行.push(...bestByRegion.values());
			}

			const 已见地址 = new Set();
			return 已选行
				.map(({ row }) => {
					const IP地址 = row[IP列索引].trim();
					const 端口 = 端口列索引 !== -1 && row[端口列索引] ? row[端口列索引].trim() : (传输加密.toUpperCase() === 'TRUE' ? '443' : '80');
					const 数据中心 = getRemark(row, TLS列索引, 备注列索引);
					const 格式化地址 = 数据中心 ? `${IP地址}:${端口}#${数据中心}` : `${IP地址}:${端口}`;
					if (已见地址.has(格式化地址)) return null;
					已见地址.add(格式化地址);

					// 处理代理IP池
					if (体检表地址.includes('proxyip=true') &&
						(TLS列索引 === -1 ? 传输加密.toUpperCase() === 'TRUE' : tlsMatches(row[TLS列索引], 'TRUE')) &&
						!安全端口集.includes(端口)) {
						中转IP池.push(`${IP地址}:${端口}`);
					}

					return 格式化地址;
				})
				.filter(Boolean);
		} catch (error) {
			console.error(`处理CSV ${体检表地址} 时出错:`, error);
			return [];
		}
	});

	// 使用Promise.all并行处理并展平结果
	const results = await Promise.all(csvPromises);
	return results.flat();
}

async function 拆分整理(内容) {
	// 将制表符、双引号、单引号和换行符都替换为逗号
	// 然后将连续的多个逗号替换为单个逗号
	var 替换后的内容 = 内容.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');

	// 删除开头和结尾的逗号（如果有的话）
	if (替换后的内容.charAt(0) == ',') 替换后的内容 = 替换后的内容.slice(1);
	if (替换后的内容.charAt(替换后的内容.length - 1) == ',') 替换后的内容 = 替换后的内容.slice(0, 替换后的内容.length - 1);

	// 使用逗号分割字符串，得到地址数组
	const 地址数组 = 替换后的内容.split(',');

	return 地址数组;
}

async function 发消息(传输类型, ip, add_data = "") {
	if (!机器人令牌 || !聊天号) return;

	try {
		let msg = "";
		const 响应 = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
		if (响应.ok) {
			const ipInfo = await 响应.json();
			msg = `${传输类型}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
		} else {
			msg = `${传输类型}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
		}

		const url = `https://api.telegram.org/bot${机器人令牌}/sendMessage?chat_id=${聊天号}&parse_mode=HTML&text=${encodeURIComponent(msg)}`;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
			}
		});
	} catch (error) {
		console.error('Error sending message:', error);
	}
}

async function nginx() {
	const 文本 = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return 文本;
}

function surge(内容, url, 帕斯) {
	let 每行内容;
	if (内容.includes('\r\n')) {
		每行内容 = 内容.split('\r\n');
	} else {
		每行内容 = 内容.split('\n');
	}

	let 输出内容 = "";
	for (let x of 每行内容) {
		if (x.includes(atob(atob('UFNCMGNtOXFZVzRz')))) {
			const 豪斯特 = x.split("sni=")[1].split(",")[0];
			const 备改内容 = `skip-cert-verify=true, tfo=false, udp-relay=false`;
			const 正确内容 = `skip-cert-verify=true, ws=true, ws-path=${帕斯}, ws-headers=Host:"${豪斯特}", tfo=false, udp-relay=false`;
			输出内容 += x.replace(new RegExp(备改内容, 'g'), 正确内容).replace("[", "").replace("]", "") + '\n';
		} else {
			输出内容 += x + '\n';
		}
	}

	输出内容 = `#!MANAGED-CONFIG ${url.href} interval=86400 strict=false` + 输出内容.substring(输出内容.indexOf('\n'));
	return 输出内容;
}

function 按地区抽袜套(地区码, 袜套5数据) {
	const matchCodes = 获取地区别名(地区码).map(code => code.toLowerCase());

	// 过滤出所有以指定地区码结尾的代理字符串，支持SJC/LAX/NRT等机房码映射到US/JP等国家码
	let 过滤后代理 = matchCodes.length > 0
		? 袜套5数据.filter(proxy => matchCodes.some(code => proxy.toLowerCase().endsWith(`#${code}`)))
		: [];

	// 如果没有匹配的代理，尝试匹配 "US"
	if (过滤后代理.length === 0) {
		过滤后代理 = 袜套5数据.filter(proxy => proxy.toLowerCase().endsWith(`#us`));
	}

	// 如果还是没有匹配的代理，从整个代理列表中随机选择一个
	if (过滤后代理.length === 0) {
		return 袜套5数据[Math.floor(Math.random() * 袜套5数据.length)];
	}

	// 从匹配的代理中随机选择一个并返回
	const 随机代理 = 过滤后代理[Math.floor(Math.random() * 过滤后代理.length)];
	return 随机代理;
}

async function 双重摘要(文本) {
	const 编码器 = new TextEncoder();

	const 首轮 = await crypto.subtle.digest('MD5', 编码器.encode(文本));
	const 首轮数组 = Array.from(new Uint8Array(首轮));
	const 首轮十六进制 = 首轮数组.map(b => b.toString(16).padStart(2, '0')).join('');

	const 次轮 = await crypto.subtle.digest('MD5', 编码器.encode(首轮十六进制.slice(7, 27)));
	const 次轮数组 = Array.from(new Uint8Array(次轮));
	const 次轮十六进制 = 次轮数组.map(b => b.toString(16).padStart(2, '0')).join('');

	return 次轮十六进制.toLowerCase();
}

function 还原假信息(内容, 用户ID, 域名) {
	内容 = 内容.replace(new RegExp(假油爱滴, 'g'), 用户ID).replace(new RegExp(假豪斯特, 'g'), 域名);
	return 内容;
}

function 生成假信息(内容, 用户ID, 域名) {
	内容 = 内容.replace(new RegExp(用户ID, 'g'), 假油爱滴).replace(new RegExp(域名, 'g'), 假豪斯特);
	return 内容;
}

function 是否合法四段(主机地址) {
	const 四段正则 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return 四段正则.test(主机地址);
}

function 生成动态油爱滴(密钥) {
	const 时区偏移 = 8; // 北京时间相对于UTC的时区偏移+8小时
	const 起始日期 = new Date(2007, 6, 7, 刷新点, 0, 0); // 固定起始日期为2007年7月7日的凌晨3点
	const 一周的毫秒数 = 1000 * 60 * 60 * 24 * 保鲜期;

	function 获取当前周数() {
		const 现在 = new Date();
		const 调整后的现在 = new Date(现在.getTime() + 时区偏移 * 60 * 60 * 1000);
		const 时间差 = Number(调整后的现在) - Number(起始日期);
		return Math.ceil(时间差 / 一周的毫秒数);
	}

	function 生成UUID(基础串) {
		const 哈希缓冲 = new TextEncoder().encode(基础串);
		return crypto.subtle.digest('SHA-256', 哈希缓冲).then((哈希) => {
			const 哈希数组 = Array.from(new Uint8Array(哈希));
			const 十六进制哈希 = 哈希数组.map(b => b.toString(16).padStart(2, '0')).join('');
			return `${十六进制哈希.substr(0, 8)}-${十六进制哈希.substr(8, 4)}-4${十六进制哈希.substr(13, 3)}-${(parseInt(十六进制哈希.substr(16, 2), 16) & 0x3f | 0x80).toString(16)}${十六进制哈希.substr(18, 2)}-${十六进制哈希.substr(20, 12)}`;
		});
	}

	const 当前周数 = 获取当前周数(); // 获取当前周数
	const 结束时间 = new Date(起始日期.getTime() + 当前周数 * 一周的毫秒数);

	// 生成两个 UUID
	const 当前油爱滴承诺 = 生成UUID(密钥 + 当前周数);
	const 上回油爱滴承诺 = 生成UUID(密钥 + (当前周数 - 1));

	// 格式化到期时间
	const 到期UTC = new Date(结束时间.getTime() - 时区偏移 * 60 * 60 * 1000); // UTC时间
	const 到期字符串 = `到期时间(UTC): ${到期UTC.toISOString().slice(0, 19).replace('T', ' ')} (UTC+8): ${结束时间.toISOString().slice(0, 19).replace('T', ' ')}\n`;

	return Promise.all([当前油爱滴承诺, 上回油爱滴承诺, 到期字符串]);
}

async function 获取外链(重新汇总外链) {
	let 端点LINK = [];
	let 速报链接 = [];
	for (let x of 重新汇总外链) {
		if (x.toLowerCase().startsWith('http')) {
			速报链接.push(x);
		} else {
			端点LINK.push(x);
		}
	}

	if (速报链接 && 速报链接.length !== 0) {
		function Base64解码(str) {
			const 字节 = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
			const 解码器 = new TextDecoder('utf-8');
			return 解码器.decode(字节);
		}
		const 控制器 = new AbortController(); // 创建一个AbortController实例，用于取消请求

		const 定时器 = setTimeout(() => {
			控制器.abort(); // 2秒后取消所有请求
		}, 2000);

		try {
			// 使用Promise.allSettled等待所有API请求完成，无论成功或失败
			const 响应集 = await Promise.allSettled(速报链接.map(apiUrl => fetch(apiUrl, {
				method: 'get',
				headers: {
					'Accept': 'text/html,application/xhtml+xml,application/xml;',
					'User-Agent': 'v2rayN/' + 档案名 + ' (https://github.com/cmliu/WorkerVless2sub)'
				},
				signal: 控制器.signal // 将AbortController的信号量添加到fetch请求中
			}).then(响应 => 响应.ok ? 响应.text() : Promise.reject())));

			// 遍历所有响应
			const 加工响应 = 响应集.map((响应, 索引) => {
				// 检查是否请求成功
				return {
					status: 响应.status,
					value: 响应.status === 'fulfilled' ? 响应.value : null,
					apiUrl: 速报链接[索引] // 将原始的apiUrl添加到返回对象中
				};
			});

			console.log(加工响应); // 输出修改后的响应数组

			for (const 响应 of 加工响应) {
				// 检查响应状态是否为'fulfilled'
				if (响应.status === 'fulfilled') {
					const 内容 = await 响应.value || 'null'; // 获取响应的内容
					if (内容.includes('://')) {
						const 行集 = 内容.includes('\r\n') ? 内容.split('\r\n') : 内容.split('\n');
						端点LINK = 端点LINK.concat(行集);
					} else {
						const 尝试解码内容 = Base64解码(内容);
						if (尝试解码内容.includes('://')) {
							const 行集 = 尝试解码内容.includes('\r\n') ? 尝试解码内容.split('\r\n') : 尝试解码内容.split('\n');
							端点LINK = 端点LINK.concat(行集);
						}
					}
				}
			}
		} catch (error) {
			console.error(error); // 捕获并输出错误信息
		} finally {
			clearTimeout(定时器); // 清除定时器
		}
	}

	return 端点LINK;
}

function 文本转Base64(str) {
	return btoa(unescape(encodeURIComponent(str)));
}

async function 表单页面(request) {
	const url = new URL(request.url);
	const 网页 = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${档案名}</title>
				${页签图标}
				<style>
					:root {
						--primary-color: #4361ee;
						--hover-color: #3b4fd3;
						--bg-color: #f5f6fa;
						--card-bg: #ffffff;
					}
					
					* {
						box-sizing: border-box;
						margin: 0;
						padding: 0;
					}
					
					body {
						${背景图}
						background-size: cover;
						background-position: center;
						background-attachment: fixed;
						background-color: var(--bg-color);
						font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
						line-height: 1.6;
						color: #333;
						min-height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					
					.container {
						position: relative;
						background: rgba(255, 255, 255, 0.7);
						backdrop-filter: blur(10px);
						-webkit-backdrop-filter: blur(10px); 
						max-width: 600px;
						width: 90%;
						padding: 2rem;
						border-radius: 20px;
						box-shadow: 0 10px 20px rgba(0,0,0,0.05),
									inset 0 0 0 1px rgba(255, 255, 255, 0.1);
						transition: transform 0.3s ease;
					}

					.container:hover {
						transform: translateY(-5px);
						box-shadow: 0 15px 30px rgba(0,0,0,0.1),
									inset 0 0 0 1px rgba(255, 255, 255, 0.2);
					}
					
					h1 {
						text-align: center;
						color: var(--primary-color);
						margin-bottom: 2rem;
						font-size: 1.8rem;
					}
					
					.input-group {
						margin-bottom: 1.5rem;
					}
					
					label {
						display: block;
						margin-bottom: 0.5rem;
						color: #555;
						font-weight: 500;
					}
					
					input {
						width: 100%;
						padding: 12px;
						border: 2px solid rgba(0, 0, 0, 0.15);
						border-radius: 10px;
						font-size: 1rem;
						transition: all 0.3s ease;
						box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
					}

					input:focus {
						outline: none;
						border-color: var(--primary-color);
						box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
									inset 0 2px 4px rgba(0, 0, 0, 0.03);
					}
					
					button {
						width: 100%;
						padding: 12px;
						background-color: var(--primary-color);
						color: white;
						border: none;
						border-radius: 10px;
						font-size: 1rem;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.3s ease;
						margin-bottom: 1.5rem;
					}
					
					button:hover {
						background-color: var(--hover-color);
						transform: translateY(-2px);
					}
					
					button:active {
						transform: translateY(0);
					}
					
					#result {
						background-color: #f8f9fa;
						font-family: monospace;
						word-break: break-all;
					}

					.github-corner svg {
						fill: var(--primary-color);
						color: var(--card-bg);
						position: absolute;
						top: 0;
						right: 0;
						border: 0;
						width: 80px;
						height: 80px;
					}

					.github-corner:hover .octo-arm {
						animation: octocat-wave 560ms ease-in-out;
					}

					@keyframes octocat-wave {
						0%, 100% { transform: rotate(0) }
						20%, 60% { transform: rotate(-25deg) }
						40%, 80% { transform: rotate(10deg) }
					}

					@keyframes rotate {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}

					.logo-title {
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 2rem;
					}

					.logo-wrapper {
						position: absolute;
						left: 0;
						width: 50px;
						height: 50px;
					}

					.logo-title img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						position: relative;
						z-index: 1;
						background: var(--card-bg);
						box-shadow: 0 0 15px rgba(67, 97, 238, 0.1);
					}

					.logo-border {
						position: absolute;
						top: -3px;
						left: -3px;
						right: -3px;
						bottom: -3px;
						border-radius: 50%;
						animation: rotate 3s linear infinite;
						background: conic-gradient(
							from 0deg,
							transparent 0%,
							var(--primary-color) 20%,
							rgba(67, 97, 238, 0.8) 40%,
							transparent 60%,
							transparent 100%
						);
						box-shadow: 0 0 10px rgba(67, 97, 238, 0.3);
						filter: blur(0.5px);
					}

					.logo-border::after {
						content: '';
						position: absolute;
						inset: 3px;
						border-radius: 50%;
						background: var(--card-bg);
					}

					@keyframes rotate {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}

					.logo-title h1 {
						margin-bottom: 0;
						text-align: center;
					}

					@media (max-width: 480px) {
						.container {
							padding: 1.5rem;
						}
						
						h1 {
							font-size: 1.5rem;
						}

						.github-corner:hover .octo-arm {
							animation: none;
						}
						.github-corner .octo-arm {
							animation: octocat-wave 560ms ease-in-out;
						}

						.logo-wrapper {
							width: 40px;
							height: 40px;
						}
					}

					.beian-info {
						text-align: center;
						font-size: 13px;
					}

					.beian-info a {
						color: var(--primary-color);
						text-decoration: none;
						border-bottom: 1px dashed var(--primary-color);
						padding-bottom: 2px;
					}

					.beian-info a:hover {
						border-bottom-style: solid;
					}

					#qrcode {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 20px;
					}

					.info-icon {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						width: 18px;
						height: 18px;
						border-radius: 50%;
						background-color: var(--primary-color);
						color: white;
						font-size: 12px;
						margin-left: 8px;
						cursor: pointer;
						font-weight: bold;
						position: relative;
						top: -3px;
					}

					.info-tooltip {
						display: none;
						position: fixed;
						background: white;
						border: 1px solid var(--primary-color);
						border-radius: 8px;
						padding: 15px;
						z-index: 1000;
						box-shadow: 0 2px 10px rgba(0,0,0,0.1);
						min-width: 200px;
						max-width: 90vw;
						width: max-content;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						margin: 0;
						line-height: 1.6;
						font-size: 13px;
						white-space: normal;
						word-wrap: break-word;
						overflow-wrap: break-word;
					}

					.info-tooltip::before {
						display: none;
					}
				</style>
				<script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"></script>
			</head>
			<body>
				<a href="https://github.com/cmliu/WorkerVless2sub" target="_blank" class="github-corner" aria-label="View source on Github">
					<svg viewBox="0 0 250 250" aria-hidden="true">
						<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
						<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
						<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
					</svg>
				</a>
				<div class="container">
						<div class="logo-title">
							${头像框}
							<h1>${档案名}</h1>
						</div>
					<div class="input-group">
						<label for="link">端点链接</label>
						<input type="text" id="link" placeholder="请输入 伪妹丝 / 威莱斯 / 突围 链接">
					</div>
					
					<button onclick="generateLink()">生成精选速报</button>
					
					<div class="input-group">
						<div style="display: flex; align-items: center;">
							<label for="result">精选速报</label>
							<div style="position: relative;">
								<span class="info-icon" onclick="toggleTooltip(event)">!</span>
								<div class="info-tooltip" id="infoTooltip">
									<strong>安全提示</strong>：使用精选速报生成器时，需要您提交 <strong>端点配置信息</strong> 用于生成精选速报链接。这意味着速报器的维护者可能会获取到该端点信息。<strong>请自行斟酌使用风险。</strong><br>
									<br>
									速报转换后端：<strong><a href='${协议头}://${转换后端}/version' target="_blank" rel="noopener noreferrer">${协议头}://${转换后端}</a></strong><br>
									速报转换配置文件：<strong><a href='${配置源}' target="_blank" rel="noopener noreferrer">${配置源}</a></strong>
								</div>
							</div>
						</div>
						<input type="text" id="result" readonly onclick="copyToClipboard()">
						<label id="qrcode" style="margin: 15px 10px -15px 10px;"></label>
					</div>
					<div class="beian-info" style="text-align: center; font-size: 13px;">${页脚信息}</div>
				</div>
	
				<script>
					function toggleTooltip(event) {
						event.stopPropagation(); // 阻止事件冒泡
						const tooltip = document.getElementById('infoTooltip');
						tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
					}
					
					// 点击页面其他区域关闭提示框
					document.addEventListener('click', function(event) {
						const tooltip = document.getElementById('infoTooltip');
						const infoIcon = document.querySelector('.info-icon');
						
						if (!tooltip.contains(event.target) && !infoIcon.contains(event.target)) {
							tooltip.style.display = 'none';
						}
					});

					function copyToClipboard() {
						const resultInput = document.getElementById('result');
						if (!resultInput.value) {
							return;
						}
						
						resultInput.select();
						navigator.clipboard.writeText(resultInput.value).then(() => {
							const tooltip = document.createElement('div');
							tooltip.style.position = 'fixed';
							tooltip.style.left = '50%';
							tooltip.style.top = '20px';
							tooltip.style.transform = 'translateX(-50%)';
							tooltip.style.padding = '8px 16px';
							tooltip.style.background = '#4361ee';
							tooltip.style.color = 'white';
							tooltip.style.borderRadius = '4px';
							tooltip.style.zIndex = '1000';
							tooltip.textContent = '已复制到剪贴板';
							
							document.body.appendChild(tooltip);
							
							setTimeout(() => {
								document.body.removeChild(tooltip);
							}, 2000);
						}).catch(err => {
							alert('复制失败，请手动复制');
						});
					}
	
					function generateLink() {
						const 外链 = document.getElementById('link').value;
						if (!外链) {
							alert('请输入端点链接');
							return;
						}
						
						let 油爱滴类型 = 'uuid';
						const 是突围 = 外链.startsWith(atob(atob('ZEhKdmFtRnVPaTh2')));
						if (是突围) 油爱滴类型 = 'password';
						let 速报链接 = '';
						try {
							const 是伪妹丝 = 外链.startsWith('vmess://');
							if (是伪妹丝){
								const 伪妹丝链接 = 外链.split('vmess://')[1];
								const 伪妹丝配置 = JSON.parse(atob(伪妹丝链接));
								
								const 豪斯特 = 伪妹丝配置.host;
								const 油爱滴 = 伪妹丝配置.id;
								const 是个RPC = 伪妹丝配置.net === 'grpc';
								const 帕斯 = 是个RPC ? '' : (伪妹丝配置.path || '/');
								const 司尼 = 伪妹丝配置.sni || 豪斯特;
								const 传输类型 = 是个RPC ? 'grpc' : (伪妹丝配置.type || 'none');
								const 爱剖恩 = 伪妹丝配置.alpn || '';
								const 变更ID = 伪妹丝配置.aid || 0;
								const 安全策略 = 伪妹丝配置.scy || 'auto';
								const 域名 = window.location.hostname;
								
								速报链接 = \`https://\${域名}/sub?host=\${豪斯特}&uuid=\${油爱滴}&path=\${encodeURIComponent(帕斯)}&sni=\${司尼}&type=\${传输类型}&alpn=\${encodeURIComponent(爱剖恩)}&alterid=\${变更ID}&security=\${安全策略}\`;
							} else {
								const 油爱滴 = 外链.split("//")[1].split("@")[0];
								const 主机与端口 = 外链.split("@")[1].split("?")[0];
								const 豪斯特 = 主机与端口.split(":")[0];
								const 查询串 = 外链.split("?")[1].split("#")[0];
								const 域名 = window.location.hostname;
								
								速报链接 = \`https://\${域名}/sub?host=\${豪斯特}&\${油爱滴类型}=\${油爱滴}&\${查询串}\`;
							}
							document.getElementById('result').value = 速报链接;
		
								const 二维码框 = document.getElementById('qrcode');
								二维码框.innerHTML = '';
								new QRCode(二维码框, {
									text: 速报链接,
									width: 220, // 调整宽度
									height: 220, // 调整高度
									colorDark: "#4a60ea", // 二维码颜色
									colorLight: "#ffffff", // 背景颜色
									correctLevel: QRCode.CorrectLevel.L, // 设置纠错级别
									scale: 1 // 调整像素颗粒度
								});
							} catch (error) {
								alert('链接格式错误，请检查输入');
							}
						}
				</script>
			</body>
			</html>
			`;

	return new Response(网页, {
		headers: {
			"content-type": "text/html;charset=UTF-8",
		},
	});
}

export default {
	async fetch(request, env) {
		if (env.TOKEN) 速报通道 = await 拆分整理(env.TOKEN);
		机器人令牌 = env.TGTOKEN || 机器人令牌;
		聊天号 = env.TGID || 聊天号;
		转换后端 = env.SUBAPI || 转换后端;
		if (转换后端.includes("http://")) {
			转换后端 = 转换后端.split("//")[1];
			协议头 = 'http';
		} else {
			转换后端 = 转换后端.split("//")[1] || 转换后端;
		}
		配置源 = env.SUBCONFIG || 配置源;
		档案名 = env.SUBNAME || 档案名;
		袜套5数据源 = env.SOCKS5DATA || 袜套5数据源;
		if (env.CMPROXYIPS) 匹配中转IP = await 拆分整理(env.CMPROXYIPS);;
		if (env.CFPORTS) 安全端口集 = await 拆分整理(env.CFPORTS);
		后缀 = env.PS || 后缀;
		页签图标 = env.ICO ? `<link rel="icon" sizes="32x32" href="${env.ICO}">` : '';
		头像框 = env.PNG ? `<div class="logo-wrapper"><div class="logo-border"></div><img src="${env.PNG}" alt="Logo"></div>` : '';
		if (env.IMG) {
			const imgs = await 拆分整理(env.IMG);
			背景图 = `background-image: url('${imgs[Math.floor(Math.random() * imgs.length)]}');`;
		} else 背景图 = '';
		页脚信息 = env.BEIAN || env.BY || 页脚信息;
		const UA头 = request.headers.get('User-Agent');
		const UA = UA头 ? UA头.toLowerCase() : "null";
		const url = new URL(request.url);
		const 格式 = url.searchParams.get('format') ? url.searchParams.get('format').toLowerCase() : "null";
		let 豪斯特 = "";
		let 油爱滴 = "";
		let 帕斯 = "";
		let 司尼 = "";
		let 传输类型 = "ws";
		let 跳过验证 = env.SCV || 'false';
		爱剖恩 = env.ALPN || 爱剖恩;
		let 上行下行 = Math.floor(((时间戳 - Date.now()) / 时间戳 * 99 * 1099511627776) / 2);
		if (env.UA) MamaJustKilledAMan = MamaJustKilledAMan.concat(await 拆分整理(env.UA));

		const 当前日期 = new Date();
		const 假油爱滴摘要 = await 双重摘要(Math.ceil(当前日期.getTime()));
		假油爱滴 = 假油爱滴摘要.slice(0, 8) + "-" + 假油爱滴摘要.slice(8, 12) + "-" + 假油爱滴摘要.slice(12, 16) + "-" + 假油爱滴摘要.slice(16, 20) + "-" + 假油爱滴摘要.slice(20);
		假豪斯特 = 假油爱滴摘要.slice(6, 9) + "." + 假油爱滴摘要.slice(13, 19) + ".xyz";

		总量 = 总量 * 1099511627776;
		let 到期时间 = Math.floor(时间戳 / 1000);

		外链 = env.LINK || 外链;

		if (env.ADD) 端点集 = await 拆分整理(env.ADD);
		if (env.ADDAPI) 端点接口集 = await 拆分整理(env.ADDAPI);
		if (env.ADDNOTLS) 无密端点集 = await 拆分整理(env.ADDNOTLS);
		if (env.ADDNOTLSAPI) 无密端点接口集 = await 拆分整理(env.ADDNOTLSAPI);
		function moveHttpUrls(sourceArray, targetArray) {
			if (!Array.isArray(sourceArray) || sourceArray.length === 0) return sourceArray || [];
			const httpRegex = /^https?:\/\//i;
			const httpUrls = sourceArray.filter(项 => httpRegex.test(项));
			if (httpUrls.length > 0) {
				targetArray.push(...httpUrls);
				return sourceArray.filter(项 => !httpRegex.test(项));
			}
			return sourceArray;
		}
		端点集 = moveHttpUrls(端点集, 端点接口集);
		无密端点集 = moveHttpUrls(无密端点集, 无密端点接口集);
		if (env.ADDCSV) 体检表集 = await 拆分整理(env.ADDCSV);
		速度下限 = Number(env.DLS) || 速度下限;
		备注偏移 = Number(env.CSVREMARK) || 备注偏移;

		if (袜套5数据源) {
			try {
				const 响应 = await fetch(袜套5数据源);
				const 袜套5文本 = await 响应.text();
				if (袜套5文本.includes('\r\n')) {
					袜套5数据 = 袜套5文本.split('\r\n').filter(line => line.trim() !== '');
				} else {
					袜套5数据 = 袜套5文本.split('\n').filter(line => line.trim() !== '');
				}
			} catch {
				袜套5数据 = null;
			}
		}

		let 临时中转IP集 = [];
		if (env.PROXYIP) 临时中转IP集 = await 拆分整理(env.PROXYIP);
		if (env.PROXYIPAPI) {
			const 中转IP接口 = await 拆分整理(env.PROXYIPAPI);
			if (中转IP接口.length > 0) {
				const 响应 = await fetch(中转IP接口[0]);
				if (响应.ok) {
					const 响应内容 = await 响应.text();
					const 整理成数组 = await 拆分整理(响应内容);
					if (整理成数组.length > 0) {
						临时中转IP集 = 临时中转IP集.concat(整理成数组);	//追加到中转IP集数组中
					}
				}
			}
		}
		//去重去除空元素
		临时中转IP集 = [...new Set(临时中转IP集.filter(项 => 项 && 项.trim() !== ''))];
		if (临时中转IP集.length > 0) 中转IP集 = 临时中转IP集;
		//console.log(中转IP集);

		if (速报通道.length > 0 && 速报通道.some(token => url.pathname === `/${token}`)) {
			豪斯特 = "null";
			if (env.HOST) {
				const hosts = await 拆分整理(env.HOST);
				豪斯特 = hosts[Math.floor(Math.random() * hosts.length)];
			}

			if (env.PASSWORD) {
				协议标识 = atob('VHJvamFu');
				油爱滴 = env.PASSWORD
			} else {
				协议标识 = atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`);
				if (env.KEY) {
					保鲜期 = Number(env.TIME) || 保鲜期;
					刷新点 = Number(env.UPTIME) || 刷新点;
					const userIDs = await 生成动态油爱滴(env.KEY);
					油爱滴 = userIDs[0];
				} else {
					油爱滴 = env.UUID || "null";
				}
			}

			帕斯 = env.PATH || "/?ed=2560";
			司尼 = env.SNI || 豪斯特;
			传输类型 = env.TYPE || 传输类型;
			隧道签名 = env.ED || 隧道签名;
			获取中转 = env.RPROXYIP || 'false';

			if (豪斯特 == "null" || 油爱滴 == "null") {
				let 空字段;
				if (豪斯特 == "null" && 油爱滴 == "null") 空字段 = "HOST/UUID";
				else if (豪斯特 == "null") 空字段 = "HOST";
				else if (油爱滴 == "null") 空字段 = "UUID";
				后缀 += ` 订阅器内置节点 ${空字段} 未设置！！！`;
			}

			await 发消息(`#获取订阅 ${档案名}`, request.headers.get('CF-Connecting-IP'), `UA: ${UA头}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
		} else {
			const 原始链接 = url.href;
			const 直链匹配 = 原始链接.match(/\/(sub\?)?(vless|trojan):\/\/([^@]+)@([^:?&\/#]+)(?::(\d+))?/i);
			if (直链匹配) {
				const [, , 协定, 令牌, 地址, 端口] = 直链匹配;
				if (协定.toLowerCase() === 'vless') {
					油爱滴 = 令牌;
				} else {
					油爱滴 = url.searchParams.get('password') || url.searchParams.get('pw') || 令牌;
				}
				豪斯特 = 地址;
				帕斯 = url.searchParams.get('path') || '';
				if (端口 && !url.searchParams.has('port')) {
					url.searchParams.set('port', 端口);
				}
			} else {
				豪斯特 = url.searchParams.get('host');
				油爱滴 = url.searchParams.get('uuid') || url.searchParams.get('password') || url.searchParams.get('pw');
				帕斯 = url.searchParams.get('path');
			}
			司尼 = url.searchParams.get('sni') || 豪斯特;
			传输类型 = url.searchParams.get('type') || 传输类型;
			const gRPC权威 = url.searchParams.get('authority');
			const gRPC服务名 = url.searchParams.get('serviceName');
			const gRPC模式 = url.searchParams.get('mode');
			if (传输类型 === 'grpc') {
				豪斯特 = gRPC权威 || 豪斯特;
				司尼 = gRPC权威 || 司尼;
				帕斯 = gRPC服务名 || '';
			}
			跳过验证 = url.searchParams.get('allowInsecure') == '1' ? 'true' : (url.searchParams.get('scv') || 跳过验证);
			const 工作模式 = url.searchParams.get('mode') || null;
			const 额外参数 = url.searchParams.get('extra') || null;
			扩展头 = (工作模式 ? `&mode=${工作模式}` : "") + (额外参数 ? `&extra=${encodeURIComponent(额外参数)}` : "");
			爱剖恩 = url.searchParams.get('alpn') || (扩展头 ? "h3%2Ch2" : 爱剖恩);
			隧道签名 = url.searchParams.get(atob('ZWRnZXR1bm5lbA==')) || url.searchParams.get(atob('ZXBlaXVz')) || 隧道签名;
			获取中转 = url.searchParams.get('proxyip') || 'false';

			if (url.searchParams.has('alterid')) {
				协议标识 = 'VMess';
				附加码 = url.searchParams.get('alterid') || 附加码;
				加密策略 = url.searchParams.get('security') || 加密策略;
			} else if (url.searchParams.has(atob('ZWRnZXR1bm5lbA==')) || url.searchParams.has('uuid')) {
				协议标识 = atob('VkxFU1M=');
			} else if (url.searchParams.has(atob('ZXBlaXVz')) || url.searchParams.has('password') || url.searchParams.has('pw')) {
				协议标识 = atob('VHJvamFu');
			}

			if (!url.pathname.includes("/sub")) {
				const 环境键 = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
				if (环境键) {
					const 链接列表 = await 拆分整理(env[环境键]);
					if (链接列表.includes('nginx')) {
						return new Response(await nginx(), {
							headers: {
								'Content-Type': 'text/html; charset=UTF-8',
							},
						});
					}
					const 链接 = 链接列表[Math.floor(Math.random() * 链接列表.length)];
					return 环境键 === 'URL302' ? Response.redirect(链接, 302) : fetch(new Request(链接, request));
				}
				return await 表单页面(request);
			}

			if (!豪斯特 || !油爱滴) {
				const 响应文本 = `
			缺少必填参数：host 和 uuid
			Missing required parameters: host and uuid
			پارامترهای ضروری وارد نشده: هاست و یوآی‌دی
			
			${url.origin}/sub?host=[your host]&uuid=[your uuid]&path=[your path]
			
			
			
			
			
			
				
				${atob(atob('YUhSMGNITTZMeTluYVhSb2RXSXVZMjl0TDJOdGJHbDFMM2R2Y210bGNsWnNaWE56TW5OMVlnPT0='))}
				`;

				return new Response(响应文本, {
					status: 202,
					headers: { 'content-type': 'text/plain; charset=utf-8' },
				});
			}

			if (!帕斯 || 帕斯.trim() === '') {
				帕斯 = '/?ed=2560';
			} else {
				// 如果第一个字符不是斜杠，则在前面添加一个斜杠
				帕斯 = (帕斯[0] === '/') ? 帕斯 : '/' + 帕斯;
			}
		}

		// 构建订阅响应头对象
		const responseHeaders = {
			"content-type": "text/plain; charset=utf-8",
			"Profile-Update-Interval": `${更新间隔}`,
			"Profile-web-page-url": url.origin,
			//"Subscription-Userinfo": `upload=${上行下行}; download=${上行下行}; 总量=${总量}; 到期时间=${到期时间}`,
		};

		if (豪斯特.toLowerCase().includes('notls') || 豪斯特.toLowerCase().includes('worker') || 豪斯特.toLowerCase().includes('trycloudflare')) 无加密 = 'true';
		无加密 = env.NOTLS || 无加密;
		let subConverterUrl = 生成假信息(url.href, 油爱滴, 豪斯特);
		const isSubConverterRequest = request.headers.get('subconverter-request') || request.headers.get('subconverter-version') || UA.includes('subconverter');
		if (isSubConverterRequest) 爱剖恩 = '';
		if (!isSubConverterRequest && MamaJustKilledAMan.some(PutAGunAgainstHisHeadPulledMyTriggerNowHesDead => UA.includes(PutAGunAgainstHisHeadPulledMyTriggerNowHesDead)) && MamaJustKilledAMan.length > 0) {
			const 环境键 = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
			if (环境键) {
				const 链接列表 = await 拆分整理(env[环境键]);
				if (链接列表.includes('nginx')) {
					return new Response(await nginx(), {
						headers: {
							'Content-Type': 'text/html; charset=UTF-8',
						},
					});
				}
				const 链接 = 链接列表[Math.floor(Math.random() * 链接列表.length)];
				return 环境键 === 'URL302' ? Response.redirect(链接, 302) : fetch(new Request(链接, request));
			}
			return await 表单页面(request);
		} else if ((UA.includes('clash') || UA.includes('meta') || UA.includes('mihomo') || (格式 === 'clash' && !isSubConverterRequest)) && !UA.includes('nekobox') && !UA.includes('cf-workers-sub')) {
			subConverterUrl = `${协议头}://${转换后端}/sub?target=clash&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(配置源)}&emoji=true&list=false&tfo=false&scv=${跳过验证}&fdn=false&sort=false&new_name=true`;
		} else if ((UA.includes('sing-box') || UA.includes('singbox') || (格式 === 'singbox' && !isSubConverterRequest)) && !UA.includes('cf-workers-sub')) {
			if (协议标识 == 'VMess' && url.href.includes('path=')) {
				const 路径前缀 = url.href.split('path=')[0];
				const 分段 = url.href.split('path=')[1].split('&');
				const 路径后缀 = 分段.slice(1).join('&') || '';
				const 待处理路径 = url.href.split('path=')[1].split('&')[0] || '';
				if (待处理路径.includes('%3F')) subConverterUrl = 生成假信息(路径前缀 + 'path=' + 待处理路径.split('%3F')[0] + '&' + 路径后缀, 油爱滴, 豪斯特);
			}
			subConverterUrl = `${协议头}://${转换后端}/sub?target=singbox&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(配置源)}&emoji=true&list=false&tfo=false&scv=${跳过验证}&fdn=false&sort=false&new_name=true`;
		} else {
			if (豪斯特.includes('workers.dev')) {
				if (临时跳板源) {
					try {
						const 响应 = await fetch(临时跳板源);

						if (!响应.ok) {
							console.error('获取地址时出错:', 响应.status, 响应.statusText);
							return; // 如果有错误，直接返回
						}

						const 文本 = await 响应.text();
						const 行集 = 文本.split('\n');
						// 过滤掉空行或只包含空白字符的行
						const nonEmptyLines = 行集.filter(line => line.trim() !== '');

						临时跳板 = 临时跳板.concat(nonEmptyLines);
					} catch (error) {
						console.error('获取地址时出错:', error);
					}
				}
				// 使用Set对象去重
				临时跳板 = [...new Set(临时跳板)];
			}

			const newAddressesapi = await 整理精选列表(端点接口集);
			const newAddressescsv = await 整理体检结果('TRUE');
			const 唯一地址集 = Array.from(new Set(端点集.concat(newAddressesapi, newAddressescsv).filter(项 => 项 && 项.trim())));

			let 无密响应体;
			if ((无加密 == 'true' && 协议标识 == atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`)) || 协议标识 == 'VMess') {
				const newAddressesnotlsapi = await 整理精选列表(无密端点接口集);
				const newAddressesnotlscsv = await 整理体检结果('FALSE');
				const 唯一无密地址集 = Array.from(new Set(无密端点集.concat(newAddressesnotlsapi, newAddressesnotlscsv).filter(项 => 项 && 项.trim())));

				无密响应体 = 唯一无密地址集.map(主机地址 => {
					let 端口 = "-1";
					let 地址ID = 主机地址;

					const 匹配 = 地址ID.match(地址正则);
					if (!匹配) {
						if (主机地址.includes(':') && 主机地址.includes('#')) {
							const 分段 = 主机地址.split(':');
							主机地址 = 分段[0];
							const 子分段 = 分段[1].split('#');
							端口 = 子分段[0];
							地址ID = 子分段[1];
						} else if (主机地址.includes(':')) {
							const 分段 = 主机地址.split(':');
							主机地址 = 分段[0];
							端口 = 分段[1];
						} else if (主机地址.includes('#')) {
							const 分段 = 主机地址.split('#');
							主机地址 = 分段[0];
							地址ID = 分段[1];
						}

						if (地址ID.includes(':')) {
							地址ID = 地址ID.split(':')[0];
						}
					} else {
						主机地址 = 匹配[1];
						端口 = 匹配[2] || 端口;
						地址ID = 匹配[3] || 主机地址;
					}

					const HTTP端口 = ["8080", "8880", "2052", "2082", "2086", "2095"];
					if (!是否合法四段(主机地址) && 端口 == "-1") {
						for (let httpPort of HTTP端口) {
							if (主机地址.includes(httpPort)) {
								端口 = httpPort;
								break;
							}
						}
					}
					if (端口 == "-1") 端口 = "80";
					//console.log(主机地址, 端口, 地址ID);

					if (隧道签名.trim() === atob('Y21saXU=') && 获取中转.trim() === 'true') {
						// 将地址ID转换为小写
						let 小写地址ID = 地址ID.toLowerCase();
						// 初始化找到的中转IP为null
						let 找到中转IP = null;

						if (袜套5数据) {
							const 袜套5 = 按地区抽袜套(小写地址ID, 袜套5数据);
							帕斯 = `/${袜套5}`;
						} else {
							// 遍历匹配中转IP数组查找匹配项
							for (let 项 of 匹配中转IP) {
								if (项.includes('#') && 项.split('#')[1] && 地区标签匹配(小写地址ID, 项.split('#')[1])) {
									找到中转IP = 项.split('#')[0];
									break; // 找到匹配项，跳出循环
								} else if (项.includes(':') && 项.split(':')[1] && 地区标签匹配(小写地址ID, 项.split(':')[1])) {
									找到中转IP = 项.split(':')[0];
									break; // 找到匹配项，跳出循环
								}
							}

							if (找到中转IP) {
								// 如果找到匹配的中转IP，赋值给帕斯
								帕斯 = atob('L3Byb3h5aXA9') + 找到中转IP;
							} else {
								// 如果没有找到匹配项，随机选择一个中转IP
								const 随机中转IP = 中转IP集[Math.floor(Math.random() * 中转IP集.length)];
								帕斯 = atob('L3Byb3h5aXA9') + 随机中转IP;
							}
						}
					}

					if (协议标识 == 'VMess') {
						const 网络类型 = 传输类型 === 'grpc' ? 'grpc' : 'ws';
						const 头部类型 = 传输类型 === 'grpc' ? 'gun' : 传输类型;
						const gRPC路径 = 传输类型 === 'grpc' ? '' : 帕斯;
						const 伪妹丝链接 = `vmess://${文本转Base64(`{"v":"2","ps":"${地址ID + 后缀}","add":"${主机地址}","port":"${端口}","id":"${油爱滴}","aid":"${附加码}","scy":"${加密策略}","net":"${网络类型}","type":"${头部类型}","host":"${豪斯特}","path":"${gRPC路径}","tls":"","sni":"","alpn":"${encodeURIComponent(爱剖恩)}","fp":""}`)}`;
						return 伪妹丝链接;
					} else {
						const 权威参数 = 传输类型 === 'grpc' ? `&authority=${encodeURIComponent(豪斯特)}` : '';
						const 服务名参数 = 传输类型 === 'grpc' && 帕斯 ? `&serviceName=${encodeURIComponent(帕斯)}` : '';
						const gRPC跳过 = 传输类型 === 'grpc' ? '' : `&path=${encodeURIComponent(帕斯)}`;
						const 威莱斯Link = `${atob(atob('ZG14bGMzTTZMeTg9')) + 油爱滴}@${主机地址}:${端口}?security=&type=${传输类型}&host=${豪斯特}${权威参数}${服务名参数}${gRPC跳过}&encryption=none#${encodeURIComponent(地址ID + 后缀)}`;
						return 威莱斯Link;
					}

				}).join('\n');
			}

			const responseBody = 唯一地址集.map(主机地址 => {
				let 端口 = "-1";
				let 地址ID = 主机地址;

				const 匹配 = 地址ID.match(地址正则);
				if (!匹配) {
					if (主机地址.includes(':') && 主机地址.includes('#')) {
						const 分段 = 主机地址.split(':');
						主机地址 = 分段[0];
						const 子分段 = 分段[1].split('#');
						端口 = 子分段[0];
						地址ID = 子分段[1];
					} else if (主机地址.includes(':')) {
						const 分段 = 主机地址.split(':');
						主机地址 = 分段[0];
						端口 = 分段[1];
					} else if (主机地址.includes('#')) {
						const 分段 = 主机地址.split('#');
						主机地址 = 分段[0];
						地址ID = 分段[1];
					}

					if (地址ID.includes(':')) {
						地址ID = 地址ID.split(':')[0];
					}
				} else {
					主机地址 = 匹配[1];
					端口 = 匹配[2] || 端口;
					地址ID = 匹配[3] || 主机地址;
				}

				if (!是否合法四段(主机地址) && 端口 == "-1") {
					for (let httpsPort of 安全端口集) {
						if (主机地址.includes(httpsPort)) {
							端口 = httpsPort;
							break;
						}
					}
				}
				if (端口 == "-1") 端口 = "443";

				//console.log(主机地址, 端口, 地址ID);

				if (隧道签名.trim() === atob('Y21saXU=') && 获取中转.trim() === 'true') {
					// 将地址ID转换为小写
					let 小写地址ID = 地址ID.toLowerCase();
					// 初始化找到的中转IP为null
					let 找到中转IP = null;

					if (袜套5数据) {
						const 袜套5 = 按地区抽袜套(小写地址ID, 袜套5数据);
						帕斯 = `/${袜套5}`;
					} else {
						// 遍历匹配中转IP数组查找匹配项
						for (let 项 of 匹配中转IP) {
							if (项.includes('#') && 项.split('#')[1] && 地区标签匹配(小写地址ID, 项.split('#')[1])) {
								找到中转IP = 项.split('#')[0];
								break; // 找到匹配项，跳出循环
							} else if (项.includes(':') && 项.split(':')[1] && 地区标签匹配(小写地址ID, 项.split(':')[1])) {
								找到中转IP = 项.split(':')[0];
								break; // 找到匹配项，跳出循环
							}
						}

						const 匹配中转IP = 中转IP池.find(中转IP => 中转IP.includes(主机地址));
						if (匹配中转IP) {
							帕斯 = atob('L3Byb3h5aXA9') + 匹配中转IP;
						} else if (找到中转IP) {
							// 如果找到匹配的中转IP，赋值给帕斯
							帕斯 = atob('L3Byb3h5aXA9') + 找到中转IP;
						} else {
							// 如果没有找到匹配项，随机选择一个中转IP
							const 随机中转IP = 中转IP集[Math.floor(Math.random() * 中转IP集.length)];
							帕斯 = atob('L3Byb3h5aXA9') + 随机中转IP;
						}
					}
				}

				let 封面域名 = 豪斯特;
				let 最终帕斯 = 帕斯;
				let 端点备注 = 后缀;
				if (传输类型 !== 'grpc' && 临时跳板.length > 0 && (豪斯特.includes('.workers.dev'))) {
					最终帕斯 = `/${豪斯特}${帕斯}`;
					封面域名 = 临时跳板[Math.floor(Math.random() * 临时跳板.length)];
					端点备注 = 后缀 + atob('IOW3suWQr+eUqOS4tOaXtuWfn+WQjeS4rei9rOacjeWKoe+8jOivt+WwveW/q+e7keWumuiHquWumuS5ieWfn++8gQ==');
					司尼 = 封面域名;
				}

				if (协议标识 == 'VMess') {
					const 网络类型 = 传输类型 === 'grpc' ? 'grpc' : 'ws';
					const 头部类型 = 传输类型 === 'grpc' ? 'gun' : 传输类型;
					const gRPC路径 = 传输类型 === 'grpc' ? '' : 最终帕斯;
					const 伪妹丝链接 = `vmess://${文本转Base64(`{"v":"2","ps":"${地址ID + 端点备注}","add":"${主机地址}","port":"${端口}","id":"${油爱滴}","aid":"${附加码}","scy":"${加密策略}","net":"${网络类型}","type":"${头部类型}","host":"${封面域名}","path":"${gRPC路径}","tls":"tls","sni":"${司尼}","alpn":"${encodeURIComponent(爱剖恩)}","fp":"","allowInsecure":"${跳过验证 == 'true' ? '1' : '0'}","fragment":"1,40-60,30-50,tlshello"}`)}`;
					return 伪妹丝链接;
				} else if (协议标识 == atob('VHJvamFu')) {
					const 权威参数 = 传输类型 === 'grpc' ? `&authority=${encodeURIComponent(封面域名)}` : '';
					const 服务名参数 = 传输类型 === 'grpc' && 最终帕斯 ? `&serviceName=${encodeURIComponent(最终帕斯)}` : '';
					const gRPC跳过 = 传输类型 === 'grpc' ? '' : `&path=${encodeURIComponent(最终帕斯)}`;
					const 突围Link = `${atob(atob('ZEhKdmFtRnVPaTh2')) + 油爱滴}@${主机地址}:${端口}?security=tls&sni=${司尼}&alpn=${encodeURIComponent(爱剖恩)}&fp=random&type=${传输类型}&host=${封面域名}${权威参数}${服务名参数}${gRPC跳过}${跳过验证 == 'true' ? '&allowInsecure=1' : ''}&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}#${encodeURIComponent(地址ID + 端点备注)}`;
					return 突围Link;
				} else {
					const 权威参数 = 传输类型 === 'grpc' ? `&authority=${encodeURIComponent(封面域名)}` : '';
					const 服务名参数 = 传输类型 === 'grpc' && 最终帕斯 ? `&serviceName=${encodeURIComponent(最终帕斯)}` : '';
					const gRPC跳过 = 传输类型 === 'grpc' ? '' : `&path=${encodeURIComponent(最终帕斯) + 扩展头}`;
					const 威莱斯Link = `${atob(atob('ZG14bGMzTTZMeTg9')) + 油爱滴}@${主机地址}:${端口}?security=tls&sni=${司尼}&alpn=${encodeURIComponent(爱剖恩)}&fp=random&type=${传输类型}&host=${封面域名}${权威参数}${服务名参数}${gRPC跳过}${跳过验证 == 'true' ? '&allowInsecure=1' : ''}&fragment=${encodeURIComponent('1,40-60,30-50,tlshello')}&encryption=none#${encodeURIComponent(地址ID + 端点备注)}`;
					return 威莱斯Link;
				}

			}).join('\n');

			let 合并内容 = responseBody; // 合并内容

			if (外链) {
				const 链接集 = await 拆分整理(外链);
				const 整理端点LINK = (await 获取外链(链接集)).join('\n');
				合并内容 += '\n' + 整理端点LINK;
				console.log("link: " + 整理端点LINK)
			}

			if (无密响应体 && 无加密 == 'true') {
				合并内容 += '\n' + 无密响应体;
				console.log("notlsresponseBody: " + 无密响应体);
			}

			// 历史豆子功能：将当前快照保存到 KV 并追加历史豆子
			if (env.ENABLE_HISTORY === 'true' && env.SUB_HISTORY) {
				try {
					const 历史天数 = Number(env.HISTORY_DAYS) || 7;
					const kv = env.SUB_HISTORY;
					const now = new Date();
					const 今日键 = `history:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
					const 过期秒数 = 历史天数 * 24 * 60 * 60;

					// 保存当前节点快照到 KV（使用 TTL 自动过期）
					kv.put(今日键, 合并内容, { expirationTtl: 过期秒数 }).catch(e => console.error('保存历史快照失败:', e));

					// 读取过去 历史天数-1 天的历史快照
					const 历史键列表 = [];
					for (let i = 1; i < 历史天数; i++) {
						const d = new Date(now);
						d.setDate(d.getDate() - i);
						历史键列表.push(`history:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
					}

					const 历史值列表 = await Promise.all(历史键列表.map(k => kv.get(k)));
					const 当前行集合 = new Set(合并内容.split('\n'));
					for (const 历史内容 of 历史值列表) {
						if (!历史内容) continue;
						for (const 行 of 历史内容.split('\n')) {
							if (行 && !当前行集合.has(行)) {
								合并内容 += '\n' + 行;
								当前行集合.add(行);
							}
						}
					}
				} catch (e) {
					console.error('历史节点处理出错:', e);
				}
			}

			if (协议标识 == atob('VHJvamFu') && (UA.includes('surge') || (格式 === 'surge' && !isSubConverterRequest)) && !UA.includes('cf-workers-sub')) {
				const 突围Links = 合并内容.split('\n');
				const 特洛伊LinksJ8 = 生成假信息(突围Links.join('|'), 油爱滴, 豪斯特);
				subConverterUrl = `${协议头}://${转换后端}/sub?target=surge&ver=4&url=${encodeURIComponent(特洛伊LinksJ8)}&insert=false&config=${encodeURIComponent(配置源)}&emoji=true&list=false&xudp=false&udp=false&tfo=false&expand=true&scv=${跳过验证}&fdn=false`;
			} else {
				let Base64响应;
				try {
					Base64响应 = btoa(合并内容); // 重新进行 Base64 编码
				} catch (e) {
					function Base64编码(data) {
						const 二进制 = new TextEncoder().encode(data);
						let base64 = '';
						const 字符表 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

						for (let i = 0; i < 二进制.length; i += 3) {
							const 字节1 = 二进制[i];
							const 字节2 = 二进制[i + 1] || 0;
							const 字节3 = 二进制[i + 2] || 0;

							base64 += 字符表[字节1 >> 2];
							base64 += 字符表[((字节1 & 3) << 4) | (字节2 >> 4)];
							base64 += 字符表[((字节2 & 15) << 2) | (字节3 >> 6)];
							base64 += 字符表[字节3 & 63];
						}

						const 填充 = 3 - (二进制.length % 3 || 3);
						return base64.slice(0, base64.length - 填充) + '=='.slice(0, 填充);
					}
					Base64响应 = Base64编码(合并内容);
				}
				const 响应 = new Response(Base64响应, { headers: responseHeaders });
				return 响应;
			}
		}

		try {
			const 转换后端响应 = await fetch(subConverterUrl, { headers: { 'User-Agent': `v2rayN/${档案名 + atob('IChodHRwczovL2dpdGh1Yi5jb20vY21saXUvRWRnZU9uZS1QYWdlcy1CZXN0SVAyU1VCKQ==')}` } });

			if (!转换后端响应.ok) {
				throw new Error(`Error fetching subConverterUrl: ${转换后端响应.status} ${转换后端响应.statusText}`);
			}

			let 转换后端内容 = await 转换后端响应.text();

			if (协议标识 == atob('VHJvamFu') && (UA.includes('surge') || (格式 === 'surge' && !isSubConverterRequest)) && !UA.includes('cf-workers-sub')) {
				转换后端内容 = surge(转换后端内容, 豪斯特, 帕斯);
			}
			转换后端内容 = 还原假信息(转换后端内容, 油爱滴, 豪斯特);
			if (!UA.includes('mozilla')) responseHeaders["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(档案名)}`;
			return new Response(转换后端内容, { headers: responseHeaders });
		} catch (error) {
			return new Response(`Error: ${error.message}`, {
				status: 500,
				headers: { 'content-type': 'text/plain; charset=utf-8' },
			});
		}
	}
};
