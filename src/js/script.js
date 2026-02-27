if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// --- ДОБАВИЛИ ГЕЙТ ---
window.afterLoader = (fn) => {
    if (window.__loaderDone) fn();
    else (window.__loaderQueue ||= []).push(fn);
};
window.__loaderDone = false;
// -----------------------

(() => {
    const start = async () => {
        await document.fonts.ready;
        await new Promise(r => requestAnimationFrame(r));

        gsap.set(".loader-svg", { opacity: 0, y: 50 });
        gsap.delayedCall(1.3, () => document.querySelector(".hero-video video")?.play().catch(() => {}));

        initLenis();
        await window.initAnimations?.();
        window.ScrollTrigger?.refresh();

        gsap.timeline({
            onComplete: () => {
                // --- ДОБАВИЛИ ---
                window.__loaderDone = true;
                window.__loaderQueue?.forEach(fn => fn());
                window.__loaderQueue = [];
                // ----------------
            }
        })
            .to(".loader-svg", { opacity: 1, y: 0, duration: 0.5, delay: 0.3 })
            .to(".loader", { yPercent: -100, duration: 0.6, ease: "power2.in" }, "+=0.3")
            .to(".loader-svg", { y: "40vw", duration: 0.6, ease: "power2.in", opacity: 0 }, "1.1");
    };

    const initLenis = () => {
        if (!window.Lenis) return;

        const lenis = new Lenis();
        gsap.ticker.add(t => lenis.raf(t * 1000));
        lenis.on("scroll", ScrollTrigger.update);
    };

    requestAnimationFrame(start);
})();