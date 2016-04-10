/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    
    create() {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.arcade.gravity.y = 100;
      
      this.player = new Player(this, this.world.width /2, this.world.height /2);
      
      console.log('Game Started');
    }
  }
}