/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Platform extends Phaser.TileSprite {
    state: State;
    isMoving: boolean;
    direction: number;
    speed: number;
    
    constructor(options: IPlatformOptions) {
      super(options.state.game, options.x, options.y, options.width, 24, 'sprites', options.key);
      this.state = options.state;
      this.isMoving = options.isMoving || false;
      this.direction = Phaser.Utils.randomChoice(Phaser.LEFT, Phaser.RIGHT);
      this.speed = options.speed || 2;
      this.state.physics.enable(this);
      this.body.checkCollision.up = true;
      this.body.checkCollision.left = false;
      this.body.checkCollision.right = false;
      this.body.checkCollision.down = false;
      this.body.immovable = true;
    }
  }
  
  export class StaticPlatform extends Platform {
    constructor(options: IPlatformOptions) {
      options.key = 'ground';
      super(options);
    }
    
    update(): void {
      if (this.isMoving) {
        if (this.direction === Phaser.LEFT) {
          if (this.left < 10) {
            this.direction = Phaser.RIGHT;
            this.x += this.speed;
          } else {
            this.x -= this.speed;
          }
        }
        else {
          if (this.right > this.game.world.width - 10) {
            this.direction = Phaser.LEFT;
            this.x -= this.speed;
          } else {
            this.x += this.speed;
          }
        }
      }
    }
    
  }
}