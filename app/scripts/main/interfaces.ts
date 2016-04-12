/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export interface IPlatformOptions {
    state: State;
    key?: string;
    x: number;
    y: number;
    width: number;
    isMoving: boolean;
    speed: number;
  }
}