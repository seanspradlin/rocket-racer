/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    
    create() {
      this.player = new Player(this, 50, 50);
      console.log('Game Started');
    }
  }
}