const { expect } = require("@jest/globals");
const { resolve } = require("jest-config/build/utils");
const { resolver, generatePromise } = require("./app");

let promise1 = generatePromise("success p1", 6000);
let promise2 = generatePromise("success p2", 2000);
let promise3 = generatePromise("success p3", 5000);

let promises = [promise1, promise2, promise3];

test("should return ['success p2']", () => {
  resolver(promises)
    .then((data) => {
      expect(data).toBe(["success p2"]);
    })
    .catch((err) => {});
});

let promise4 = generatePromise("success p4", 20000);
let promise5 = generatePromise("success p5", 1500);
let promise6 = generatePromise("success p6", 100);

test('should return ["success p5","success p6"]', () => {
  resolver([promise4, promise5, promise6])
    .then((data) => {
      expect(data).toBe(["success p5", "success p6"]);
    })
    .catch((err) => {});
});
