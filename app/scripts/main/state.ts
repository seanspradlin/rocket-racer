/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    platforms: Phaser.Group;
    
    create(): void {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.time.advancedTiming = true;
      
      this.world.setBounds(0, 0, this.game.width, this.game.height * 2);
      
      this.player = new Player(this, this.world.width /2, this.world.bounds.bottom  - 56);
      // new Platform(this, -32, this.world.bounds.bottom - 24, this.stage.width + 64, 24);
      // new Platform(this, 60, this.world.bounds.bottom - 300, 128);
      // new Platform(this, 120, this.world.bounds.bottom - 700, 256);
      // new Platform(this, 10, this.world.bounds.bottom - 1450, 128);
      // new Platform(this, 150, this.world.bounds.bottom - 1700, 128);
      let options: IPlatformOptions = {
        state: this,
        x: -32,
        y: this.world.bounds.bottom - 24,
        width: this.stage.width + 64,
        isMoving: false,
        surfaceType: PlatformSurfaceType.STATIC
      };
      
      this.platforms = this.game.add.existing(this.generatePlatforms([options]));
      
      this.camera.follow(this.player);
      this.camera.deadzone = new Phaser.Rectangle(0, 668, 640, 300);
      console.log('Game Started');
    }
    
    private generatePlatforms(platforms: IPlatformOptions[]): Phaser.Group {
      let group = new Phaser.Group(this.game);
      group.physicsBodyType = Phaser.Physics.ARCADE;
      group.enableBody = true;
      
      for (let i = 0; i < platforms.length; i++) {
        let platform: Platform;
        switch (platforms[i].surfaceType) {
          case PlatformSurfaceType.STATIC:
            platform = new StaticPlatform(platforms[i]);
        }
        group.add(platform);
      }
      
      return group;
    }
    
    render(): void {
      this.game.debug.text('Grounded: ' + this.player.isGrounded, 32, 16);
      this.game.debug.text('Falling: ' + this.player.isFalling, 32, 32);
      this.game.debug.text('Primed: ' + this.player.isPrimed, 32, 48);
    }
  }
}