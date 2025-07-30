document.addEventListener('DOMContentLoaded', function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    page3Animation(); // Use only once
    menuAnimation();
    loaderAnimation();
});

function page3Animation() {
    const elemC = document.querySelector('#elem-container');
    const fixed = document.querySelector('#fixed-image');
    if (!elemC || !fixed) return;

    // Track touch state
    let touchActive = false;
    
    const showFixed = () => { 
        fixed.style.display = 'block';
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    };
    
    const hideFixed = () => { 
        fixed.style.display = 'none';
        // Restore scrolling
        document.body.style.overflow = '';
    };

    // Desktop events
    elemC.addEventListener('mouseenter', showFixed);
    elemC.addEventListener('mouseleave', hideFixed);

    // Mobile touch handling
    elemC.addEventListener('touchstart', (e) => {
        touchActive = true;
        showFixed();
        // Prevent immediate hide on scroll
        setTimeout(() => touchActive = false, 100);
    });
    
    // Hide when tapping outside image
    document.addEventListener('touchend', (e) => {
        if (touchActive && fixed.style.display === 'block') {
            if (!e.target.closest('.elem')) {
                hideFixed();
            }
        }
    });

    // Handle per-element image setting
    const elems = document.querySelectorAll('.elem');
    elems.forEach(e => {
        const setImage = () => {
            const image = e.getAttribute('data-image');
            fixed.style.backgroundImage = `url(${image})`;
        };

        // Desktop
        e.addEventListener('mouseenter', setImage);
        
        // Mobile
        e.addEventListener('touchstart', (e) => {
            setImage();
            e.stopPropagation(); // Prevent container handler
        });
    });
}

const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    freeMode: true,
    grabCursor: true,
    watchOverflow: true,
});

function menuAnimation() {
    const menu = document.querySelector('nav h3');
    const full = document.querySelector('#full-scr');
    const navimg = document.querySelector('nav img');
    let flag = 0;
    let touchStartTime;
    let touchMoved = false;

    const toggleMenu = () => {
        if (flag === 0) {
            full.style.top = '0';
            navimg.style.opacity = 0;
            flag = 1;
        } else {
            full.style.top = '-100%';
            navimg.style.opacity = 1;
            flag = 0;
        }
    };

    menu.addEventListener('click', (e) => {
        // Prevent click if triggered by touch to avoid double-toggle
        if (!touchMoved) toggleMenu();
    });

    menu.addEventListener('touchstart', () => {
        touchMoved = false;
        touchStartTime = new Date().getTime();
    });

    menu.addEventListener('touchmove', () => {
        touchMoved = true;
    });

    menu.addEventListener('touchend', (e) => {
        const touchDuration = new Date().getTime() - touchStartTime;
        // Trigger only if touch was quick (under 300ms) and didn't move
        if (!touchMoved && touchDuration < 300) {
            e.preventDefault(); // Prevents mouse/click events
            toggleMenu();
        }
    });
}

function loaderAnimation() {
    const loader = document.querySelector('#loader');
    setTimeout(() => {
        loader.style.top = '-100%';
    }, 4200);
}