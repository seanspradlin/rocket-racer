/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Player extends Phaser.Sprite {
    state: State;
    isIdle: boolean;
    isGrounded: boolean;
    fuel: number;
    maxFuel: number;
    pointer: Phaser.Pointer;
    thirdWidth: number;
    
    constructor(state: State, x: number, y: number) {
      super(state.game, x, y, 'sprites', 'player/idle/1');
      this.state = state;
      this.pointer = this.state.input.activePointer;
      this.state.add.existing(this);
      this.state.physics.enable(this);
      this.body.gravity.y = 400;
      this.body.setSize(32, 64);
      this.anchor.set(0.5);
      this.maxFuel = 200;
      this.fuel = this.maxFuel;
      this.isGrounded = true;
      this.thirdWidth = this.state.world.width / 3;
      
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
      this.game.physics.arcade.velocityFromAngle(this.angle - 90, 300, this.body.velocity);
      this.fuel -= 1;
      this.isIdle = false;
      this.isGrounded = false;
    }
    
    rightThrust(): void {
      this.animations.play('rightThrust');
      if (this.angle < 45) {
        this.angle++;
      }
      this.game.physics.arcade.velocityFromAngle(this.angle - 90, 300, this.body.velocity);
      this.fuel -= 1;
      this.isIdle = false;
      this.isGrounded = false;
    }
    
    fullThrust(): void {
      this.animations.play('fullThrust');
      this.game.physics.arcade.velocityFromAngle(this.angle - 90, 300, this.body.velocity);
      this.fuel -= 1;
      this.isIdle = false;
      this.isGrounded = false;
    }
    
    idle(): void {
      this.animations.play('idle');
      if (this.angle > 5) {
        this.angle -= 5;
      } else if (this.angle < -5) {
        this.angle += 5;
      } else {
        this.angle = 0;
      }
      if (!this.isIdle) {
        this.game.physics.arcade.velocityFromAngle(this.angle - 90, 0, this.body.velocity);
        this.isIdle = true;
      }
    }
    
    update(): void {
      if (this.fuel > 0) {
        if (this.pointer.isDown) {
          if (this.pointer.x < this.thirdWidth) {
            this.leftThrust();
          } else if (this.pointer.x > this.thirdWidth * 2) {
            this.rightThrust();
          } else {
            this.fullThrust();
          }
        } else {
          this.idle();
        }
      } else {
        this.idle();
      }
      
      if (this.isGrounded && this.fuel < this.maxFuel) {
        this.fuel += 10;
        if (this.fuel > this.maxFuel) {
          this.fuel = this.maxFuel;
        }
      }
    }
  }
}
