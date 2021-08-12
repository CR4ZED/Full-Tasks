const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const slides = document.getElementById("imgs");
const imgs = document.querySelector("#imgs").children;
const indicators = document.querySelector(".indicators");
const spans = document.querySelector(".indicators").children;
const add = document.getElementById("add");
const addNew = document.getElementById("addNew");
const modal = document.getElementById("modal");
const imgUrl = document.getElementById("imgUrl");

function nextImg() {
  let [currActiveImg, currActiveSpan] = getCurrentObjects();

  if (currActiveImg === imgs[imgs.length - 1]) {
    imgs[0].classList.add("active");
    spans[0].classList.add("active");
  } else {
    currActiveImg.nextElementSibling.classList.add("active");
    currActiveSpan.nextElementSibling.classList.add("active");
  }
}

function prevImg() {
  let [currActiveImg, currActiveSpan] = getCurrentObjects();

  if (currActiveImg === imgs[0]) {
    imgs[imgs.length - 1].classList.add("active");
    spans[indicators.length - 1].classList.add("active");
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

function addNewImg(e) {
  e.preventDefault();
  modal.classList.add("show");
  const newImg = imgUrl.value;
  const img = document.createElement("img");
  img.setAttribute("src", newImg);
  const span = document.createElement("span");

  slides.appendChild(img);
  indicators.appendChild(span);
  imgUrl.value = "";
  modal.classList.remove("show");
}

function hideModal(e) {
  if (e.target.id === "modal") {
    modal.classList.remove("show");
  }
}

function showModal() {
  modal.classList.add("show");
}

setInterval(nextImg, 5000);

next.addEventListener("click", nextImg);
prev.addEventListener("click", prevImg);
add.addEventListener("click", showModal);
addNew.addEventListener("click", addNewImg);
modal.addEventListener("click", hideModal);
