/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class HUD {
    state: State;
    fill: Phaser.TileSprite;
    meter: Phaser.Sprite;
    background: Phaser.TileSprite;
    
    
    constructor(state: State) {
      this.state = state;
      this.background = this.state.add.tileSprite(0, 0, this.state.camera.width, 64, 'ui', 'hudbg');
      this.background.fixedToCamera = true;
      this.meter = this.state.add.sprite(this.state.camera.width - 316, 4, 'ui', 'meter');
      this.meter.fixedToCamera = true;
      this.fill = this.state.add.tileSprite(this.state.camera.width - 312, 8, 0, 48, 'ui', 'meterfill');
      this.fill.fixedToCamera = true;
    }
  }
}