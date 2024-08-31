const http = require('http');
const url = require('url');

// Function to handle cookies
function handleCookies(req, res) {
	const origin = req.headers.origin || '*'; // Default to '*' if origin is undefined
	const parsedUrl = url.parse(req.url, true);
	const query = parsedUrl.query;

	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', origin);
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	if (req.method === 'GET') {
		if (parsedUrl.pathname === '/clear') {
			// Clear the cookie
			res.writeHead(200, {
				'Set-Cookie': 'user_id=; Path=/; Domain=localhost; HttpOnly; Max-Age=0',
				'Content-Type': 'application/json'
			});
			res.end(JSON.stringify({
				message: 'Cookie cleared'
			}));
		} else if (parsedUrl.pathname === '/') {
			const cookies = parseCookies(req);
			let userId = parseInt(cookies.user_id, 10);

			if (query.action === 'increment') {
				// Increment the user_id value if action is 'increment'
				if (isNaN(userId)) {
					userId = 1;
				} else {
					userId += 1;
				}
				res.writeHead(200, {
					'Set-Cookie': `user_id=${userId}; Path=/; Domain=localhost; HttpOnly`,
					'Content-Type': 'application/json'
				});
				res.end(JSON.stringify({
					message: 'Cookie incremented',
					user_id: userId
				}));
			} else {
				// Just read the user_id value
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.end(JSON.stringify({
					message: 'Cookie read',
					user_id: userId || 0
				}));
			}
		} else {
			// Handle unknown paths
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({
				message: 'Not Found'
			}));
		}
	} else {
		// Handle unsupported methods
		res.writeHead(405, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({
			message: 'Method Not Allowed'
		}));
	}
}

// Helper function to parse cookies
function parseCookies(request) {
	const list = {};
	const cookieHeader = request.headers.cookie;

	if (cookieHeader) {
		cookieHeader.split(';').forEach(cookie => {
			const parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
		});
	}

	return list;
}

// Create the server
const server = http.createServer((req, res) => {
	try {
		handleCookies(req, res);
	} catch (error) {
		console.error('Error handling request:', error);
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({
			message: 'Internal Server Error'
		}));
	}
});

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
