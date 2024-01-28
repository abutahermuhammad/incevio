// AOS
if (AOS) {
  AOS.init({
    easing: "ease-out",
    useClassNames: false,
    easing: "ease-in-out",
    mirror: true,
  });
}

// Carousel Implementation
const slider = document.querySelector(".z_hero--slider");
const sliderDots = document.querySelector(".z_hero--slider--dots");
const options = {
  loop: false,
};

const embla = EmblaCarousel(slider, options);
// addDotBtnsAndClickHandlers(embla);
const addDotBtnsAndClickHandlers = (emblaApi, sliderDots) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    sliderDots.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="z_hero--slider--dot" type="button"></button>')
      .join("");

    dotNodes = Array.from(sliderDots.querySelectorAll(".z_hero--slider--dot"));

    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => emblaApi.scrollTo(index), false);
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
    sliderDots.innerHTML = "";
  };
};

addDotBtnsAndClickHandlers(embla, sliderDots);
embla.on("destroy", addDotBtnsAndClickHandlers(embla, sliderDots));
embla.slideNodes(); // Access API

// Accordion
var acc = document.querySelectorAll(".z_faq--accordion--item");

acc.forEach((item) => {
  //   Get title and body
  const title = item.querySelector(".z_faq--accordion--header");
  const body = item.querySelector(".z_faq--accordion--body");

  //   Add event
  title.addEventListener("click", () => {
    //   Toggle class
    body.classList.toggle("active");
    //   Change icon
    const icon = title.querySelector(".z_faq--accordion--icon");
    if (body.classList.contains("active")) {
      icon.src = "./assets/img/arrow-up.svg";
    } else {
      icon.src = "./assets/img/arrow.svg";
    }
  });
});
