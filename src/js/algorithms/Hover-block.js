(() => {
  if (!window.gsap || innerWidth < 1201) return;

  if (window.CustomEase && gsap.registerPlugin) {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("lm-anim", "0.26, 0.82, 0.38, 1");
  }
  const EASE = window.CustomEase ? "lm-anim" : "power2.out";

  const f = document.querySelector(".lm-float");
  const w = f && f.querySelector(".lm-wrap");
  if (!f || !w) return;

  const text = f.querySelector(".lm-text");

  let follow = false;
  let tl = null;

  const setX = gsap.quickSetter(f, "x", "px");
  const setY = gsap.quickSetter(f, "y", "px");

  gsap.set(f, {
    height: 0,
    backgroundColor: "transparent",
    scale: 0,
    padding: 0,
    overflow: "hidden",
    xPercent: -50,
    yPercent: -50
  });

  gsap.set(w, { width: 0, overflow: "hidden" });
  gsap.set(".lm-st", { opacity: 0 });

  const move = e => {
    if (!follow) return;
    setX(e.clientX);
    setY(e.clientY);
  };

  window.addEventListener("mousemove", move, { passive: true });

  const measure = () => {
    const prevW = w.style.width;
    const prevH = f.style.height;

    w.style.width = "auto";
    f.style.height = "auto";

    const ww = w.offsetWidth;
    const hh = f.offsetHeight;

    w.style.width = prevW;
    f.style.height = prevH;

    return { ww, hh };
  };

  const killAll = () => {
    tl && tl.kill();
    tl = null;
    gsap.killTweensOf([f, w, ".lm-st"]);
  };

  const show = e => {
    follow = true;

    if (text) text.textContent = e.currentTarget?.dataset?.lm || "";
    move(e);

    killAll();
    const { ww, hh } = measure();

    tl = gsap.timeline({ defaults: { overwrite: "auto" } })
      .to(f, {
        height: hh,
        backgroundColor: "#cacaca",
        scale: 1,
        padding: 1,
        duration: 0.5,
        ease: EASE
      }, 0)
      .to(w, {
        width: ww,
        duration: 0.45,
        ease: EASE
      }, 0)
      .to(".lm-st", { opacity: 1, duration: 0.3, ease: "none" }, 0)
      .set(f, { height: "auto" })
      .set(w, { width: "auto" });
  };

  const hide = () => {
    killAll();

    const ww = w.offsetWidth;
    const hh = f.offsetHeight;

    tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => (follow = false)
    })
      .set(f, { height: hh })
      .set(w, { width: ww })
      .set(".lm-st", { opacity: 0 })
      .to(w, { width: 0, duration: 0.4, ease: EASE }, 0)
      .to(f, {
        height: 0,
        backgroundColor: "transparent",
        padding: 0,
        scale: 0,
        duration: 0.4,
        ease: EASE
      }, 0);
  };

  document.querySelectorAll(".lm-hover").forEach(el => {
    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
  });
})();
