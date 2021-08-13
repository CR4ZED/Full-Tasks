const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

function debounce(func, delay, args) {
  let id;
  return () => {
    clearTimeout(id);
    id = setTimeout(func, delay, args);
  };
}

function onClick() {
  console.log("clicked");
}

function validate(input) {
  if (input.value === "ankush") {
    input.classList.remove("invalid");
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
  }
}

let debouncedOnClick = debounce(onClick, 2000);
let debouncedValidate = debounce(validate, 500, name2);

btn1.addEventListener("click", onClick);
btn2.addEventListener("click", debouncedOnClick);

name1.addEventListener("keyup", () => validate(name1));
name2.addEventListener("keyup", debouncedValidate);
