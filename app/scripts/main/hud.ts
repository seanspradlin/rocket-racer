/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class HUD {
    state: State;
    fill: Phaser.TileSprite;
    meter: Phaser.Sprite;
    background: Phaser.TileSprite;
    levelText: Phaser.BitmapText;

    constructor(state: State) {
      this.state = state;
      this.background = this.state.add.tileSprite(0, 0, this.state.camera.width, 32, 'ui', 'hudbg');
      this.background.fixedToCamera = true;
      this.meter = this.state.add.sprite(this.state.camera.width - 158, 2, 'ui', 'meter');
      this.meter.fixedToCamera = true;
      this.fill = this.state.add.tileSprite(this.state.camera.width - 156, 4, 0, 24, 'ui', 'meterfill');
      this.fill.fixedToCamera = true;
      this.levelText = this.state.add.bitmapText(79, 16, 'visitor-dark', 'LEVEL ' + this.padLevel(), 32);
      this.levelText.anchor.set(0.5);
      this.levelText.fixedToCamera = true;
    }

    private padLevel(): string {
      let n = '' + (this.state.level + 1);
      return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
    }
  }
}
