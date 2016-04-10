/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Platform extends Phaser.TileSprite {
    state: State;
    
    constructor(state: State, x: number, y: number, width: number, height = 24) {
      super(state.game, x, y, width, height, 'sprites', 'ground');
      this.state = state;
      this.state.add.existing(this);
      this.state.physics.enable(this);
      this.body.checkCollision.up = true;
      this.body.checkCollision.left = false;
      this.body.checkCollision.right = false;
      this.body.checkCollision.down = false;
      this.body.immovable = true;
    }
    
    update() {
      this.state.physics.arcade.collide(this.state.player, this);
    }
  }
}