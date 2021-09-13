// const btn1 = document.getElementById("btn1");
// const btn2 = document.getElementById("btn2");

// const name1 = document.getElementById("name1");
// const name2 = document.getElementById("name2");

// const btn3 = document.getElementById("btn3");
// const btn4 = document.getElementById("btn4");

function debounce(func, delay, args) {
  let id;
  return () => {
    clearTimeout(id);
    id = setTimeout(func, delay, args);
  };
}

function throttle(func, delay) {
  let id;
  return () => {
    if (id) return;
    id = setTimeout(() => {
      id = undefined;
    }, delay);
    return func();
  };
}

// function onClick() {
//   console.log("clicked");
// }

// function validate(input) {
//   let pattern = /^[a-z]+$/;
//   if (pattern.test(input.value)) {
//     input.classList.remove("invalid");
//     input.classList.add("valid");
//   } else {
//     input.classList.remove("valid");
//     input.classList.add("invalid");
//   }
// }

// function normalClick() {
//   console.log("normal click");
// }

// let debouncedOnClick = debounce(onClick, 2000);
// let debouncedValidate = debounce(validate, 500, name2);

// let throttleClick = throttle(normalClick, 2000);

// btn1.addEventListener("click", onClick);
// btn2.addEventListener("click", debouncedOnClick);

// name1.addEventListener("keyup", () => validate(name1));
// name2.addEventListener("keyup", debouncedValidate);

// btn3.addEventListener("click", normalClick);
// btn4.addEventListener("click", throttleClick);

module.exports = { debounce, throttle };
