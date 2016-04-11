/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    
    create(): void {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.time.advancedTiming = true;
      
      this.player = new Player(this, this.world.width /2, this.world.height /2);
      new Platform(this, 0, this.stage.height - 24, this.stage.width, 24);
      new Platform(this, 60, this.stage.height - 300, 128);
      new Platform(this, 120, this.stage.height - 700, 256);
      console.log('Game Started');
    }
    
    render(): void {
      this.game.debug.text('JumpPower: ' + this.player.jumpPower, 32, 16);
      this.game.debug.text('Falling: ' + this.player.isFalling, 32, 32);
      this.game.debug.text('Velocity:' + this.player.body.velocity.y, 32, 48);
    }
  }
}