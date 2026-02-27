window.initAnimations = () => {
    afterLoader(() => {
        gsap.set(".waitlist-main",{opacity:1})
        Copy(".waitlist__label", {opacity:0});
        Copy(".waitlist__title", {opacity:0,delay:.05});
        Copy(".waitlist__text",{type:"lines",step:.15,y:30,opacity:0,duration:1,start:"top 100%"});
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(".waitlist__form", { opacity: 1, scale: 1, duration: 0.6 }, 0.1)
        .to(".waitlist__bottom", { opacity: 1, scale: 1, duration: 0.6 }, 0.15)
        .to(".waitlist__socials", { opacity: 1, duration: 0.6 }, 0.2)
        .to(".waitlist-bg", { opacity: 1, duration: 2 }, 0.25);
    });

}