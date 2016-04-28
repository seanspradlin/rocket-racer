/// <reference path="../../typings/tsd.d.ts" />
'use strict';

document.addEventListener("deviceready", () => {
  setTimeout(() => {
    (navigator as any).splashscreen.hide();
    new RocketRacer();
  }, 5000, false);
});
