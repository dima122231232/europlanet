(() => {
    const reduce = matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ready = (fn) => {
        let tries = 0;
        const tick = () => {
            if (document.body && window.gsap) return fn();
            if (++tries > 240) return;
            requestAnimationFrame(tick);
        };
        tick();
    };

    ready(() => {
        const gsap = window.gsap;
        const body = document.querySelector(".fake-body") || document.body;
        const loader = document.querySelector(".loader");

        let transitioning = false;

        const resetBody = () => {
            gsap.killTweensOf(body);
            gsap.set(body, { clearProps: "opacity,transform" });
        };

        const hidePageLoader = () => {
            if (!loader) return;
            gsap.killTweensOf(loader);
            gsap.set(loader, { yPercent: -100, overwrite: true });
        };

        addEventListener("pageshow", (e) => {
            resetBody();

            if (e && e.persisted && !transitioning) hidePageLoader();
        }, { passive: true });

        const isSpecialClick = (e) =>
            e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

        const isIgnorableLink = (a) =>
            a.hasAttribute("download") ||
            a.target === "_blank" ||
            a.getAttribute("rel") === "external" ||
            /^(mailto:|tel:|sms:|javascript:)/i.test(a.getAttribute("href") || "");

        const norm = (u) => (u.origin + u.pathname).replace(/\/+$/, "");
        const parseUrl = (href) => (href ? new URL(href, location.href) : new URL(location.href));

        const isSamePage = (href) => {
            try {
                return norm(parseUrl(href)) === norm(new URL(location.href));
            } catch {
                return false;
            }
        };

        const isInternal = (href) => {
            try {
                return parseUrl(href).origin === location.origin;
            } catch {
                return false;
            }
        };

        const leave = (done) => {
            if (transitioning) return;
            transitioning = true;

            if (reduce) return done();
            if (!loader) return done();

            gsap.killTweensOf(body);
            gsap.killTweensOf(loader);

            gsap.timeline({
                defaults: { overwrite: "auto" },
                onComplete: done
            })
            .set(loader, { yPercent: 100 })
            .to(body, { opacity: 0, y: -200, duration: 0.4, ease: "power2.in" }, 0)
            .to(loader, { yPercent: 0, duration: 0.4, ease: "power2.in" }, 0);
        };

        document.addEventListener("click", (e) => {
            const a = e.target.closest("a[href]");
            if (!a) return;

            const href = a.getAttribute("href") || "";

            if (href === "#" || href === "" || isSamePage(href)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            }

            if (isSpecialClick(e) || isIgnorableLink(a) || !isInternal(href)) return;

            e.preventDefault();
            const url = parseUrl(href).href;

            let jumped = false;
            const go = () => (jumped ? 0 : ((jumped = true), (location.href = url)));

            leave(go);
            setTimeout(go, 1200);
        }, true);
    });
})();