/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Player extends Phaser.Sprite {
    state: State;
    leftKey: Phaser.Key;
    rightKey: Phaser.Key;
    
    constructor(state: State, x: number, y: number) {
      super(state.game, x, y, 'sprites', 'player/idle/1');
      this.state = state;
      this.state.add.existing(this);
      this.leftKey = this.state.input.keyboard.addKey(Phaser.KeyCode.A);
      this.rightKey = this.state.input.keyboard.addKey(Phaser.KeyCode.D);
      this.anchor.set(0.5);
      
      // Animations
      this.animations.add('idle', ['player/idle/1', 'player/idle/2'], 30, true, false);
      this.animations.add('fullThrust', ['player/fullThrust/1', 'player/fullThrust/2'], 30, true, false);
      this.animations.add('rightThrust', ['player/rightThrust/1', 'player/rightThrust/2'], 30, true, false);
      this.animations.add('leftThrust', ['player/leftThrust/1', 'player/leftThrust/2'], 30, true, false);
      
      this.idle();
    }
    
    leftThrust(): void {
      this.animations.play('leftThrust');
      if (this.angle > -45) {
        this.angle--;
      }
    }
    
    rightThrust(): void {
      this.animations.play('rightThrust');
      if (this.angle < 45) {
        this.angle++;
      }
    }
    
    fullThrust(): void {
      this.animations.play('fullThrust');
    }
    
    idle(): void {
      this.animations.play('idle');
      if (this.angle > 0) {
        this.angle--;
      } else if (this.angle < 0) {
        this.angle++;
      }
    }
    
    update(): void {
      if (this.leftKey.isDown && this.rightKey.isDown) {
        this.fullThrust();
      } else if (this.leftKey.isDown) {
        this.leftThrust();
      } else if (this.rightKey.isDown) {
        this.rightThrust();
      } else {
        this.idle();
      }
      
    }
  }
}
