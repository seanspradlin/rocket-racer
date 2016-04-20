/// <reference path="../../../typings/tsd.d.ts" />
'use strict';
namespace Stage {
  export class State extends Phaser.State {
    lives: number;
    level: number;
    
    init(lives: number, level: number) {
      this.lives = lives;
      this.level = level;
    }
    
    create() {
      let midX = this.camera.width / 2;
      let midY = this.camera.height / 2;
      
      this.stage.backgroundColor = 0x081820;
      
      let levelText = this.add.bitmapText(midX, midY - 16, 'visitor', 'LEVEL ' + this.padLevel(), 64);
      levelText.anchor.set(0.5);
      
      let livesText = this.add.bitmapText(midX, midY + 16, 'visitor', 'Lives x' + this.lives, 32);
      livesText.anchor.set(0.5);
      
      this.time.events.add(5000, this.loadLevel, this);
    }
    
    private loadLevel() {
      this.game.state.start('Main', true, false, this.lives, this.level);
    }
    
    private padLevel(): string {
      let n = '' + (this.level + 1);
      return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
    }
  }
}