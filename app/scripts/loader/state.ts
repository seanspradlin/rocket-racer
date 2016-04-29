/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Loader {
  export class State extends Phaser.State {
    preload() {
      this.load.atlasJSONHash('sprites', 'assets/images/sprites.png', 'assets/images/sprites.json');
      this.load.atlasJSONHash('environment', 'assets/images/environment.png', 'assets/images/environment.json');
      this.load.atlasJSONHash('ui', 'assets/images/ui.png', 'assets/images/ui.json');
      this.load.bitmapFont('visitor', 'assets/fonts/visitor.png', 'assets/fonts/visitor.xml');
      this.load.bitmapFont('visitor-dark', 'assets/fonts/visitor-dark.png', 'assets/fonts/visitor-dark.xml');
      this.load.json('levels', 'assets/data/levels.json');
      this.load.audio('jump', 'assets/audio/jump.ogg');
      this.load.audio('success', 'assets/audio/success.ogg');
      this.load.audio('fail', 'assets/audio/fail.ogg');
    }

    create() {
      console.log('Loading complete');
      this.game.state.start('Menu');
    }
  }
}