/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Lava extends Phaser.TileSprite {
    state: State;
    start: number;
    speed: number;
    isStarted: boolean;

    constructor(state: State, start: number, speed: number) {
      super(state.game, 0, state.world.height + 15, state.camera.width, state.camera.height, 'environment', 'lava');
      this.state = state;
      this.state.add.existing(this);
      this.start = state.game.time.time + (1000 * start);
      this.speed = speed;
      this.isStarted = false;


      let fire = new Phaser.TileSprite(state.game, 0, -16, state.camera.width, 16, 'environment', 'flames/1');
      fire.animations.add('default', ['flames/1', 'flames/2', 'flames/3', 'flames/4']);
      fire.animations.play('default', 12, true);
      this.addChild(fire);

      this.state.physics.enable(this);
      this.body.checkCollision.up = true;
      this.body.immovable = true;
    }

    update(): void {
      if (!this.isStarted && this.state.game.time.time > this.start) {
        this.body.velocity.y -= this.speed;
        this.isStarted = true;
      }
    }
  }
}

