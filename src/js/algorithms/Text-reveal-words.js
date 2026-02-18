function TextReveal(sel, opts){
    const v=opts||{},t=v.scroll!=null?!!v.scroll:!0,l=v.delay!=null?+v.delay:0,
          a=typeof sel==="string"?gsap.utils.toArray(sel):gsap.utils.toArray(sel? [sel] : []),c=[],
          F=(el,k,fb)=>v[k]!=null?+v[k]:+((el.dataset&&el.dataset[k])||fb),
          S=(el,k,fb)=>v[k]!=null?String(v[k]):String((el.dataset&&el.dataset[k])||fb);

    a.forEach(e=>{
        if(!e||e.hasAttribute("data-copy")||e.hasAttribute("data-copy-wrapper"))return;

        const i=[],s=[];
        let r=e.hasAttribute("data-text-reveal-wrapper")?[...e.children]:[e];

        // ✅ MIN CHANGE 1: добавили выбор типа (по умолчанию "words")
        const type = S(e,"type", S(e,"split","words")); // words | lines

        r.forEach(o=>{
            // ✅ MIN CHANGE 2: type теперь не захардкожен
            const sp=SplitText.create(o,{type:type,wordsClass:"word++",linesClass:"line++"});
            i.push(sp);

            // ✅ MIN CHANGE 3: выбираем что анимировать: words или lines
            const arr = (type==="lines") ? sp.lines : sp.words;

            const n=getComputedStyle(o).textIndent;
            n&&"0px"!==n&&(arr[0].style.paddingLeft=n,o.style.textIndent="0");
            s.push(...arr);
        });

        const p=F(e,"opacity","0"),
              d=F(e,"duration","1"),
              b=F(e,"blur","0"),
              k=F(e,"scaleY","1"),
              y=F(e,"y","0"),
              g=F(e,"step",e.dataset.stagger||"0.1"),
              ease=S(e,"ease","power4.out"),
              start=S(e,"start","top 75%"),
              once=v.once!=null?!!v.once:!0;

        gsap.set(s,{display:"inline-block",transformOrigin:"50% 100%",opacity:p,scaleY:k,y:y,filter:b?`blur(${b}px)`:"blur(0px)"});

        const o={display:"inline-block",transformOrigin:"50% 100%",opacity:1,scaleY:1,y:0,filter:"blur(0px)",duration:d,stagger:g,ease,delay:l};

        let n=null;
        const play=()=>{
            n&&n.kill();
            n=t?gsap.to(s,{...o,scrollTrigger:{trigger:e,start,once}}):gsap.to(s,o);
        },
        kill=()=>{
            n&&n.kill();
            i.forEach(x=>x&&x.revert&&x.revert());
        };

        t&&play();
        e._reveal={play,kill};
        c.push(e._reveal);
    });

    return c.length===1?c[0]:c;
}
