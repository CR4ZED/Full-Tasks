function generatePromise(data, delay) {
  return new Promise((resolve) => setTimeout(resolve, delay, data));
}

function checkTimer(promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //throw error if promise takes more than 5s to resolve/reject
      reject("TIMEOUT");
    }, 5000);
    promise
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function resolver(promises) {
  let res = [];
  for (let promise of promises) {
    res.push(checkTimer(promise));
  }

  return (await Promise.allSettled(res))
    .filter((promise) => promise.status === "fulfilled")
    .map((promise) => promise.value);
}

let promise1 = generatePromise("success p1", 6000);
let promise2 = generatePromise("success p2", 2000);
let promise3 = generatePromise("success p3", 5000);
let promise4 = generatePromise("success p4", 20000);
let promise5 = generatePromise("success p5", 6000);
let promise6 = generatePromise("success p6", 1000);
let promise7 = generatePromise("success p7", 500);
let promise8 = generatePromise("success p8", 6000);
let promise9 = generatePromise("success p9", 6000);

resolver([
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
  promise6,
  promise7,
  promise8,
  promise9,
])
  .then((res) => {
    // console.log(res);
    return res;
  })
  .catch((err) => {
    console.log(err);
  });
console.log("");

module.exports = { resolver, generatePromise };
