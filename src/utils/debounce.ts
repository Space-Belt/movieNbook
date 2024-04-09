export const debounce = (callback: any, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
