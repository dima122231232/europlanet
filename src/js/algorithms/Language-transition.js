window.initAnimations = () => {
    if (!window.SplitText) return;

    const TEXT_SEL = "p,span,h1,h2,h3,h4,h5,h6,img";
    const LINK_SEL = ".lang-switch a";
    const DUR_IN   =.6;
    const DUR_OUT  =.6;

    let split = null;

    const debounce = (fn, ms = 150) => {
        let t;
        return (...args) => (clearTimeout(t), (t = setTimeout(() => fn(...args), ms)));
    };

    const rebuild = () => {
        if (split) split.revert();
        split = new SplitText(TEXT_SEL, { type: "lines", linesClass: "lt-line" });

        gsap.set(split.lines, { "--p": 1 });
        gsap.to(split.lines, { "--p": 0, duration: DUR_IN, ease: "power2.out" });
    };

    const go = (href) => gsap.to(split?.lines || [], { "--p": 1, duration: DUR_OUT, ease: "power2.inOut", onComplete: () => (window.location.href = href) });

    requestAnimationFrame(() => {
        rebuild();
        window.addEventListener("resize", debounce(rebuild), { passive: true });

        document.querySelectorAll(LINK_SEL).forEach((a) => {
            a.addEventListener("click", (e) => (e.preventDefault(), go(a.href)));
        });
    });
}
