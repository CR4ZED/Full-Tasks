const { throttle, debounce } = require("./app");

let callback = jest.fn();
let debounced = debounce(callback, 1000);

test("should return debounce after 1s", () => {
  //after waiting for 1s the debounced data should be returned
  jest.useFakeTimers();
  debounced();
  debounced();
  debounced();
  debounced();
  jest.runAllTimers();
  expect(callback).toHaveBeenCalledTimes(1);
}, 5000);

let throttled = throttle(() => "throttle", 1000);

test("should return throttle and then undefined for all", () => {
  expect(throttled()).toBe("throttle");
  expect(throttled()).toBeUndefined();
  expect(throttled()).toBeUndefined();
  expect(throttled()).toBeUndefined();
  expect(throttled()).toBeUndefined();
  //now after 1s it should return throttle
  jest.useFakeTimers();
  setTimeout(() => {
    expect(throttled()).toBe("throttle");
  }, 1000);
  jest.runAllTimers();
});
