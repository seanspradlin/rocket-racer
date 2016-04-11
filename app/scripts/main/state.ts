/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    
    create(): void {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.time.advancedTiming = true;
      
      this.world.setBounds(0, 0, this.game.width, this.game.height * 2);
      
      this.player = new Player(this, this.world.width /2, this.world.bounds.bottom  - 56);
      new Platform(this, -32, this.world.bounds.bottom - 24, this.stage.width + 64, 24);
      new Platform(this, 60, this.world.bounds.bottom - 300, 128);
      new Platform(this, 120, this.world.bounds.bottom - 700, 256);
      new Platform(this, 10, this.world.bounds.bottom - 1450, 128);
      new Platform(this, 150, this.world.bounds.bottom - 1700, 128);
      
      this.camera.follow(this.player);
      this.camera.deadzone = new Phaser.Rectangle(0, 668, 640, 300);
      console.log('Game Started');
    }
    
    render(): void {
      this.game.debug.text('JumpPower: ' + this.player.jumpPower, 32, 16);
      this.game.debug.text('Falling: ' + this.player.isFalling, 32, 32);
      this.game.debug.text('Velocity:' + this.player.body.velocity.y, 32, 48);
    }
  }
}