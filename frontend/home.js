// Read movie data
call("films").then(films => {
    films["films"].forEach(film => {
        loadThumbnails(film["title"]);
    });
});

// Load movies
function loadThumbnails(film) {
    bugPrint("films: " + film);

    // Create actual image for thumbnail
    let pick = document.createElement("img")
    pick.setAttribute("src", filmPath + film + "/img.jpg");

    // Create a title
    let title = document.createElement("p");
    title.innerHTML = film;
    
    // Setup thumbnail
    let thumbnail = document.createElement("a");
    thumbnail.id = film;
    thumbnail.href = film;
    thumbnail.className = "thumnail";
    thumbnail.href = "videoplayer.html#" + film;

    // Add elements to div
    thumbnail.appendChild(pick);
    thumbnail.appendChild(title);
    document.getElementById("content").appendChild(thumbnail);
}