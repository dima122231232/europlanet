window.initAnimations = () => {
    afterLoader(() => {
        gsap.set(".blog",{opacity:1})
        Copy(".blog__title", {opacity:0,delay:.1});
        Copy(".blog__label", {opacity:0});
        BlockReveal(".blog__featured",{opacity:0,y:100,delay:.05,scroll:false});
        BlockReveal(".blog__list",{opacity:0,y:100,delay:.15,scroll:false});
    });

    //work-together----------------------------------
    {
        Copy(".work-together__title", {start:"top 80%",y:60,duration:1.35,opacity:0});
        Copy(".work-together__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 80%"});
        BlockReveal(".work-together__button", {start:"top 80%",y:30,opacity:0,delay:.1});
    }
}