// Get selected film
let film;
if (window.location.href.includes('#')) {
    call("films").then(films => {
        films.forEach(film => {
            if (film["title"] == window.location.href.split('#')[1])
                loadMovie(film);
        });
    });

} else {
    call("films").then(films => {
        loadMovie(films[Math.floor(Math.random() * films.length)]);
    });
}

function loadMovie(film) {
    document.getElementById("background").style.backgroundImage = "url(../" + film["imgpath"] + ")";
    document.body.style.backgroundImage = "none";

    // Create video html element to play a movie
    document.getElementById("video_div").innerHTML = "" +
        "<video controls src='../" + film["moviepath"] + "' type='video/webm'></video>"

    // Load film description
    if (film["description"] != "") {
        document.getElementById("description").innerHTML = film["description"];
        document.title = "ZWF: " + film["title"];
    } else {
        document.getElementById("description").style.display = "none";
    }
}