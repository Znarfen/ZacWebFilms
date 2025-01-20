// Read movie data
call("films").then(films => {
    films.forEach(film => {
        loadThumbnails(film);
    });
});

// Load movies
function loadThumbnails(film) {
    //bugPrint("films: " + film["title"]);

    // Create actual image for thumbnail
    let pick = document.createElement("img")
    pick.setAttribute("src", "../" + film["imgpath"]);
    console.log( "../" + film["imgpath"])

    // Create a title
    let title = document.createElement("p");
    title.innerHTML = film["title"];
    
    // Setup thumbnail
    let thumbnail = document.createElement("a");
    thumbnail.id = film["title"];
    thumbnail.href = film["title"];
    thumbnail.className = "thumnail";
    thumbnail.href = "videoplayer.html#" + film["title"];

    // Add elements to div
    thumbnail.appendChild(pick);
    thumbnail.appendChild(title);
    document.getElementById("content").appendChild(thumbnail);
}

function changeHero() {
    if (document.getElementById("hero1").style.display == "inherit") {
        document.getElementById("hero1").style.display = "none";
        document.getElementById("hero2").style.display = "inherit";
        return document.getElementById("hero2");
    }
    else if (document.getElementById("hero2").style.display == "inherit") {
        document.getElementById("hero2").style.display = "none";
        document.getElementById("hero3").style.display = "inherit";
        return document.getElementById("hero3");
    }
    else {
        document.getElementById("hero3").style.display = "none";
        document.getElementById("hero1").style.display = "inherit";
        return document.getElementById("hero1");
    }
}

function hero1() {
    call("films").then(films => {
        let film = films[Math.floor(Math.random() * films.length)];
        hero("hero1", "../" + film["imgpath"], "videoplayer.html#" + film["title"])
        document.getElementById("hero-title").innerHTML = film["title"];
        document.getElementById("hero-description").innerHTML = film["description"];
    });
}

function hero(heroIndex, bg, url) {
    document.getElementById(heroIndex).style.backgroundImage = "url(" + bg + ")";
    document.getElementById(heroIndex).onclick = function(){window.open(url)};
}


hero1();
hero("hero2", "src/hero/github.png", "https://github.com/Znarfen/ZacWebFilms")

let barLeng = 0.0;
let curentHero = changeHero();

// loop to change the hero
async function loop(){
    while(true) {
        barLeng += 0.5;
        if (barLeng < 10) {
            curentHero.style.opacity = barLeng / 10
        }
        
        if (barLeng > 90) {
            curentHero.style.opacity = (10 - (barLeng - 90)) / 10
        }

        if (barLeng >= 100) {
            barLeng = 0;
            curentHero = changeHero()
            curentHero.style.opacity = 0;
        }
        document.getElementById("waiting-bar").style.width = barLeng + "%"
        await sleep(50);
    }
}
loop();

// Function to pause execution for a certain amount of time (in milliseconds)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}