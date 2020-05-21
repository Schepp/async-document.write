# async document.write

This tiny library patches a browser's native `document.write` to execute in an async, non-blocking way.

If you plan on targeting IE 11, you'll also need [this `document.currentScript` polyfill](https://raw.githubusercontent.com/amiller-gh/currentScript-polyfill). IE 10 and lower are not supported and will fall back to the original behavior. The same is true for IE 11 without the above polyfill.
