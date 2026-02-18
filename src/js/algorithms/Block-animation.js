function BlockReveal(sel, opts){
  if(!window.gsap) return;
  if(window.ScrollTrigger && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

  const v=opts||{},
        D={scroll:true,start:"top 80%",once:true,duration:1,ease:"power4.out",delay:0,step:0.06,
           y:20,x:0,scale:1,scaleX:1,scaleY:1,opacity:0,blur:0,overwrite:"auto",device:"all",
           slide:false, slideClass:"br-mask"}; // <-- ОДНА настройка: slide

  const get=(k,d)=>v[k]!=null?v[k]:d;
  const normStart=s=>(typeof s=="string"&&/^\s*\d+%?\s+(top|center|bottom)\s*$/i.test(s))?s.replace(/\s+/g," ").split(" ").reverse().join(" "):s;

  const wrapMask = (el, cls) => {
    const p = el.parentNode;
    if(!p) return;
    if(p.classList && p.classList.contains(cls)) return; // уже обёрнут

    const w = document.createElement("div");
    w.className = cls;
    w.style.overflow = "hidden";
    w.style.display = "block";

    // если inline — делаем inline-block, чтобы translate работал предсказуемо
    const ds = getComputedStyle(el).display;
    if(ds === "inline") el.style.display = "inline-block";

    p.insertBefore(w, el);
    w.appendChild(el);
  };

  const run=()=>{
    const mode=String(get("device",D.device)),isMobile=innerWidth<1201;
    if(mode==="mobile"&&!isMobile) return;
    if(mode==="desktop"&&isMobile) return;

    const a=gsap.utils.toArray(sel),
          o={...D,...v},
          S=normStart(get("start",D.start));

    const dur=+get("duration",o.duration),
          del=+get("delay",o.delay),
          step=+get("step",o.step);

    const slide=!!get("slide",o.slide);
    const cls=String(get("slideClass",o.slideClass)||"br-mask");

    const op0=+get("opacity",o.opacity),
          y0 =+get("y",o.y),
          x0 =+get("x",o.x),
          b0 =+get("blur",o.blur);

    const trigOpt=get("trigger",null);
    const commonTrig = trigOpt ? (typeof trigOpt==="string" ? document.querySelector(trigOpt) : trigOpt) : null;

    // Маска только если включили slide
    if(slide) a.forEach(el => wrapMask(el, cls));

    // стартовые значения (как раньше, но если slide=true → yPercent:100 вместо y)
    gsap.set(a,{
      willChange:"transform,opacity,filter",
      opacity:op0,
      x:x0,
      ...(slide ? { yPercent:100 } : { y:y0 }),
      scale:+get("scale",o.scale),
      scaleX:+get("scaleX",o.scaleX),
      scaleY:+get("scaleY",o.scaleY),
      filter:b0?`blur(${b0}px)`:"none"
    });

    // ВАЖНО: чтобы step работал и при scroll:false — делаем как в scroll режиме: forEach + delay*index
    if(!get("scroll",o.scroll) || !window.ScrollTrigger){
      a.forEach((el,i)=>{
        gsap.to(el,{
          opacity:1,
          x:0,
          ...(slide ? { yPercent:0 } : { y:0 }),
          scale:1,scaleX:1,scaleY:1,
          filter:"blur(0px)",
          duration:dur,
          delay:del + i*step,
          ease:get("ease",o.ease),
          overwrite:get("overwrite",o.overwrite)
        });
      });
      return;
    }

    a.forEach((el,i)=>{
      gsap.to(el,{
        opacity:1,y:0,x:0,scale:1,scaleX:1,scaleY:1,filter:"blur(0px)",
        ...(slide ? { yPercent:0, y:null } : null), // slide → ведём yPercent в 0
        duration:dur,
        delay:del + i*step,
        ease:get("ease",o.ease),
        overwrite:get("overwrite",o.overwrite),
        scrollTrigger:{trigger: commonTrig || el, start:S, once:!!get("once",o.once)}
      });
    });
  };

  const mm=gsap.matchMedia?gsap.matchMedia():null;
  return mm?(mm.add("(min-width: 0px)",run),mm):run();
}
