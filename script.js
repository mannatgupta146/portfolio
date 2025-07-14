function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,

        // for tablet smooth
        tablet: { smooth: true },

        // for mobile
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
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}
locomotiveAnimation();

if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
  // Only run mouseFollower on non-touch devices
  Shery.mouseFollower();
}

Shery.makeMagnet("nav h5" );

Shery.textAnimate("nav h4", {
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