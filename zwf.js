const http = require('http');
const url = require('url');
const fs = require('fs');
const { exec } = require('child_process');

const port = 3030;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Welcome to the Node.js Backend!' }));

    } else if (req.url === '/films' && req.method === 'GET') {
        res.writeHead(200);

        res.end(fs.readFileSync('films/films.json', 'utf8'));

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Open frontend home page automatically after server starts
exec('start frontend/home.html');

// Read movie data from root/films/films.json
var curentFilms = [];
JSON.parse(fs.readFileSync('./films/films.json', 'utf8'))["films"].forEach(film => {
    curentFilms.push(film["title"]);
});
var newFilms = [];
fs.readdirSync('./films').forEach(film => {
    if (!curentFilms.includes(film)) {
        newFilms.push(film);
    }
});


