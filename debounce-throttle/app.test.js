const { throttle, debounce } = require("./app");

let debounced = debounce(() => "debounce", 1000);

test("should return debounce after 1s", () => {
  expect(debounced()).toBeUndefined();
  expect(debounced()).toBeUndefined();
  expect(debounced()).toBeUndefined();
  //after waiting for 1s the debounced data should be returned
}, 5000);

let throttled = throttle(() => "throttle", 1000);

test("should return throttle and then undefined for all", () => {
  expect(throttled()).toBe("throttle");
  expect(throttled()).toBeUndefined();
  expect(throttled()).toBeUndefined();
  expect(throttled()).toBeUndefined();
  expect(throttled()).toBeUndefined();
  //now after 1s it should return throttle
  setTimeout(() => {
    expect(throttled()).toBe("throttle");
  }, 1000);
});
