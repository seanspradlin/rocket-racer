/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Player extends Phaser.Sprite {
    state: State;
    
    constructor(state: State, x: number, y: number) {
      super(state.game, x, y, 'sprites', 'player/idle/1');
      this.state = state;
      this.state.add.existing(this);
      this.animations.add('idle', ['player/idle/1', 'player/idle/2'], 30, true, false);
      this.animations.add('fullThrust', ['player/fullThrust/1', 'player/fullThrust/2'], 30, true, false);
      this.animations.add('rightThrust', ['player/rightThrust/1', 'player/rightThrust/2'], 30, true, false);
      this.animations.add('leftThrust', ['player/leftThrust/1', 'player/leftThrust/2'], 30, true, false);
      this.rightThrust();
    }
    
    leftThrust(): void {
      this.animations.play('leftThrust');
      this.angle = -45;
    }
    
    rightThrust(): void {
      this.animations.play('rightThrust');
      this.angle = 45;
    }
    
    fullThrust(): void {
      this.animations.play('fullThrust');
      this.angle = 0;
    }
    
    idle(): void {
      this.animations.play('idle');
      this.angle = 0;
    }
  }
}
