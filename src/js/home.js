(() => {

    CustomEase.create("services-anim", ".7, .2, .3, 1");
    const mm = gsap.matchMedia();


// services------------------------------
    mm.add({
        desktop: "(min-width: 1201px)",
        mobile:  "(max-width: 1200px)"
    }, (context) => {

        const { desktop, mobile } = context.conditions;

        document.querySelectorAll('.services__item-wrapper').forEach(item => {

            const $ = gsap.utils.selector(item);
            const h = item.querySelector('.services__name').offsetHeight;

            const tl = gsap.timeline({
                paused: true,
                defaults: { duration: .6, ease: "services-anim", overwrite: "auto" }
            });

            tl.to(item, { backgroundColor: "#181818" }, 0)
                .to($(".services__content"), { y: -h }, 0)
                .fromTo($(".services__item-body"), { height: h }, { height: "var(--services-animation-adaptiv)" }, 0)
                .to($(".services__details"), { opacity: 1 }, 0)
                .to($(".services__name-adaptiv"), { opacity: 0 }, 0)
                .to($(".services__index"), { fontSize: 80 }, 0)
                .to($(".services__media"), { opacity: 1 }, 0)
                .to($(".services__button-line--twise"), { opacity: 0 }, 0)
                .to($(".services__button-p-m"), { rotate: 360 }, 0);
                if (mobile) {
                        tl.fromTo($(".services__image"),{scale: .4, y:-300},{ scale: 1, y:0 }, 0);
                    }
            
            if (desktop) {
                item.addEventListener("mouseenter", () => tl.play());
                item.addEventListener("mouseleave", () => tl.reverse());
            }
            if (mobile) {
                item.addEventListener("click", () =>
                    tl.reversed() ? tl.play() : tl.reverse()
                );
            }

        });

    });


// process------------------------------
if (window.innerWidth >= 1201) {
    let process_w = document.querySelector('.process').offsetWidth;

    ScrollTrigger.create({
        trigger:".process",
        start:"top top",
        end: "+=1000vh",
        scrub:1,
        pin:true,
        onUpdate: (self) => {
            gsap.to(".process", {x:`${-(process_w - vw) * self.progress}px`,duration:0,ease:"power3.out"})
        }
    })
        window.addEventListener("resize", () => {
        vw = ScrollTrigger.viewportWidth;
        process_w = document.querySelector('.process').offsetWidth;
        ScrollTrigger.refresh();
    });
}

    
})();

