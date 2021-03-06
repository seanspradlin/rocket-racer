/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Player extends Phaser.Sprite {
    state: State;
    isGrounded: boolean;
    isFalling: boolean;
    isPrimed: boolean;
    jumpPower: number;

    constructor(state: State, x: number, y: number) {
      super(state.game, x, y, 'sprites', 'player/idle/1');
      this.state = state;
      this.state.add.existing(this);
      this.state.physics.enable(this);
      this.body.gravity.y = 125;
      this.checkWorldBounds = true;
      this.body.setSize(16, 32);
      this.anchor.set(0.5);
      this.isGrounded = true;
      this.isFalling = false;
      this.isPrimed = false;
      this.jumpPower = 0;

      // Animations
      this.animations.add('stationary', ['player/stationary'], 0, false, false);
      this.animations.add('idle', ['player/idle/1', 'player/idle/2'], 30, true, false);
      this.animations.add('fullThrust', ['player/fullThrust/1', 'player/fullThrust/2'], 30, true, false);
      this.animations.add('rightThrust', ['player/rightThrust/1', 'player/rightThrust/2'], 30, true, false);
      this.animations.add('leftThrust', ['player/leftThrust/1', 'player/leftThrust/2'], 30, true, false);
      this.animations.play('stationary');
    }

    landed(): void {
      if (!this.isGrounded) {
        this.isGrounded = true;
        this.isFalling = false;
        this.angle = 0;
        this.animations.play('stationary');
      }
    }


    recenter(): void {
      if (this.angle > 5) {
        this.angle -= 5;
      } else if (this.angle < -5) {
        this.angle += 5;
      } else {
        this.angle = 0;
      }
    }

    tiltLeft(): void {
      if (this.angle > -15) {
        this.angle--;
      }
    }

    tiltRight(): void {
      if (this.angle < 15) {
        this.angle++;
      }
    }

    update(): void {
      if (this.body.velocity.y > 0 && !this.isFalling) {
        this.animations.play('idle');
        this.isFalling = true;
      }
      switch (this.state.controls.currentPress) {
        case ControlButtons.CHARGE:
          if (this.isPrimed) {
            this.jumpPower += 1.3;
            if (this.jumpPower > 100) {
              this.jumpPower = 100;
              if (this.isGrounded) {
                this.animations.play('fullThrust');
              }
            } else if (this.isGrounded) {
              this.animations.play('idle');
            }
          } else {
            this.animations.play('idle');
            this.jumpPower = 10;
            this.isPrimed = true;
          }
          break;

        case ControlButtons.LEFT:
          if (!this.isGrounded) {
            this.x -= 1.5;
            this.tiltLeft();
            if (this.isFalling) {
              this.animations.play('leftThrust');
            }
          }
          break;

        case ControlButtons.RIGHT:
          if (!this.isGrounded) {
            this.x += 1.5;
            this.tiltRight();
            if (this.isFalling) {
              this.animations.play('rightThrust');
            }
          }
          break;

        case ControlButtons.NONE:
          if (this.isPrimed) {
            if (this.isGrounded) {
              this.animations.play('fullThrust');
              this.body.velocity.y = -100 - (1.5*this.jumpPower);
              this.isGrounded = false;
              this.state.sound.play('jump');
            }
            this.isPrimed = false;
            this.jumpPower = 0;
          } else {
            if (this.isFalling) {
              this.animations.play('idle');
            } else if (this.isGrounded) {
              this.animations.play('stationary');
            } else {
              this.animations.play('fullThrust');
            }
          }
          this.recenter();
          break;
      }

      this.game.world.wrap(this, this.width / 2, false, true, false);
      this.state.hud.fill.width = Math.floor(this.jumpPower * .76) * 2;
    }
  }
}
