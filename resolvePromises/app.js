function generatePromise(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`success ${data}`), delay);
  });
}

async function resolvePromises(promises) {
  let result = [];
  for (const promise of promises) {
    try {
      let data = await Promise.race([
        promise,
        new Promise((resolve, reject) => {
          setTimeout(() => reject(""), 5000);
        }),
      ]);
      result.push(data);
    } catch (err) {
      console.log(err);
    }
  }
  return result;
}

let promise1 = generatePromise("p1", 2000);
let promise2 = generatePromise("p2", 3000);
let promise3 = generatePromise("p3", 7000);
let promise4 = generatePromise("p4", 1000);

resolvePromises([promise1, promise2, promise3, promise4]).then((data) => {
  console.log(data);
});
