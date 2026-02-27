window.initAnimations = async () => {

    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("about-anim","0.77,0,0.175,1");

    // 1------------------------------
    afterLoader(() => {
        gsap.fromTo(".about-hero",{y:0,scale:1,opacity:1},{y:-100,scale:.9,opacity:0,ease:"none",scrollTrigger:{trigger:".about-hero",start:"top top",end:"+=100%",scrub:0}});
        gsap.set(".about-hero__title, .about-hero__description", {opacity:1});
        Copy(".about-hero__title", {opacity:0});
        Copy(".about-hero__description",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 100%"});
        gsap.fromTo(".about-hero__image",{opacity:0}, {opacity:3,duration:5});
    });
    // 2------------------------------
    BlockReveal(".about-values__numbers",{opacity:0,slide:true,device:"desktop",start:"top 90%"});
    Copy(".about-values__title-first", {start:"top 90%",opacity:0});
    Copy(".about-values__title-twise", {start:"top 90%",opacity:0});
    Copy(".about-values__text-first",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 90%"});
    Copy(".about-values__text-twise",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 90%"});

    let state = 0;
    ScrollTrigger.create({
        trigger: ".about-values__container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: self => {
            const half = self.progress >= 0.5 ? 2 : 1;

            if (half !== state) {
                state = half;

                gsap.to(".about-values__number", {
                    yPercent: half === 2 ? -100 : 0,
                    y: half === 2 ? -10 : 0,
                    duration: .5,
                    ease: "about-anim",
                    overwrite: "auto"
                });
            }
        }
    });
    
    // 3------------------------------
    Copy(".about-origins__title", {start:"top 80%",opacity:0,duration:1.35});
    Copy(".about-origins__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
    gsap.fromTo(".about-origins__image",{y:0},{y:100,ease:"none",scrollTrigger:{trigger:".about-origins__media",start:"top bottom",end:"bottom top",scrub:0}});
    
    // 4------------------------------
    Copy(".about-awards__title", {start:"top 80%",opacity:0,duration:1.35});
    BlockReveal(".about-awards__item",{opacity:0,scale:.9,start:"top 80%"});
    gsap.utils.toArray(".about-awards__divider").forEach(el=>gsap.from(el,{scaleX:0,duration:1.35,ease:"power1.out",overwrite:"auto",scrollTrigger:{trigger:el,start:"top 80%",once:true}}));

    // 5------------------------------
    Copy(".about-team__title", {start:"top 80%",opacity:0,duration:1.35});
    Copy(".about-team__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
    BlockReveal(".about-team__member",{opacity:0,y:100,step:.1,start:"top 80%"});

    gsap.utils.toArray(".about-team__link").forEach(link => {
        const bg = link.querySelector(".about-team__link-bg"), s={a:180,b:360,c:360}, r=()=>{bg.style.mask=`conic-gradient(from ${s.a}deg,transparent ${s.b}deg,black ${s.c}deg)`;bg.style.webkitMask=bg.style.mask};r();
        link.addEventListener("mouseenter",()=>gsap.to(s,{a:360,b:0,c:0,duration:.6,ease:"power2.out",onUpdate:r}));
        link.addEventListener("mouseleave",()=>gsap.to(s,{a:180,b:360,c:360,duration:.6,ease:"power2.out",onUpdate:r}));
    });

    //about-years----------------------------------  
    const YEARS_DATA = [
        { year: "1992", text: "Company is founded", icon: "/img/about/years/1.svg", alt: "Company founded" },
        { year: "1993", text: "First big milestone", icon: "/img/about/years/1.svg", alt: "Milestone" },
        { year: "1994", text: "Expansion", icon: "/img/about/years/1.svg", alt: "Expansion" },
        { year: "1995", text: "New office", icon: "/img/about/years/1.svg", alt: "New office" },
        { year: "1996", text: "International projects", icon: "/img/about/years/1.svg", alt: "International projects" },
        { year: "1997", text: "Awards", icon: "/img/about/years/1.svg", alt: "Awards" },
        { year: "1998", text: "New direction", icon: "/img/about/years/1.svg", alt: "New direction" },
        { year: "1999", text: "Today", icon: "/img/about/years/1.svg", alt: "Today" },
        { year: "2000", text: "Company is founded", icon: "/img/about/years/1.svg", alt: "Company founded" },
        { year: "2001", text: "First big milestone", icon: "/img/about/years/1.svg", alt: "Milestone" },
        { year: "2002", text: "Expansion", icon: "/img/about/years/1.svg", alt: "Expansion" },
        { year: "2003", text: "New office", icon: "/img/about/years/1.svg", alt: "New office" },
        { year: "2004", text: "International projects", icon: "/img/about/years/1.svg", alt: "International projects" },
        { year: "2005", text: "Awards", icon: "/img/about/years/1.svg", alt: "Awards" },
        { year: "2006", text: "New direction", icon: "/img/about/years/1.svg", alt: "New direction" },
        { year: "2007", text: "Today", icon: "/img/about/years/1.svg", alt: "Today" },
        { year: "2008", text: "Company is founded", icon: "/img/about/years/1.svg", alt: "Company founded" },
        { year: "2009", text: "First big milestone", icon: "/img/about/years/1.svg", alt: "Milestone" },
        { year: "2010", text: "Expansion", icon: "/img/about/years/1.svg", alt: "Expansion" },
        { year: "2011", text: "New office", icon: "/img/about/years/1.svg", alt: "New office" },
        { year: "2012", text: "International projects", icon: "/img/about/years/1.svg", alt: "International projects" },
        { year: "2013", text: "Awards", icon: "/img/about/years/1.svg", alt: "Awards" },
        { year: "2014", text: "New direction", icon: "/img/about/years/1.svg", alt: "New direction" },
        { year: "2015", text: "Today", icon: "/img/about/years/1.svg", alt: "Today" },
        { year: "2016", text: "Company is founded", icon: "/img/about/years/1.svg", alt: "Company founded" },
        { year: "2017", text: "First big milestone", icon: "/img/about/years/1.svg", alt: "Milestone" },
        { year: "2018", text: "Expansion", icon: "/img/about/years/1.svg", alt: "Expansion" },
        { year: "2019", text: "New office", icon: "/img/about/years/1.svg", alt: "New office" },
        { year: "2020", text: "International projects", icon: "/img/about/years/1.svg", alt: "International projects" },
        { year: "2021", text: "Awards", icon: "/img/about/years/1.svg", alt: "Awards" },
        { year: "2022", text: "New direction", icon: "/img/about/years/1.svg", alt: "New direction" },
        
    ];
    const main_grid = document.querySelectorAll(".about-years__grid"),
        w = document.querySelector(".about-years__effect-wrapper"),
        g = document.querySelector(".about-years__grid");

    number = 7;
    let r = 0,
        rIn = 46.8,
        h = 46.8,
        rot = 0,
        col = YEARS_DATA.length,
        spead = innerWidth < 801 ? 50 : 150,
        k = 0,
        j = 0,
        prevJ = j,
        lastStep = 0;

    let down = false,
        x0 = 0;

    let autoIndex = 0,
        autoTimer = null,
        autoStopped = false;

    const stopAuto = () => {
        if (autoStopped) return;
        autoStopped = true;
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    };

    const startAuto = () => {
        if (autoStopped || autoTimer) return;

        autoTimer = setInterval(() => {
            if (autoIndex >= col - 1) {
                stopAuto();
                return;
            }
            autoIndex += 1;
            goToIndex(autoIndex);
        }, 3500);
    };

    const fillBase = (baseEl, data) => {
        const txt = baseEl.querySelector(".about-years__base-text");
        const year = baseEl.querySelector(".about-years__base-year");
        const img = baseEl.querySelector(".about-years__base-icon img");

        if (txt) txt.textContent = data?.text ?? "";
        if (year) year.textContent = data?.year ?? "";
        if (img) {
            img.src = data?.icon ?? "";
            img.alt = data?.alt ?? "";
        }
    };

    const baseTemplate = document.querySelector(".about-years__item--base");
    let baseIndex = 0;

    const years_dob = rot => {
        main_grid.forEach(grid => {
            const layout = document.createElement("div");
            layout.className = "about-years__layout-dob";
            grid.append(layout);

            for (let i = 0; i <= number * 10; i++) {
                const item = document.createElement("div"),
                    itemIn = document.createElement("div");

                item.className = "about-years__item";
                itemIn.className = "about-years__itemIn";

                item.append(itemIn);
                layout.append(item);

                gsap.set(item, { rotate: r });
                itemIn.dataset.rin = rIn;
                gsap.set(itemIn, { rotate: rIn + rot });

                r = r + 0.6;
                rIn = rIn - 0.6;
            }
        });
    };

    const create_years = rot => {
        main_grid.forEach(grid => {
            const layout = document.createElement("div");
            layout.className = "about-years__layout-main";
            grid.append(layout);

            for (let i = 0; i <= number * 2; i++) {
                if (i !== number) {
                    const item = document.createElement("div"),
                        itemIn = document.createElement("div");

                    item.className = "about-years__item";
                    itemIn.className = "about-years__itemIn";

                    item.append(itemIn);
                    layout.append(item);

                    gsap.set(item, { rotate: r });
                    itemIn.dataset.rin = rIn;
                    gsap.set(itemIn, { rotate: rIn + rot });
                } else {
                    const itemBase = baseTemplate.cloneNode(true);

                    const data = YEARS_DATA[baseIndex % YEARS_DATA.length];
                    fillBase(itemBase, data);
                    baseIndex++;

                    layout.appendChild(itemBase);

                    gsap.set(itemBase, { rotate: r });

                    const content = itemBase.querySelector(".about-years__base-content");
                    if (content) content.dataset.rin = rIn;
                    gsap.set(content, { rotate: rIn });
                }

                r = r + 0.6;
                rIn = rIn - 0.6;
            }
        });
    };

    years_dob(rot);
    for (let i = 0; i < col; i++) create_years(rot);
    years_dob(rot);

    baseTemplate.remove();

    const op = gsap.utils.toArray(".about-years__item--base");
    gsap.set(op[0], { height: 120, width: 2 });

    op.forEach((el, i) => {
        el.dataset.index = i;
    });

    const setRotation = () => {
        rot = gsap.utils.clamp(-col * 9 + 9, 0, j * 9);

        gsap.set(g, { rotate: gsap.utils.clamp(-col * 9 - h, -h, j * 9 - h) });

        gsap.utils.toArray(".about-years__itemIn").forEach(el => {
            gsap.set(el, { rotate: (+el.dataset.rin || 0) - rot });
        });

        gsap.utils.toArray(".about-years__base-content").forEach(el => {
            gsap.set(el, { rotate: (+el.dataset.rin || 0) - rot });
        });
    };

    const goToIndex = index => {
        index = gsap.utils.clamp(0, col - 1, index);

        autoIndex = index;

        j = -index;
        prevJ = j;

        setRotation();
        years_active(index);
    };

    w.addEventListener("pointerdown", e => {
        stopAuto();

        const base = e.target.closest(".about-years__item--base");
        if (base) {
            goToIndex(+base.dataset.index || 0);
            return;
        }

        down = true;
        x0 = e.clientX;
        lastStep = 0;
        w.setPointerCapture(e.pointerId);
        e.preventDefault();
    });

    w.addEventListener("pointermove", e => {
        if (!down) return;

        stopAuto();

        const dx = e.clientX - x0;
        const step = Math.floor(dx / spead);

        if (step !== lastStep) {
            j += step - lastStep;
            lastStep = step;

            j = Math.max(-col, Math.min(0, j));

            if (j !== prevJ) {
                goToIndex(gsap.utils.clamp(0, col - 1, -j));
            }
        }

        e.preventDefault();
    });

    w.addEventListener("pointerup", e => {
        down = false;
        w.releasePointerCapture(e.pointerId);
    });

    const years_active = index => {
        const tl = gsap.timeline({ defaults: { duration: 0 } });

        tl.to(op[index], { height: 120, width: 2 }, 0)
            .to(op[index].querySelector(".about-years__base-content"), { backgroundColor: "rgb(0, 153, 255)" }, 0)
            .to(op[index].querySelector(".about-years__base-year"), { opacity: 1 }, 0)
            .to(op[index].querySelector(".about-years__base-text"), { opacity: 1 }, 0)
            .to(op[index].querySelector(".about-years__base-icon"), { opacity: 1, transform: "translateX(-50%) translateY(calc(100% + 20px)) scale(1.5)" }, 0);

        if (k !== index) {
            tl.to(op[k], { height: 64, width: 1.5 }, 0)
                .to(op[k].querySelector(".about-years__base-content"), { backgroundColor: "rgb(161, 161, 161)" }, 0)
                .to(op[k].querySelector(".about-years__base-year"), { opacity: 0.5 }, 0)
                .to(op[k].querySelector(".about-years__base-text"), { opacity: 0 }, 0)
                .to(op[k].querySelector(".about-years__base-icon"), { opacity: 0.5, transform: "translateX(-50%) translateY(calc(100% + 4px)) scale(1)" }, 0);
        }

        k = index;
    };

    setRotation();
    startAuto();
    await new Promise(r => requestAnimationFrame(r));





    //work-together----------------------------------
    Copy(".work-together__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
    Copy(".work-together__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
    BlockReveal(".work-together__button", {start:"top 80%",y:30,opacity:0,delay:.1});
    

}