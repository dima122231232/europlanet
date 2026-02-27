window.initAnimations = () => {
    afterLoader(() => {
        gsap.set(".error-404",{opacity:1})
        Copy(".error-404__title", {opacity:0});
        Copy(".error-404__label", {opacity:0});
        Copy(".error-404__text",{type:"lines",step:.25,y:30,opacity:0,duration:1.35,start:"top 100%"});
        gsap.to(".error-404__image img",{opacity:1,scale:1,duration:2})
    })
}