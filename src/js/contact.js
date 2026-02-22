window.initAnimations = () => {
    // 1------------------------------
    gsap.set(".contact__container", {opacity:1});
    Copy(".contact__title", {opacity:0});
    Copy(".contact__alternative", {opacity:0,delay:.2});
    Copy(".contact__info-title", {opacity:0,delay:.3});
    Copy(".contact__intro",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 100%"});
    BlockReveal(".contact__form", {y:50,duration:1.35,opacity:0,scroll:false});
    BlockReveal(".contact__info-grid", {opacity:0,delay:.3,scroll:false});

    gsap.to(".contact__divider",{scaleX:1,duration:1,delay:.5,ease:"power1.inOut"})
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
}