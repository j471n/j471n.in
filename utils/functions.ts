/**
 * Locks the scroll of the document by adding a 'lock-scroll' class to the html element.
 * The 'lock-scroll' class should be defined in a global stylesheet and contain styles for disabling scrolling.
 */
export function lockScroll() {
  const root = document.getElementsByTagName("html")[0];
  root.classList.toggle("lock-scroll"); // class is define in the global.css
}

/**
 * Removes the scroll lock from the document by removing the 'lock-scroll' class from the html element.
 */
export function removeScrollLock() {
  const root = document.getElementsByTagName("html")[0];
  root.classList.remove("lock-scroll"); // class is define in the global.css
}

/**
 * Debounces a function by delaying its execution until a certain amount of time has passed
 * since the last time it was invoked. Only the last invocation within the delay period will be executed.
 */
export function debounce(fn: Function, time: number = 300): Function {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

interface QueryParams {
  [key: string]: string | number;
}
export function generateUrl(baseUrl: string, queryParams: QueryParams): string {
  const queryString = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
  return `${baseUrl}?${queryString}`;
}
