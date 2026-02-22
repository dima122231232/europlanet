window.initAnimations = () => {

    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("about-anim","0.77,0,0.175,1");

    // 1------------------------------
    gsap.fromTo(".about-hero",{y:0,scale:1,opacity:1},{y:-100,scale:.9,opacity:0,ease:"none",scrollTrigger:{trigger:".about-hero",start:"top top",end:"+=100%",scrub:0}});
    gsap.set(".about-hero__title, .about-hero__description", {opacity:1});
    Copy(".about-hero__title", {opacity:0});
    Copy(".about-hero__description",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 100%"});
    
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
    
    //work-together----------------------------------
    Copy(".work-together__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
    Copy(".work-together__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
    BlockReveal(".work-together__button", {start:"top 80%",y:30,opacity:0,delay:.1});
    

}