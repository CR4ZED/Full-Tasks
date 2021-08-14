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

function resolver(promises) {
  let res = [];
  for (let promise of promises) {
    checkTimer(promise)
      .then((data) => {
        console.log(data);
        res.push(data);
      })
      .catch((err) => {
        console.log(`err: ${err}`);
      });
  }
  return res;
}

let promise1 = generatePromise("success p1", 6000);
let promise2 = generatePromise("success p2", 2000);
let promise3 = generatePromise("success p3", 5000);
let promise4 = generatePromise("success p4", 20000);

resolver([promise1, promise2, promise3, promise4]);
// });
// let data = "";
// promise4.then((res) => {
//   data = res;
//   console.log(data)
// });
// setTimeout(() => {
//   if (!data) {
//     console.log("timeout");
//     throw new Error('timeout')
//   }
// }, 5000);
