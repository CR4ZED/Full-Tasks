const { expect } = require("@jest/globals");
const { resolver, generatePromise } = require("./app");

let promise1 = generatePromise("success p1", 6000);
let promise2 = generatePromise("success p2", 2000);
let promise3 = generatePromise("success p3", 5000);
let promise4 = generatePromise("success p4", 20000);
let promise5 = generatePromise("success p5", 6000);
let promise6 = generatePromise("success p6", 1000);
let promise7 = generatePromise("success p7", 500);
let promise8 = generatePromise("success p8", 6000);
let promise9 = generatePromise("success p9", 6000);

let promises = [
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
  promise6,
  promise7,
  promise8,
  promise9,
];

test("Promises which resolve/reject in 5s", () => {
  resolver(promises).then((data) => {
    expect(data.length()).toBe(4);
  });
});
