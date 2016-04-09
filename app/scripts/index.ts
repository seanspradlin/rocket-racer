/// <reference path="../../typings/tsd.d.ts" />
'use strict';
class RocketRacer extends Phaser.Game {
  constructor() {
    super(640, 1136, Phaser.AUTO, '', null, false, false);
    this.state.add('Boot', Boot.State);
    this.state.add('Loader', Loader.State);
    this.state.add('Menu', Menu.State);
    this.state.add('Main', Main.State);
    this.state.add('GameOver', GameOver.State);
    this.state.start('Boot');
  }
}

new RocketRacer();