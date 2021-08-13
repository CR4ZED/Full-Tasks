function generatePromise(data, delay) {
  return new Promise((resolve) => setTimeout(resolve, delay, data));
}

function checkTimer(promise, delay) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => reject("rejected"), 5000 - delay)
    ),
  ]);
}

async function resolver(promises) {
  let res = [];
  for (let promise of promises) {
    let now = performance.now();
    setTimeout(() => {
      checkTimer(promise, (now - start) * 1000)
        .then((data) => {
          console.log(data);
          res.push(data);
        })
        .catch((err) => console.log("failed"));
    });
  }
  // return res;
}
let start = performance.now();
// console.log(start);
let promise1 = generatePromise("success p1", 5000);
let promise2 = generatePromise("success p2", 2000);
let promise3 = generatePromise("success p3", 5000);
let promise4 = generatePromise("success p4", 3000);

resolver([promise1, promise2, promise3, promise4]).then((data) => {
  console.log(data);
}); //[success p1,success p2]
