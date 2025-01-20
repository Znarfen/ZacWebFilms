const http = require('http');
const url = require('url');
const fs = require('fs');

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

        let films = [];

        fs.readdirSync('films').forEach(filmFolder => {
            let film = {title: "", description: "", moviepath: "", imgpath: "frontend/src/unknown.jpg"}

            film["title"] = filmFolder;

            fs.readdirSync("films/" + filmFolder).forEach(file => {

                // get movie description from file
                if (file.split('.')[1] == "txt") {
                    film["description"] = fs.readFileSync("films/" + filmFolder + "/" + file, 'utf8');
                }

                // get movie path
                if (file.split('.')[1] == "mp4") film["moviepath"] = "films/" + filmFolder + "/" + file;

                // get thumnail image path
                if (file.split('.')[1] == "jpg") film["imgpath"] = "films/" + filmFolder + "/" + file;
            })

            films.push(film);
        });

        res.end(JSON.stringify(films));

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Open frontend home page automatically after server starts
//exec('start frontend/home.html');