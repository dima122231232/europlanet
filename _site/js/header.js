(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("header-anim","0.4, 0, 0.2, 1");
    CustomEase.create("menuEase", "0.7,0,1,1");
    gsap.set(".nav__logo img",{ scale:4 });

    ScrollTrigger.create({
        start: 20,
        end: 1,         
        scrub: true,
        onUpdate: self => {
            gsap.to(".nav__logo img",{scale: self.progress ? 1 : 4,duration: .72,ease: "power2.inOut",overwrite: "auto"});
        }
    });

    const q = s => document.querySelectorAll(s);
    q(".header-menu__item").forEach(item => {
        const t = item.querySelector(".header-menu__item-text");
        if (!t) return;

        const u = document.createElement("span");
        u.className = "header-menu__underline";
        t.appendChild(u);
        gsap.set(u, { transformOrigin:"0% 50%", scaleX:0, xPercent:0 });

        const enter = () => (gsap.set(u,{ xPercent:0 }), gsap.to(u,{ scaleX:1, duration:.35, ease:"power1.in", overwrite:"auto" }));
        const leave = () => gsap.to(u,{ scaleX:0, xPercent:100, duration:.3, ease:"power3.out", overwrite:"auto" });

        item.addEventListener("pointerenter", enter, {passive:true});
        item.addEventListener("pointerleave", leave, {passive:true});
    });

    document.querySelector('.nav__burger').addEventListener('click', () => {
    document.querySelector('.header-menu').style.transform = 'translateX(0%)';
    BlockReveal(".header-animation", {duration:1,step:.02,opacity:1,delay:.5,ease:"header-anim",scroll:false,slide:true});
    gsap.fromTo(".header-menu__divider",{scaleX:0},{scaleX:1,delay:.2,stagger:.05,duration:1,ease:"header-anim"})
    });
    document.querySelector('.header-menu__close').addEventListener('click', () =>
            document.querySelector('.header-menu').style.transform = 'translateX(100%)',
    );
})();

