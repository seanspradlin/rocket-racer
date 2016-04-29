/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Platform extends Phaser.TileSprite {
    state: State;
    isMoving: boolean;
    direction: number;
    speed: number;
    isHoldingPlayer: boolean;

    constructor(options: IPlatformOptions) {
      super(options.state.game, options.x, options.y, options.width, 16, 'environment', options.key);
      this.state = options.state;
      this.isMoving = options.isMoving || false;
      this.direction = Phaser.Utils.randomChoice(Phaser.LEFT, Phaser.RIGHT);
      this.isHoldingPlayer = false;
      this.speed = options.speed || 2;
      this.state.physics.enable(this);
      this.body.checkCollision.up = true;
      this.body.checkCollision.left = false;
      this.body.checkCollision.right = false;
      this.body.checkCollision.down = false;
      this.body.immovable = true;
    }
  }

  export class Ground extends Platform {
    constructor(state: State) {
      let options: IPlatformOptions = {
        state: state,
        x: -16,
        y: state.world.bounds.bottom - 84,
        width: state.game.width + 32,
        isMoving: false,
        surfaceType: PlatformSurfaceType.GROUND,
        key: 'ground'
      };
      super(options);
    }
  }

  export class StaticPlatform extends Platform {
    constructor(options: IPlatformOptions) {
      options.key = 'beam';
      options.y -= 84;
      super(options);
    }

    update(): void {
      if (this.isMoving) {
        if (this.direction === Phaser.LEFT) {
          if (this.left < 5) {
            this.direction = Phaser.RIGHT;
            this.x += this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x += this.speed;
            }
          } else {
            this.x -= this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x -= this.speed;
            }
          }
        }
        else {
          if (this.right > this.game.world.width - 5) {
            this.direction = Phaser.LEFT;
            this.x -= this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x -= this.speed;
            }
          } else {
            this.x += this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x += this.speed;
            }
          }
        }
      }
      this.isHoldingPlayer = false;
    }

  }

  export class ConveyorPlatform extends Platform {
    conveyorDirection: number;

    constructor(options: IPlatformOptions) {
      options.key = 'conveyor/1';
      options.y -= 84;
      super(options);
      this.animations.add('forward', ['conveyor/1', 'conveyor/2', 'conveyor/3', 'conveyor/4'], this.speed * 6, true, false);
      this.animations.add('reverse', ['conveyor/4', 'conveyor/3', 'conveyor/2', 'conveyor/1'], this.speed * 6, true, false);
      this.conveyorDirection = Phaser.Utils.randomChoice(Phaser.LEFT, Phaser.RIGHT);
      if (this.conveyorDirection === Phaser.LEFT) {
        this.animations.play('reverse');
      } else {
        this.animations.play('forward');
      }
    }

    update(): void {
      if (this.isHoldingPlayer) {
        if (this.conveyorDirection === Phaser.LEFT) {
          this.state.player.x -= this.speed;
        } else {
          this.state.player.x += this.speed;
        }
      }
      if (this.isMoving) {
        if (this.direction === Phaser.LEFT) {
          if (this.left < 5) {
            this.direction = Phaser.RIGHT;
            this.x += this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x += this.speed;
            }
          } else {
            this.x -= this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x -= this.speed;
            }
          }
        }
        else {
          if (this.right > this.game.world.width - 5) {
            this.direction = Phaser.LEFT;
            this.x -= this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x -= this.speed;
            }
          } else {
            this.x += this.speed;
            if (this.isHoldingPlayer) {
              this.state.player.x += this.speed;
            }
          }
        }
      }
      this.isHoldingPlayer = false;
    }
  }
}
