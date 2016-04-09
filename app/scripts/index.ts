/// <reference path="../../typings/tsd.d.ts" />
'use strict';
class Bernie extends Phaser.Game {
  constructor() {
    super(320, 568, Phaser.WEBGL, '');
    this.state.add('Boot', Boot.State);
    this.state.add('Loader', Loader.State);
    this.state.add('Menu', Menu.State);
    this.state.add('Main', Main.State);
    this.state.add('GameOver', GameOver.State);
    this.state.start('Boot');
  }
}

new Bernie();