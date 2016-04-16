/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export enum PlayerState {
    LEFT,
    RIGHT,
    CHARGING,
    IDLE,
    JUMP
  }
  
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
}
