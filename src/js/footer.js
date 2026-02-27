afterLoader(() => {
    const p = document.querySelector(".footer__input-placeholder");
    const b = document.querySelector(".footer__input-bg");

    gsap.set(p, { x:0, y:0, scale:1 });

    gsap.utils.toArray(".footer__input").forEach(el => {
        el.addEventListener("focus", () => {
        gsap.to(p, { x:-30, y:-35, scale:.7, duration:.65, ease:"power3.inOut", overwrite:"auto" });
        gsap.to(b, { scaleX:1, duration:.65, ease:"power3.inOut", overwrite:"auto" });
        });

        el.addEventListener("blur", () => {
        gsap.to(p, { x:0, y:0, scale:1, duration:.65, ease:"power3.inOut", overwrite:"auto" });
        gsap.to(b, { scaleX:0, duration:.65, ease:"power3.inOut", overwrite:"auto" });
        });
    });
    

    gsap.fromTo(".footer__background",{y:-350},{y:innerWidth<801?0:-60,ease:"none",immediateRender:false,scrollTrigger:{trigger:".footer__background",start:"-100% bottom",end:"100% bottom",scrub:0,invalidateOnRefresh:true}});
    ScrollTrigger.refresh();
});