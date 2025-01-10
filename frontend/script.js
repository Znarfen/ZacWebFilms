// Constants that are used in multiple js files
const filmPath = "../films/";

// to see debug msg in console
const debuging = true;

// Used to load fotter and navbar on all pages
const navbar = 
    '<nav id="navbar">' +
    '<img src="src/icon.png">' +
    '<div class="nav-links">' +
        '<a href="home.html">HOME</a>' +
        '<a href="videoplayer.html">RANDOM</a>' +
    '</div>' +
    '</nav>';
const footer =
    '<footer id="footer">' +
        '<p>Zacs Web Films</p>' +
        '<p>Started prodjekt on date: 2024-10-24</p>' +
        '<p>Version: 0.1</p>' +
        '<a target="_blank" href="https://github.com/Znarfen/ZacWebFilms">' +
            'GitHub' +
        '</a>' +
        '<a target="_blank" href="https://www.foretagsuniversitetet.se/yh-utbildningar/Fullstack-utvecklare-Stockholm">' +
            'Företagsuniversitetet' +
        '</a>' +
    '</footer>'
document.body.innerHTML = navbar + document.body.innerHTML + footer;

// Debug tool
function bugPrint (msg = "",) {
    if (debuging) {
        console.log("debug(" + bugPrint.caller.name + "):\n\t", msg);
    }
}

// Load movies (as json)
function call(get = "") {
    return fetch("http://localhost:3030/" + get)
        .then(response => response.json())
    /* 
    // to future me this is how to use call()
    call("films").then(result => {
        bugPrint((result));
    });
    */
}