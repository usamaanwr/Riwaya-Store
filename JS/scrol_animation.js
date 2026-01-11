const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

fadeElements.forEach((el) => observer.observe(el));
const counters = document.querySelectorAll(".count-up h2");

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 120;

        const updateCount = () => {
          if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target + (target >= 1000 ? "+" : "");
          }
        };

        updateCount();
        entry.target.parentElement.classList.add("show");
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));
const el = document.querySelector(".typing");
const words = JSON.parse(el.dataset.words);
let i = 0, j = 0, deleting = false;

function type() {
  const word = words[i];
  if (!deleting) {
    el.textContent = word.slice(0, ++j);
    if (j === word.length) setTimeout(() => deleting = true, 1200);
  } else {
    el.textContent = word.slice(0, --j);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 80 : 120);
}
type();
