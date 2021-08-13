const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

function debounce(func, delay) {
  let id;
  return () => {
    clearTimeout(id);
    id = setTimeout(func, delay);
  };
}

function onClick() {
  console.log("clicked");
}

let debouncedOnClick = debounce(onClick, 2000);

btn1.addEventListener("click", onClick);
btn2.addEventListener("click", debouncedOnClick);
