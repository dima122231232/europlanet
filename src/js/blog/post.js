gsap.to(".blog-post__hero-image",{duration:1.35,scale:1,delay:1.35})
gsap.fromTo(".blog-post__hero-wrapper",{y:0},{y:100,ease:"none",scrollTrigger:{trigger:".blog-post__hero-wrapper",start:"top bottom",end:"bottom top",scrub:0}});

window.initAnimations = () => {
    afterLoader(() => {
        gsap.set(".blog-post__header",{opacity:1})

        Copy(".blog-post__title",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 100%"});
        Copy(".blog-post__subtitle",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 100%"});
        gsap.to(".blog-post__divider",{scaleX:1,duration:1,delay:.5,ease:"power1.inOut"})
        BlockReveal(".blog-post__meta", {duration:1.35,opacity:0,slide:true,scroll:false});
    });
    Copy(".post-more__title", {start:"top 80%",opacity:0,duration:1.35});
    BlockReveal(".post__list",{opacity:0,y:100,step:.1,start:"top 80%"});
    //work-together----------------------------------
    {
        Copy(".work-together__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
        Copy(".work-together__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
        BlockReveal(".work-together__button", {start:"top 80%",y:30,opacity:0,delay:.1});
    }
}