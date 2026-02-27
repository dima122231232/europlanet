window.initAnimations = () => {

    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("works-anim", ".8, .2, .3, 1");
    //1----------------------------------
    afterLoader(() => {
    gsap.set(".works__container", {opacity:1});
        Copy(".works__title", {opacity:0});
        BlockReveal(".works__link",{opacity:0,y:30,scroll:false});
    });
    document.querySelectorAll(".works__link").forEach(el => {
        const image = el.querySelector(".works__image-wrap");
        const in_image = el.querySelector(".works__image");

        el.addEventListener("mouseenter", () => {gsap.to(image, {scale: .92,duration: .6,ease: "works-anim"});});
        el.addEventListener("mouseleave", () => {gsap.to(image, {scale: 1,duration: .6,ease: "works-anim"});});
        
        el.addEventListener("mouseenter", () => {gsap.to(in_image, {scale: 1.08,duration: .6,ease: "works-anim"});});
        el.addEventListener("mouseleave", () => {gsap.to(in_image, {scale: 1,duration: .6,ease: "works-anim"});});
    });

    //work-together----------------------------------
    Copy(".work-together__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
    Copy(".work-together__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
    BlockReveal(".work-together__button", {start:"top 80%",y:30,opacity:0,delay:.1});
    
}