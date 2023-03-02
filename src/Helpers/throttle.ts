export function throttle(func: Function, delay: number): Function {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  let lastArgs: any[];
  let lastThis: any;

  return function (this: any, ...args: any[]) {
    const context = this;

    // Save the last arguments and `this` context
    lastArgs = args;
    lastThis = context;

    // If there's no timer set, call the function immediately
    if (!timeoutId) {
      func.apply(context, args);
    }

    // If there's a timer set, ignore subsequent calls until the delay has elapsed
    if (timeoutId) {
      return;
    }

    // Set the timer to call the function again after the delay has elapsed
    timeoutId = setTimeout(() => {
      func.apply(lastThis, lastArgs);
      timeoutId = null;
    }, delay);
  };
}
