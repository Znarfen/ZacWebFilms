// Get selected film
let film;
if (window.location.href.includes('#')) {
    loadMovie(window.location.href.split('#')[1]);
} else {
    call("films").then(films => {
        loadMovie(films["films"][Math.floor(Math.random() * films["films"].length)]["title"]);
    });
}

function loadMovie(film) {
    document.getElementById("background").style.backgroundImage = "url(" + filmPath + film + "/img.jpg)";
    document.body.style.backgroundImage = "none";
    let src = filmPath + film + "/mov";

    // Create video html element to play a movie
    document.getElementById("video_div").innerHTML = "" +
        "<video controls src='" + src + ".mp4' type='video/webm'></video>"

    // Load film description
    call("films").then((data) => {
            data["films"].forEach(element => {
                if (element["title"] == film) {
                    document.getElementById("description").innerHTML = element["description"];
                    document.title = "ZWF: " + element["title"];
                }
            });
        })
}