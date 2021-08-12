function generatePromise(data) {
  return new Promise((resolve, reject) => {
    resolve(`success ${data}`);
    // setTimeout(() => resolve(`success ${data}`), delay);
  });
}

async function resolvePromises(promises) {
  let result = [];
  for (const promise of promises) {
    try {
      let data = await Promise.race([
        promise.then(
          (data) =>
            new Promise((resolve, reject) =>
              setTimeout(() => resolve(data), Math.floor(Math.random() * 10000))
            )
        ),
        new Promise((resolve, reject) => {
          setTimeout(() => reject("rejected"), 5000);
        }),
      ]);
      console.log(data);
      result.push(data);
    } catch (err) {
      console.log(err);
    }
  }
  return result;
}

let promise1 = generatePromise("p1");
let promise2 = generatePromise("p2");
let promise3 = generatePromise("p3");
let promise4 = generatePromise("p4");

resolvePromises([promise1, promise2, promise3, promise4]).then((data) => {
  console.log(data);
});
