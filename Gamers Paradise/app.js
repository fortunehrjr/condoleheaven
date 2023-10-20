const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

// leave animations
const LeaveAnimation = (current, done) => {
  const console = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const decor = current.querySelectorAll(".decor");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    tlLeave.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: -50 }, "<"),
    tlLeave.fromTo(
      console,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 100, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(
      decor,
      { y: 0, opacity: 0.1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};
// enter animations
const enterAnimation = (current, done, gradient) => {
  const console = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const decor = current.querySelectorAll(".decor");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    tlLeave.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
    tlLeave.fromTo(text, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "<"),
    tlLeave.to("body", { background: gradient }, "<"),
    tlLeave.fromTo(
      console,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(
      decor,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 0.1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

// barba animations
barba.init({
  preventRunning: true,
  transitions: [
    //showcase transitions
    {
      name: "base-transition",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },

      leave(data) {
        const done = this.async();
        let current = data.current.container;
        LeaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    // product page transition
    {
      name: "product-transition",
      sync: true,
      from: { namespace: ["ps5", "product"] },
      to: { namespace: ["product", "ps5"] },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done);
      },
    },
  ],
});

// product animation

const productEnterAnimation = (next, done) => {
  tlEnter.fromTo(next, { opacity: 0, y: "100%" }, { opacity: 1, y: "0%" });
  tlEnter.fromTo(
    ".card",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.15, onComplete: done }
  );
};
const productLeaveAnimation = (current, done) => {
  tlLeave.fromTo(current, { y: "0%" }, { y: "100%", onComplete: done });
};

// background change
function getGradient(name) {
  switch (name) {
    case "ps5":
      return "linear-gradient(90deg, #55809c, #575a89, #1469aa)";
    case "xbox":
      return "linear-gradient(90deg, #d16ba5, #e07498, #e9818c, #ec8f85, #ec9f82, #f09f81, #f59e7f, #f99e7e, #ff8b84, #ff7894, #ff68ad, #fb5fcc)";
    case "nintendo":
      return "linear-gradient(90deg, #ee2add , #6f4fed, #1254eb)";
    case "vr":
      return "linear-gradient(-90deg, #439fea, #eca7b9, #f96690)";
  }
}

// nav animation

const burger = document.querySelector(".burger");
const lines = document.querySelectorAll(".line");

navOpen = document.querySelector(".nav-open");

burger.addEventListener("click", () => {
  if (!navOpen.classList.contains("active")) {
    // console.log(e.target);
    navOpen.classList.add("active");

    // lines.forEach((line) => {
    //   line.style.stroke = "black";
    // });
  } else {
    navOpen.classList.remove("active");

    // lines.forEach((line) => {
    //   line.style.stroke = "white";
    // });
  }
});

// function navToggle(e) {
//   if (!e.target.classList.contains("active")) {
//     console.log("added active");
//     e.target.classList.add("active");
//   } else {
//     console.log("removed active");
//     e.target.classList.remove("active");
//     gsap.to(".nav-open", 1, { clipPath: "circle(50px at 100% -10%)" });
//     document.body.classList.remove("hide");
//   }
// }
