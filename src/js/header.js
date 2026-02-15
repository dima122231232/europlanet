(() => {
    gsap.set(".nav__logo img",{scale:4})
    gsap.to(".nav__logo img", {
        scale: 1,
        duration:.72,
        ease: "power2.inOut",
        scrollTrigger: {start: 20,toggleActions: "play reverse play reverse"}
    });
    document.querySelector('.nav__burger').addEventListener('click', () =>
        document.querySelector('.header-menu').style.transform = 'translateX(0%)'
    );
    document.querySelector('.header-menu__close').addEventListener('click', () =>
            document.querySelector('.header-menu').style.transform = 'translateX(100%)'
        );

})();

