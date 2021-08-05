//Selectors
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

//Event listeners
navbarToggler.addEventListener("click", navbarTogglerClick);

//Functions
function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach((elem) => elem.addEventListener("click", navbarLinkClick));

//Close navbar link in smaller screens once clicked
function navbarLinkClick(event) {
  smoothScroll(event);
  if (navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}

//Scroll spy
document.addEventListener("DOMContentLoaded", () => {
  (function scrollSpy() {
    const targets = document.querySelectorAll(".container"),
      options = {
        threshold: 0.5,
      };
    // check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      (() => {
        const inView = (target) => {
          const interSecObs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              const elem = entry.target;
              let currentNav = document.querySelector(
                `#main-navigation .nav-links li a[href='#${elem.id}']`
              );
              entry.isIntersecting
                ? currentNav.classList.add("active")
                : currentNav.classList.remove("active");
            });
          }, options);
          interSecObs.observe(target);
        };
        targets.forEach(inView);
      })();
    }
  })();
});

//Smooth Scrolling

// APPROACH #1 - window.scrollTo()

// function smoothScroll(event) {
//   event.preventDefault();
//   const targetId = event.currentTarget.getAttribute("href");
//   window.scrollTo({
//     top: targetId==="#" ? 0 : document.querySelector(targetId).offsetTop,
//     behavior: "smooth"
//   });
// }

// APPROACH #2 - element.scrollIntoView()

// function smoothScroll(event) {
//   event.preventDefault();
//   const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
//   document.querySelector(targetId).scrollIntoView({
//     behavior: "smooth",
//     block: "start"
//   });
// }

// APPROACH #3 - window.requestAnimationFrame()

function smoothScroll(event) {
  event.preventDefault();
  const targetId =
    event.currentTarget.getAttribute("href") === "#"
      ? "header"
      : event.currentTarget.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    // window.scrollTo(0, distance*(progress/duration) + startPosition);
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

// Easing Functions
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}
