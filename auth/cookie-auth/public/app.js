function fetchTasks() {
  fetch("http://localhost:3000/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

window.addEventListener("load", fetchTasks);
console.log("loaded");
