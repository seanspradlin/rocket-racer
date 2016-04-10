/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    
    create(): void {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      
      this.player = new Player(this, this.world.width /2, this.world.height /2);
      new Platform(this, 0, this.stage.height - 24, this.stage.width, 24);
      new Platform(this, 60, this.stage.height - 300, 128);
      new Platform(this, 120, this.stage.height - 700, 256);
      console.log('Game Started');
    }
    
    render(): void {
      
    }
  }
}