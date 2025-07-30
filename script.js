let locoScroll;

function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Reset #main transform properties before initializing
    document.querySelector("#main").style.transform = "none";
    
    locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function loaderAnimation() {
    const loader = document.querySelector('#loader');
    setTimeout(() => {
        // Fade out loader
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        
        // After fade out completes
        setTimeout(() => {
            // Completely remove loader
            loader.style.display = "none";
            
            // IMPORTANT: Reset GSAP transforms before animations
            gsap.set("#home", { clearProps: "all" });
            gsap.set(".boundingelem", { clearProps: "transform,opacity" });
            
            // Start animations
            loadingAnimation();
            firstPageAnim();
            
            // Force updates
            locoScroll.update();
            ScrollTrigger.refresh();
            
            // Make main content visible
            document.querySelector("#main").style.opacity = "1";
        }, 700);
    }, 4200);
}

function loadingAnimation() {
    // Reset transforms before animating
    gsap.set("#home", { 
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        translateY: 0,
        borderRadius: 0 
    });
    
    var tl = gsap.timeline();
    tl.from("#home", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    }, "start");
    tl.from("#home", {
        scaleX: 0.7,
        scaleY: 0.2,
        translateY: "80%",
        borderRadius: "100px",
        duration: 2,
        ease: "expo.out"
    }, "start");
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    });
    tl.from("#home h1, #home p, #home div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    });
}

function firstPageAnim() {
    // Reset transforms before animating
    gsap.set(".boundingelem", { y: 0, opacity: 1 });
    gsap.set("#homefooter", { y: 0, opacity: 1 });
    
    var tl = gsap.timeline();
    tl.from("nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut",
    });
    tl.to(".boundingelem", {
        y: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 2,
        delay: -1,
        stagger: 0.2,
    });
    tl.from("#homefooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut",
    });
}

// ========== SHERY ANIMATIONS ==========
if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    Shery.mouseFollower();
}

Shery.makeMagnet("nav h4");

Shery.textAnimate("", {
    style: 1,
    y: 1,
    delay: 0.3,
    duration: 10,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 1,
});

Shery.imageMasker("nav button", {
    mouseFollower: true,
    text: "Click Me",
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});

// ========== RUN ON LOAD ==========
document.addEventListener('DOMContentLoaded', function () {
    locomotiveAnimation();
    loaderAnimation();
});