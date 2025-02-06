// Read movie data
call("films").then(films => {
    films.forEach(film => {
        loadThumbnails(film);
    });
});

// Load movies
function loadThumbnails(film) {
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
        hero("hero1", "../" + film["imgpath"])
        document.getElementById("hero-title").innerHTML = film["title"];
        document.getElementById("hero-description").innerHTML = film["description"];

        // Play movie when button is clicked
        document.getElementById("play-film-hero").addEventListener("click", () => {
            window.location = "videoplayer.html#" + film["title"];
        })
    });
}

function hero(heroIndex, bg) {
    document.getElementById(heroIndex).style.backgroundImage = "url(" + bg + ")";
}

hero1();
hero("hero2", "src/hero/github.png")
hero("hero3", "src/hero/zwfbg.png")

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