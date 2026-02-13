
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
let vw = window.innerWidth;

(() => {
    const lenis = new Lenis({ smoothWheel: true, smoothTouch: false });
    const raf = (t) => (lenis.raf(t), requestAnimationFrame(raf));
    requestAnimationFrame(raf);
    
})();
// const manualEl = document.querySelector("#manual");
// if (manualEl) {
//     Copy(manualEl, false, 2.3).play(); 

// }