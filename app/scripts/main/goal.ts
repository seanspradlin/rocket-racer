/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Goal extends Phaser.Sprite {
    state: State;
    
    constructor(state: State, x: number, y: number) {
      super(state.game, x, y, 'sprites', 'star/1');
      this.state = state;
      this.state.add.existing(this);
      this.state.physics.enable(this);
      this.body.immovable = true;
      this.anchor.set(0.5);
      
      this.animations.add('default', ['star/1', 'star/2', 'star/3', 'star/2'], 12, true, false);
      this.animations.play('default');
    }
  }
}
