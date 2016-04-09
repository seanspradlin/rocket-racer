/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Boot {
  export class State extends Phaser.State {
    init() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.stage.backgroundColor = 0xeeeeee;
      this.game.stage.smoothed = false;
    }
    
    preload() {
    }
    
    create() {
      console.log('Boot complete');
      this.game.state.start('Loader');
    }
  }
}