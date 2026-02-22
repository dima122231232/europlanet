if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

addEventListener("pageshow", () => {
    if (!window.gsap) return;

    gsap.set(".loader", { clearProps: "all",yPercent: -100,opacity: 0 });
    gsap.set(".loader-svg", { clearProps: "all", opacity: 0 });
}, { passive: true });

(() => {
    const start = async () => {
        await document.fonts.ready;
        await new Promise(r => requestAnimationFrame(r));

        gsap.set(".loader-svg", { opacity: 0, y: 50 });
        gsap.delayedCall(1.3, () => document.querySelector(".hero-video video")?.play().catch(() => {}));

        gsap.timeline()
        .to(".loader-svg", { opacity: 1, y: 0, duration: 0.5, delay: 0.3 })
        .to(".loader", { yPercent: -100, duration: 0.6, ease: "power2.in" }, "+=0.3")
        .to(".loader-svg", { y: "40vw", duration: 0.6, ease: "power2.in", opacity: 0 }, "1.1")
        .add(() => {
            initLenis();
            window.initAnimations?.();
            window.ScrollTrigger?.refresh();
        });
    };

    const initLenis = () => {
        if (!window.Lenis) return;

        const lenis = new Lenis();
        gsap.ticker.add(t => lenis.raf(t * 1000));
        lenis.on("scroll", ScrollTrigger.update);
    };

    requestAnimationFrame(start);
})();