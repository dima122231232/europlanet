window.initAnimations = () => {

    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

    CustomEase.create("services-anim", ".7, .2, .3, 1");
    CustomEase.create("faq-anim", "0.75, 0, 0.25, 1");
    CustomEase.create("work-anim","0.77,0,0.175,1");

    let vw = window.innerWidth;

    const mm = gsap.matchMedia();
    const onMedia = (query, init) => mm.add(query, () => {
        const ctx = gsap.context(() => init());
        return () => ctx.revert();
    });
    // home------------------------------
    afterLoader(() => {
        TextReveal(".hero-reveal",{duration:2,scaleY:.7,step:0.01,y:-20,blur:10,opacity:0,delay:.2});
        TextReveal(".hero__title",{step:0.05,y:-10,opacity:0});

        gsap.fromTo(".hero__content--bottom, .hero-video",{scale:.9,opacity:0},{scale:1,opacity:1,ease:"power2.out",duration:1});
        gsap.fromTo(".hero",{y:0,scale:1,opacity:1},{y:-100,scale:.9,opacity:0,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"+=50%",scrub:1}});
    });
    {
        const ul = document.querySelector(".hero__trusted-list");
        if (ul && window.gsap) {

            const track = document.createElement("div");
            ul.parentNode.insertBefore(track, ul);
            track.appendChild(ul);

            const clone = ul.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);

            Object.assign(track.style, { display: "flex", width: "max-content", willChange: "transform" });
            [ul, clone].forEach(n => Object.assign(n.style, { flex: "0 0 auto", width: "auto" }));

            let tl, lastW = 0;

            const build = () => {
                const w = document.documentElement.clientWidth;
                if (w === lastW && tl) return;
                lastW = w;

                const p = tl ? tl.progress() : 0;
                tl?.kill();

                const dist = ul.scrollWidth || 1;
                const dur = dist / 30;

                tl = gsap.to(track, { x: -dist, duration: dur, ease: "none", repeat: -1 });
                tl.progress(p);
            };

            requestAnimationFrame(build);

            let raf = 0;
            const onResize = () => {
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(build);
            };

            addEventListener("resize", onResize, { passive: true });

        }
    }

    // about---------------------------------
    {
        const el = document.querySelector(".about__description");
        if (el) {
            const s = new SplitText(el,{type:"words"});
            gsap.fromTo(s.words,{color:"#555"},{color:"#cacaca",stagger:.2,duration:.5,scrollTrigger:{trigger:el,start:"top 90%",end:"bottom 10%",scrub:true}});
        }
    }

    // work---------------------------------
    {
        BlockReveal(".work__body-adaptiv",{device:"mobile",duration:1.5,y:50,opacity:0,start:"top 80%"});
        Copy(".work__heading", {start:"top 90%",duration:1.35,opacity:0});
        const work = document.querySelector(".work");
        if (work) {

            gsap.set(".work__item",{scale:.6});

            const clients = gsap.utils.toArray(".work__client-text");
            const lines   = gsap.utils.toArray(".work__line");

            const moveIndex = i => ({ idx:{yPercent:-100*i,y:-20*i}, txt:{yPercent:-100*i,y:-8*i} });

            onMedia("(min-width: 1201px)", () => {

                const segmentScale = (selector, fromScale, toScale) => {
                    const els = gsap.utils.toArray(selector);
                    gsap.set(els,{transformOrigin:"50% 50%"});
                    els.forEach((el,i)=>gsap.fromTo(el,{scale:fromScale},{scale:toScale,ease:"none",scrollTrigger:{trigger:work,scrub:1,invalidateOnRefresh:true,start:()=>`top+=${work.offsetHeight*(i/els.length)} bottom`,end:()=>`top+=${work.offsetHeight*((i+1)/els.length)} bottom`}}));
                    return els;
                };

                const cardItems  = segmentScale(".work__item", .6, 1);
                segmentScale(".work__image", 1.6, 1);

                let state = -1;

                ScrollTrigger.create({
                    trigger: work,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    onUpdate: self => {

                        const max = Math.min(cardItems.length, clients.length, lines.length) - 1;
                        const next = Math.min(max, Math.floor(self.progress * (max + 1)));
                        if (next === state) return;
                        state = next;

                        const m = moveIndex(state);

                        gsap.to(".work__index",{...m.idx,duration:1.2,ease:"work-anim",overwrite:"auto"});
                        gsap.to(".work__title-min, .work__description",{...m.txt,duration:1.2,ease:"work-anim",overwrite:"auto"});

                        gsap.to(clients,{color:"#333",scale:1,duration:.8,overwrite:"auto"});
                        gsap.to(clients[state],{color:"#cacaca",scale:1.1,duration:.5,overwrite:"auto"});

                        gsap.to(lines,{backgroundColor:"#333",width:8,duration:.8,overwrite:"auto"});
                        gsap.to(lines[state],{backgroundColor:"#cacaca",width:16,duration:.5,overwrite:"auto"});
                    }
                });

            });

        }
    }

    // why us-------------------------------
    {
        
        Copy(".why-us__title", {start:"top 90%",opacity:0,delay:.1});
        Copy(".why-us__description",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 90%"});
        BlockReveal(".why-us__bottom > * > div", {start:"top 80%", step:0.1,duration:1.35,y:100,opacity:0});
        const values = gsap.utils.toArray(".why-us__value");

        values.forEach((el,i)=>{
        const tl = gsap.timeline({
            defaults:{ duration:.8, ease:"power1.out", overwrite:"auto" },
            scrollTrigger:{ trigger:el, start:"top 80%", once:true }
        });

        tl.to(el,{ innerText:[300,10,99,25][i], duration:i? .95:1.2, snap:{innerText:1}});
        });
    }

    //testimonial----------------------------
    {
        BlockReveal(".testimonial__container > div:first-child",{duration:1.5,y:50,opacity:0,start:"top 60%" ,trigger:".testimonial__container"});
        BlockReveal(".testimonial__container > div:last-child",{device:"desktop",duration:1.5,delay:.1,opacity:0,start:"top 60%" ,trigger:".testimonial__container"});
        BlockReveal(".testimonial__container > div:last-child",{device:"mobile",duration:1.5,delay:.1,opacity:0,start:"top 60%"});
        BlockReveal(".testimonial__author",{duration:1.5,y:50,opacity:0,start:"top 90%"});
        gsap.fromTo(".testimonial-polosa",{scaleX:0},{scaleX:1,duration:1,ease:"power1.inOut",scrollTrigger:{trigger:".testimonial__author",start:"top 90%"}})
    }

    // services------------------------------
    Copy(".services__title", {start:"top 90%",opacity:0,duration:1.35});
    gsap.utils.toArray(".services__item-wrapper").forEach(el=>gsap.from(el,{opacity:0,x:-70,delay:.15,duration:.8,ease:"power1.out",overwrite:"auto",scrollTrigger:{trigger:el,start:"top 80%",once:true}}));
    gsap.utils.toArray(".services__item-line").forEach(el=>gsap.from(el,{scaleX:0,duration:.8,ease:"power1.out",overwrite:"auto",scrollTrigger:{trigger:el,start:"top 80%",once:true}}));


    
    mm.add({ desktop: "(min-width: 1201px)", mobile: "(max-width: 1200px)" }, (context) => {

        const { desktop, mobile } = context.conditions;

        document.querySelectorAll('.services__item-wrapper').forEach(item => {

            const $ = gsap.utils.selector(item);
            const name = item.querySelector('.services__name');
            if (!name) return;

            const h = name.offsetHeight;

            const tl = gsap.timeline({paused:true,defaults:{duration:.6,ease:"services-anim",overwrite:"auto"}});

            tl.to(item,{backgroundColor:"#181818"},0)
                .to($(".services__content"),{y:-h},0)
                .fromTo($(".services__item-body"),{height:h},{height:"var(--services-animation-adaptiv)"},0)
                .to($(".services__details"),{opacity:1},0)
                .to($(".services__name-adaptiv"),{opacity:0},0)
                .to($(".services__index"),{fontSize:80},0)
                .to($(".services__media"),{opacity:1},0)
                .to($(".services__button-line--twise"),{opacity:0},0)
                .to($(".services__button-p-m"),{rotate:360},0);

            if (mobile) tl.fromTo($(".services__image"),{scale:.4,y:-300},{scale:1,y:0},0);

            if (desktop) {
                item.addEventListener("mouseenter", () => tl.play());
                item.addEventListener("mouseleave", () => tl.reverse());
            }

            if (mobile) {
                item.addEventListener("click", () => tl.reversed() ? tl.play() : tl.reverse());
            }

        });

    });

    // process------------------------------
    BlockReveal(".process__step", {start:"top 70%", step:0,duration:1.35,y:100,opacity:0});
    Copy(".process__title", {start:"top 90%",duration:1.35,opacity:0});

    onMedia("(min-width: 1201px)", () => {

        const process = document.querySelector(".process__container");
        if (!process) return;

        let process_w = process.offsetWidth + 72;

        ScrollTrigger.create({trigger:".process",start:"top top",end:"+=1000vh",scrub:1,pin:true,onUpdate:self=>gsap.to(".process__container",{x:`${-(process_w-vw)*self.progress}px`,duration:0,ease:"none"})});

        const onResize = () => (vw = innerWidth, process_w = process.offsetWidth, ScrollTrigger.refresh());
        addEventListener("resize", onResize);

        return () => removeEventListener("resize", onResize);

    });

    //testimonials----------------------------
    BlockReveal(".testimonials__rating", {start:"top 80%",y:10,opacity:0});
    TextReveal(".testimonials__label", {start:"top 80%",y:10,opacity:0,delay:.1});
    TextReveal(".testimonials__title",{type:"lines",step:.2,y:30,opacity:0,delay:.2,start:"top 80%"});
    
    BlockReveal(".testimonials__item", {start:"top 80%",step:.05,y:50,opacity:0});

    // pricing------------------------------
    {
        Copy(".pricing__title", {start:"top 80%",y:60,opacity:0,delay:.1});
        TextReveal(".pricing__lead",{type:"lines",step:.07,y:30,opacity:0,start:"top 80%"});
        BlockReveal(".pricing__billing", {start:"top 80%",y:30,opacity:0});
        BlockReveal(".pricing-card", {start:"top 60%",step:.2,y:100,opacity:0});
        BlockReveal(".pricing__bespoke-content", {start:"top 80%",y:30,opacity:0});
        gsap.fromTo(".pricing__bespoke-divider",{scaleX:0},{scaleX:1,duration:1,ease:"power1.inOut",scrollTrigger:{trigger:".pricing__bespoke-content",start:"top 80%"}})

        const $ = s => document.querySelector(s);
        const t = $(".pricing__billing-toggle");

        const cfg = {
        toggle: { d:.8, e:"power4.inOut", squash:.98 },
        price : { d:.8, e:"power1.out" }
        };

        const setPrices = list => list.forEach(([sel,y]) =>
        gsap.to(`${sel} span`, { yPercent:y, duration:cfg.price.d, ease:cfg.price.e, overwrite:"auto" })
        );

        const move = (x, prices) => (
        gsap.timeline({ defaults:{ overwrite:"auto" } })
            .to(t, { xPercent:x, duration:cfg.toggle.d, ease:cfg.toggle.e }, 0)

            .to(t, { scaleY: cfg.toggle.squash, duration: cfg.toggle.d/2, ease: "power2.out" }, 0)
            .to(t, { scaleY: 1,                duration: cfg.toggle.d/2, ease: "power2.in"  }, cfg.toggle.d/2),

        setPrices(prices)
        );
        document.addEventListener("click", e => {
        if (e.target.closest(".pricing__billing-option--monthly"))
            return move(0,   [[".price-tag",0]]);
        if (e.target.closest(".pricing__billing-option--annual"))
            return move(100, [
            [".pricing-starter-first",-100],
            [".pricing-starter-twise",-1000],
            [".pricing-growth-first",-100],
            [".pricing-growth-twise",-1000],
            ]);
        });
    }

    // FAQ------------------------------
    {
        Copy(".faq__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
        BlockReveal(".faq__item", {start:"top 80%",x:150,duration:1.35,opacity:0});

        document.querySelectorAll('.faq__item').forEach(item => {

            const $ = gsap.utils.selector(item);
            const txt = item.querySelector('.faq__answer-text');
            if (!txt) return;

            const h = txt.offsetHeight;

            const tl = gsap.timeline({paused:true,defaults:{duration:.6,ease:"faq-anim"}});

            tl.to($(".faq__answer"),{height:h+32},0)
                .to($(".faq__toggle"),{rotate:360},0)
                .to($(".faq__toggle--line-animation"),{opacity:0},0);

            tl.reverse();
            item.addEventListener("click", () => tl.reversed() ? tl.play() : tl.reverse());

        });
    }

    //blog-preview-----------------------------
    {
        Copy(".blog-preview__title", {start:"top 90%",duration:1.35,opacity:0});
        BlockReveal(".lm-blog-preview--animation", {start:"top 90%",step:.05,duration:1.35,y:100,opacity:0});
        const D = 0.6;
        const EASE = CustomEase
            ? (gsap.registerPlugin(CustomEase), CustomEase.create("hover", "0.5,0,0.2,1"), "hover")
            : "power2.out";

        gsap.defaults({ duration: D, ease: EASE, overwrite: "auto" });

        document.querySelectorAll(".blog-preview__card").forEach(card => {
            const col   = card.closest(".blog-preview__column--left");
            const imgWp = card.querySelector(".blog-preview__image-wp");

            const enter = () => (
            col   && gsap.to(col,  { scale: 0.97 }),
            gsap.to(card,          { scale: 1.03 }),
            imgWp && gsap.to(imgWp,{ opacity: 0.6 })
            );

            const leave = () => (
            col   && gsap.to(col,  { scale: 1 }),
            gsap.to(card,          { scale: 1 }),
            imgWp && gsap.to(imgWp,{ opacity: 1 })
            );

            card.addEventListener("mouseenter", enter);
            card.addEventListener("mouseleave", leave);
        });

        document.querySelectorAll(".blog-preview__item").forEach(item => {
            const image = item.querySelector(".blog-preview__item-image");
            const img   = item.querySelector(".blog-preview__item-img");

            const enter = () => (
            gsap.to(item,          { backgroundColor: "var(--color-black-soft)" }),
            image && gsap.to(image,{ scale: 0.96, opacity: 0.6 }),
            img   && gsap.to(img,  { scale: 1.04 })
            );

            const leave = () => (
            gsap.to(item,          { backgroundColor: "var(--color-black)" }),
            image && gsap.to(image,{ scale: 1, opacity: 1 }),
            img   && gsap.to(img,  { scale: 1 })
            );

            item.addEventListener("mouseenter", enter);
            item.addEventListener("mouseleave", leave);
        });
        
    }

    //work-together----------------------------------
    {
        Copy(".work-together__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
        Copy(".work-together__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
        BlockReveal(".work-together__button", {start:"top 80%",y:30,opacity:0,delay:.1});
    }
};
