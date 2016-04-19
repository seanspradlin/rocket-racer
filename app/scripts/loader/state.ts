/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Loader {
  export class State extends Phaser.State {
    preload() {
      this.load.atlasJSONHash('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');
      this.load.atlasJSONHash('environment', 'assets/images/environment.png', 'assets/images/environment.json');
      this.load.atlasJSONHash('ui', 'assets/images/ui.png', 'assets/images/ui.json');
      this.load.bitmapFont('visitor', 'assets/fonts/visitor.png', 'assets/fonts/visitor.fnt');
      this.load.bitmapFont('visitor-dark', 'assets/fonts/visitor-dark.png', 'assets/fonts/visitor-dark.fnt');
    }
    
    create() {
      console.log('Loading complete');
      this.game.state.start('Menu');
    }
  }
}