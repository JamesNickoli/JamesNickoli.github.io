document.body.onload = function () {
    let windowHeight = window.innerHeight;

    let animations = [
        {tagName: "p", className: "fade-up-anim"},
        {tagName: "img", className: "fade-up-anim"},
        {tagName: "li", className: "fade-left-anim"},
    ];

    function addAnim(e, anim) {
        if (e.getBoundingClientRect().y > windowHeight && !e.classList.contains("ignore-anim")) {
            e.classList.add(anim+"-ready");
            e.animationName = anim;
            observer.observe(e);
        }
    }

    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };
    
    let observer = new IntersectionObserver(callbackFunc, options);

    animations.forEach((animation) => {
        [].forEach.call(document.getElementsByTagName(animation.tagName), (e) => {
            addAnim(e,animation.className);
        });
    });

    addAnim(document.getElementsByClassName("splide")[0], "fade-up-anim");
    addAnim(document.getElementsByTagName("iframe")[0], "fade-up-anim");

    new Splide(".splide", {
        width: "640px"
    }).mount();
};

function callbackFunc(entries, observer) {
    entries.forEach((entry) => {
        // if(!entry.target.beenSeen) {
        //     entry.target.classList.add(".fade-up-anim");
        //     entry.target.beenSeen = true;
        // }

        if (entry.intersectionRatio > 0) {
            entry.target.classList.remove(entry.target.animationName+"-ready");
            entry.target.classList.add(entry.target.animationName);

            observer.unobserve(entry.target);
        }
    });
}