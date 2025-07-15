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

Shery.makeMagnet("nav h4" );

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

function loadingAnimation() {

    var tl = gsap.timeline()
    tl.from("#home", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#home", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "100px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from("#home h1, #home p, #home div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}
loadingAnimation();

function firstPageAnim() {
    var tl = gsap.timeline();
  
    tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
      .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
      })
      .from("#homefooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
      });
  }