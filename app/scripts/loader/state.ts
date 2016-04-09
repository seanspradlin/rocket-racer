/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Loader {
  export class State extends Phaser.State {
    preload() {
    }
    
    create() {
      console.log('Loading complete');
      this.game.state.start('Menu');
    }
  }
}