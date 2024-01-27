(function () {
    const emblaNode = document.querySelector(".z_hero--slider");
    const dotsNode = document.querySelector(".z_hero--slider--dots");
    const options = {
        loop: false,
    };

    const embla = EmblaCarousel(emblaNode, options);
    // addDotBtnsAndClickHandlers(embla);
    const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
        let dotNodes = [];

        const addDotBtnsWithClickHandlers = () => {
            dotsNode.innerHTML = emblaApi
                .scrollSnapList()
                .map(
                    () =>
                        '<button class="z_hero--slider--dot" type="button"></button>'
                )
                .join("");

            dotNodes = Array.from(
                dotsNode.querySelectorAll(".z_hero--slider--dot")
            );

            dotNodes.forEach((dotNode, index) => {
                dotNode.addEventListener(
                    "click",
                    () => emblaApi.scrollTo(index),
                    false
                );
            });
        };

        const toggleDotBtnsActive = () => {
            const previous = emblaApi.previousScrollSnap();
            const selected = emblaApi.selectedScrollSnap();
            dotNodes[previous].classList.remove("z_hero--slider--dot--selected");
            dotNodes[selected].classList.add("z_hero--slider--dot--selected");
        };

        emblaApi
            .on("init", addDotBtnsWithClickHandlers)
            .on("reInit", addDotBtnsWithClickHandlers)
            .on("init", toggleDotBtnsActive)
            .on("reInit", toggleDotBtnsActive)
            .on("select", toggleDotBtnsActive);

        return () => {
            dotsNode.innerHTML = "";
        };
    };

    addDotBtnsAndClickHandlers(embla, dotsNode);
    embla.on("destroy", addDotBtnsAndClickHandlers(embla, dotsNode));
    embla.slideNodes(); // Access API
})();


