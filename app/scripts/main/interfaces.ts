/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export interface ILevelOptions {
    minDistance: number;
    maxDistance: number;
    minWidth: number;
    maxWidth: number;
    minSpeed: number;
    maxSpeed: number;
    staticPlatforms: number;
    movingStaticPlatforms: number;
    conveyorPlatforms: number;
    movingConveyorPlatform: number;
    lavaSpeed: number;
    lavaDelay: number;
  }
  
  export interface IPlatformOptions {
    state: State;
    key?: string;
    x: number;
    y: number;
    width: number;
    isMoving: boolean;
    speed?: number;
    surfaceType: PlatformSurfaceType;
  }
}