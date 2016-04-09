/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Loader {
  export class State extends Phaser.State {
    preload() {
      this.load.atlasJSONHash('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');
    }
    
    create() {
      console.log('Loading complete');
      this.game.state.start('Menu');
    }
  }
}