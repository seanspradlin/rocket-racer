/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Menu {
  export class State extends Phaser.State {
    create() {
      console.log('Menu Loaded');
    }
    
    update() {
      // if (this.input.activePointer.isDown) {
        this.game.state.start('Main');
      // }      
    }
  }
}