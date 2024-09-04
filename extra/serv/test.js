const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('POST response, body: ' + body);
        });

    } else if (req.method === 'GET') { 
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('GET response');

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found, method: ' + req.method + ', url: ' + req.url);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
