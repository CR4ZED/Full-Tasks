const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const imgs = document.querySelector("#imgs").children;
const indicators = document.querySelector(".indicators").children;

function nextImg() {
  let [currActiveImg, currActiveSpan] = getCurrentObjects();

  if (currActiveImg === imgs[imgs.length - 1]) {
    imgs[0].classList.add("active");
    indicators[0].classList.add("active");
  } else {
    currActiveImg.nextElementSibling.classList.add("active");
    currActiveSpan.nextElementSibling.classList.add("active");
  }
}

function prevImg() {
  let [currActiveImg, currActiveSpan] = getCurrentObjects();

  if (currActiveImg === imgs[0]) {
    imgs[imgs.length - 1].classList.add("active");
    indicators[indicators.length - 1].classList.add("active");
  } else {
    currActiveImg.previousElementSibling.classList.add("active");
    currActiveSpan.previousElementSibling.classList.add("active");
  }
}

function getCurrentObjects() {
  let currActiveImg = document.querySelector("img.active");
  let currActiveSpan = document.querySelector("span.active");

  currActiveImg.classList.remove("active");
  currActiveSpan.classList.remove("active");
  return [currActiveImg, currActiveSpan];
}

setInterval(nextImg, 5000);

next.addEventListener("click", nextImg);
prev.addEventListener("click", prevImg);
