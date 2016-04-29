/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace GameOver {
  export class State extends Phaser.State {
    create() {
      console.log('Game Over');
      let midX = this.camera.width / 2;
      let midY = this.camera.height / 2;

      this.stage.backgroundColor = 0x081820;

      let text = this.add.bitmapText(midX, midY, 'visitor', 'GAME\nOVER', 64);
      text.anchor.set(0.5);
      this.time.events.add(5000, this.loadLevel, this);
    }

    loadLevel(): void {
      this.game.state.start('Stage', true, false, 3, 0);
    }
  }
}
