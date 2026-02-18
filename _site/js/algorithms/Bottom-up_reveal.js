function Copy(sel, opts){
  if(!window.gsap || !sel || !window.SplitText) return;
  if(window.ScrollTrigger && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

  const e = typeof sel === "string" ? document.querySelector(sel) : sel;
  if(!e) return;

  const v = opts || {};
  const i=[], s=[];
  const r = e.hasAttribute("data-copy-wrapper") ? [...e.children] : [e];

  const type = (v.type || e.dataset.copyType || "lines").toLowerCase(); // lines | words | chars
  const start = v.start || e.dataset.start || "top 75%";
  const p = parseFloat(v.opacity ?? e.dataset.opacity ?? 0);
  const d = parseFloat(v.duration ?? e.dataset.duration ?? 1);
  const delay = parseFloat(v.delay ?? e.dataset.delay ?? 0);
  const step = parseFloat(v.step ?? e.dataset.step ?? 0.1);

  // начальные значения (как у тебя), но y/x могут переопределяться
  const from = {
    y: v.y ?? "100%",
    x: v.x ?? "0%",
    opacity: p
  };

  r.forEach(o=>{
    const st = SplitText.create(o,{
      type,                    // "lines" | "words" | "chars"
      mask: type.includes("lines") ? "lines" : undefined,
      linesClass: "line++",
      wordsClass: "word++",
      charsClass: "char++"
    });

    i.push(st);

    // сохраняем твой фикс с textIndent для lines
    if(type.includes("lines")){
      const n = getComputedStyle(o).textIndent;
      n && n!=="0px" && (st.lines[0].style.paddingLeft=n, o.style.textIndent="0");
      s.push(...st.lines);
    } else if(type.includes("words")){
      s.push(...st.words);
    } else {
      s.push(...st.chars);
    }
  });

  gsap.set(s, from);

  const play = () =>
    gsap.to(s,{
      y: 0,
      x: 0,
      opacity: 1,
      duration: d,
      stagger: step,
      ease: v.ease || e.dataset.ease || "power4.out",
      delay,
      scrollTrigger:{ trigger:e, start, once:true }
    });

  const kill = () => i.forEach(x=>x && x.revert && x.revert());

  play();
  return { play, kill };
}
