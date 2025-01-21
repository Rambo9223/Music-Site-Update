// page to see if we can implement component rendering with mediaquery https://react-md.dev/guides/writing-tests
import {
    DEFAULT_DESKTOP_MIN_WIDTH,
    DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  } from '@react-md/utils';
  
  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query) => ({
      media: query,
      matches:
        query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
        query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
      onchange: () => {},
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
