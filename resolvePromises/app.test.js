const { resolver, generatePromise } = require("./app");

//case1
test("should return ['success p2']", () => {
  let promise1 = generatePromise("success p1", 6000);
  let promise2 = generatePromise("success p2", 2000);
  let promise3 = generatePromise("success p3", 5000);

  let promises = [promise1, promise2, promise3];
  expect(resolver(promises)).resolves.toEqual(["success p2", "success p3"]);
}, 6000);

//case2
test('should return ["success p5","success p6"]', () => {
  let promise4 = generatePromise("success p4", 20000);
  let promise5 = generatePromise("success p5", 1500);
  let promise6 = generatePromise("success p6", 100);

  expect(resolver([promise4, promise5, promise6])).resolves.toEqual([
    "success p5",
    "success p6",
  ]);
}, 6000);

//case 3
test("should return []", () => {
  let promise7 = generatePromise("success p7", 10000);
  let promise8 = generatePromise("success p8", 14000);
  let promise9 = generatePromise("success p9", 6000);
  expect(resolver([promise7, promise8, promise9])).resolves.toEqual([]);
}, 6000);
