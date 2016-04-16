/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export enum PlatformSurfaceType {
    GROUND,
    STATIC,
    CONVEYOR,
    ICY,
    SPRINGY
  }
  
  export enum PlatformMotionType {
    STATIONARY,
    MOVING
  }
  
  export enum ControlButtons {
    LEFT,
    RIGHT,
    CHARGE,
    NONE
  }
}
