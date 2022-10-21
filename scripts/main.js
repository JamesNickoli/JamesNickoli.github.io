document.body.onload = function () {
    let windowHeight = window.innerHeight;

    let animations = [
        { tagName: "p", className: "fade-up-anim" },
        { tagName: "img", className: "fade-up-anim" },
        { tagName: "li", className: "fade-left-anim" },
    ];

    function addAnim(e, anim) {
        if (e.getBoundingClientRect().y > windowHeight && !e.classList.contains("ignore-anim")) {
            e.classList.add(anim + "-ready");
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
            addAnim(e, animation.className);
        });
    });

    addAnim(document.getElementsByClassName("splide")[0], "fade-up-anim");
    addAnim(document.getElementsByTagName("iframe")[0], "fade-up-anim");

    new Splide(".splide", {
        width: "640px"
    }).mount();

    document.getElementById("laptop-container").style.height = document.getElementById("laptop-content").offsetHeight + "px";
    document.getElementById("laptop").style.overflow = "hidden";

    document.getElementById("laptop-case").style.transform = "";

    let laptopOpen = false;
    document.getElementById("laptop-style").classList.add("collapse");
    document.getElementById("laptop-container").classList.add("laptop-container-move-up");
    document.getElementById("laptop-case").classList.remove("collapse-top-initial");

    window.addEventListener("scroll", () => {
            if((window.scrollY - document.getElementById("laptop-container").offsetTop) > 0) {
                if(!laptopOpen) {
                    document.getElementById("laptop-style").classList.remove("collapse");
                    document.getElementById("laptop-case").classList.remove("collapse-top");
                    document.getElementById("laptop-case").classList.add("collapse-top-initial");
                    document.getElementById("laptop-container").classList.remove("laptop-container-move-up");
                    laptopOpen = true;
                }
            } else {
                if(laptopOpen) {
                    document.getElementById("laptop-style").classList.add("collapse");
                    document.getElementById("laptop-case").classList.add("collapse-top");
                    document.getElementById("laptop-case").classList.remove("collapse-top-initial");
                    document.getElementById("laptop-container").classList.add("laptop-container-move-up");
                    laptopOpen = false;
                }
            }
            document.getElementById("laptop").scrollTop = window.scrollY - document.getElementById("laptop-container").offsetTop;
        },
        false
    );

    let canvas = document.getElementById("fancy-background");
    let ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let chars = [];
    let fallingChars = [];
    let order = "モエヤキオカ7ケサスz152ヨタワ4ネヌナ98ヒ0ホア3ウ セ¦:\"꞊ミラリ╌ツテニハソ▪—<>0|+*コシマムメ";
    let scale = 40;

    function draw() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if(canvas.width < 800 ? Math.random() < 0.2 : (canvas.width > 1500 ? Math.random() < 0.7 : Math.random() < 0.4)) {
            fallingChars.push([random(0, ~~(canvas.width/scale)) * scale, 0]);
        }

        for(var i of fallingChars) {
            chars.push([i[0], i[1], 0, order[(~~(i[1]+i[0] / scale)) % order.length]]);
            i[1] += scale;
        }

        for(var i=0;i<chars.length;i++) {
            if(++chars[i][2] > canvas.height/(scale*1.5)) {
                chars.splice(i, 1);
                i--;
                continue;
            }

            if(Math.random() < 0.1) {
                chars[i][3] = order[random(0, order.length-1)]
            }
        
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = scale + "px monospace";
        
        for(var i of chars) {
            let c = mapRange(i[2], 0, canvas.height/(scale*1.5), 1, 0);
            ctx.fillStyle  = `rgba(0, 255, 255, ${c})`;
            ctx.fillText(i[3], i[0], i[1]);
        }
    }

    function mapRange( value,  valueLow,  valueHigh,  remappedLow, remappedHigh) {
        return remappedLow + (remappedHigh - remappedLow) * (value - valueLow) / (valueHigh - valueLow);
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    setInterval(draw, 100);
};

function callbackFunc(entries, observer) {
    entries.forEach((entry) => {
        // if(!entry.target.beenSeen) {
        //     entry.target.classList.add(".fade-up-anim");
        //     entry.target.beenSeen = true;
        // }

        if (entry.intersectionRatio > 0) {
            entry.target.classList.remove(entry.target.animationName + "-ready");
            entry.target.classList.add(entry.target.animationName);

            observer.unobserve(entry.target);
        }
    });
}