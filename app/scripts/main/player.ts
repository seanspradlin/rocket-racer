/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Player extends Phaser.Sprite {
    state: State;
    isGrounded: boolean;
    isFalling: boolean;
    jumpPower: number;
    playerState: PlayerState;

    constructor(state: State, x: number, y: number) {
      super(state.game, x, y, 'sprites', 'idle/1');
      this.state = state;
      // this.pointer = this.state.input.activePointer;
      this.state.add.existing(this);
      this.state.physics.enable(this);
      this.body.gravity.y = 400;
      this.checkWorldBounds = true;
      this.body.setSize(32, 64);
      this.anchor.set(0.5);
      this.isGrounded = true;
      this.isPrimed = false;
      this.isFalling = false;
      this.jumpPower = 0;
      this.playerState = PlayerState.IDLE;

      // Animations
      this.animations.add('stationary', ['stationary'], 0, false, false);
      this.animations.add('idle', ['idle/1', 'idle/2'], 30, true, false);
      this.animations.add('fullThrust', ['fullThrust/1', 'fullThrust/2'], 30, true, false);
      this.animations.add('rightThrust', ['rightThrust/1', 'rightThrust/2'], 30, true, false);
      this.animations.add('leftThrust', ['leftThrust/1', 'leftThrust/2'], 30, true, false);
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
      switch (this.playerState) {
        
        case PlayerState.CHARGING:
          if (this.jumpPower === 0) {
            this.jumpPower = 10;
          }
          this.jumpPower += 1.3;
          if (this.jumpPower > 100) {
            this.jumpPower = 100;
          }
          break;
          
        case PlayerState.JUMP:
          if (this.isGrounded) {
            this.animations.play('fullThrust');
            this.body.velocity.y = -8 * this.jumpPower;
            this.isGrounded = false;
          }
          this.playerState = PlayerState.IDLE;
          this.jumpPower = 0;
          
        case PlayerState.LEFT:
          if (!this.isGrounded) {
            this.x -= 3;
            this.tiltLeft();
            if (this.isFalling) {
              this.animations.play('leftThrust');
            }
          }
          break;
          
        case PlayerState.RIGHT:
          if (!this.isGrounded) {
            this.x += 3;
            this.tiltRight();
            if (this.isFalling) {
              this.animations.play('rightThrust');
            }
          }
          break;
          
          case PlayerState.IDLE:
            if (this.isFalling) {
              this.animations.play('idle');
            } else if (this.isGrounded) {
              this.animations.play('stationary');
            } else {
              this.animations.play('fullThrust');
            }
            break;
      }
      
      this.game.world.wrap(this, this.width / 2, false, true, false);
    }
  }
}
