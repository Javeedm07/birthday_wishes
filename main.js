const animateCSS = (element, animation, delay, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(`.${element}`);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      if (delay !== 0) {
        setTimeout(() => {
          node.classList.add("invisible");
        }, delay * 1000);
      }
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

animateCSS("name", "zoomIn", 4);
animateCSS("two", "zoomIn", 2);
animateCSS("three", "rotateIn", 6);
setTimeout(() => {
  document
    .querySelector(".one")
    .classList.add("animate__animated", "animate__zoomOut");
}, 6 * 800);
animateCSS("wish-hbd", "fadeInUpBig", 0);
animateCSS("wishText", "fadeIn", 0);

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  const r = random(255);
  const g = random(255);
  const b = random(255);
  const mt = random(200);
  const ml = random(50);
  const dur = random(5) + 5;
  return `
    background-color: rgba(${r},${g},${b},0.7);
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite;
  `;
}

function createBalloons(num) {
  const balloonContainer = document.getElementById("balloon-container");
  for (let i = num; i > 0; i--) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

window.onload = function () {
  createBalloons(50);
};

const fetchData = () => {
  fetch("input.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((key) => {
        if (data[key] !== "") {
          document.getElementById(key).innerText = data[key];
        }
      });
    });
};

const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.innerText = "Pause Music";
  } else {
    music.pause();
    musicToggle.innerText = "Play Music";
  }
});

const slides = document.querySelectorAll(".slide-image");
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].style.display = "none";

  currentIndex = (currentIndex + 1) % slides.length;

  slides[currentIndex].style.display = "block";
}

slides[currentIndex].style.display = "block";

setInterval(showNextSlide, 3000);

fetchData();
