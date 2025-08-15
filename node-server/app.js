const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    const pathname = parsedUrl.pathname;

    console.log(req.method, req.url, pathname, queryParams)
    if (req.method === 'GET' && pathname === '/echo') {
        const name = queryParams.name;
        res.end(`Hello, ${name}!`);
    } else if (req.method === 'POST' && pathname === '/echo') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body); // Parse the JSON body
            // res.end(`Received: ${body}`);
            res.end(`Hello, ${data.name}!`);
        });
    } 
    
    //*** Classwork for Payload in POST (from line 25 to 95) ***
    else if (req.method === 'POST' && pathname === '/api/add') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let result = data.num1 + data.num2
            res.end(JSON.stringify({
                "opt": "add",
                "num1": data.num1,
                "num2": data.num2,
                "result": result
            }))
        })
    } else if (req.method === 'POST' && pathname === '/api/subtract') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let result = data.num1 - data.num2
            res.end(JSON.stringify({
                "opt": "subtract",
                "num1": data.num1,
                "num2": data.num2,
                "result": result
            }))
        })
    } else if (req.method === 'POST' && pathname === '/api/multiply') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let result = data.num1 * data.num2
            res.end(JSON.stringify({
                "opt": "multiply",
                "num1": data.num1,
                "num2": data.num2,
                "result": result
            }))
        })
    } else if (req.method === 'POST' && pathname === '/api/divide') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let result = data.num1 / data.num2
            if (!(data.num2 === 0)) {
                res.end(JSON.stringify({
                    "opt": "divide",
                    "num1": data.num1,
                    "num2": data.num2,
                    "result": result
                }))
            } else {
                res.end(JSON.stringify({
                    "opt": "divide",
                    "num1": data.num1,
                    "num2": data.num2,
                    "error": "Divided by zero!"
                }))
            }
        })
    } 
    
    else if (req.method === 'GET' && pathname === '/api/add') {
        const num1 = Number(queryParams.num1);
        const num2 = Number(queryParams.num2);

        let result = num1 + num2
        res.end(JSON.stringify({
            "opt": "add",
            "num1": num1,
            "num2": num2,
            "result": result
        }))
    } else if (req.method === 'GET' && pathname === '/api/subtract') {
        const num1 = Number(queryParams.num1);
        const num2 = Number(queryParams.num2);

        let result = num1 - num2
        res.end(JSON.stringify({
            "opt": "subtract",
            "num1": num1,
            "num2": num2,
            "result": result
        }))
    } else if (req.method === 'GET' && pathname === '/api/multiply') {
        const num1 = Number(queryParams.num1);
        const num2 = Number(queryParams.num2);

        let result = num1 * num2
        res.end(JSON.stringify({
            "opt": "multiply",
            "num1": num1,
            "num2": num2,
            "result": result
        }))
    } else if (req.method === 'GET' && pathname === '/api/divide') {
        const num1 = Number(queryParams.num1);
        const num2 = Number(queryParams.num2);

        let result = num1 / num2
        if (!(num2 === 0)) {
            res.end(JSON.stringify({
                "opt": "divide",
                "num1": num1,
                "num2": num2,
                "result": result
            }))
        } else {
            res.end(JSON.stringify({
                "opt": "divide",
                "num1": num1,
                "num2": num2,
                "error": "Divided by zero!"
            }))
        }
    } else if (req.url === '/api/cat') {
        res.end("Looking for a cat?");
    } else {
        res.end("Hello World")
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});