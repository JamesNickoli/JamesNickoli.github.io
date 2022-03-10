function hide() {
    document.getElementById("hamburger-button").style.display = "";
    document.getElementById("top-nav").style.display = "none";
}

function show() {
    document.getElementById("hamburger-button").style.display = "none";
    document.getElementById("top-nav").style.display = "";
}

document.body.onload = function() {
    new Splide( '.splide', {
        width: '640px',
    }).mount();
}

document.getElementById("hamburger-button").style.display = "none";