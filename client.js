const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve HTML files
function serveFile(res, filePath) {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Internal Server Error');
		} else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		}
	});
}

// Server for index1.html (Site 1)
const server1 = http.createServer((req, res) => {
	const filePath = path.join(__dirname, 'index1.html');
	serveFile(res, filePath);
});

server1.listen(3001, () => {
	console.log('Server 1 (index1.html) is running on port 3001');
});

// Server for index2.html (Site 2)
const server2 = http.createServer((req, res) => {
	const filePath = path.join(__dirname, 'index2.html');
	serveFile(res, filePath);
});

server2.listen(3002, () => {
	console.log('Server 2 (index2.html) is running on port 3002');
});
