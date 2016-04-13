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


      // new Platform(this, -32, this.world.bounds.bottom - 24, this.stage.width + 64, 24);
      // new Platform(this, 60, this.world.bounds.bottom - 300, 128);
      // new Platform(this, 120, this.world.bounds.bottom - 700, 256);
      // new Platform(this, 10, this.world.bounds.bottom - 1450, 128);
      // new Platform(this, 150, this.world.bounds.bottom - 1700, 128);
      let options: IPlatformOptions[] = [
        {
          state: this,
          x: 75,
          y: this.world.bounds.bottom - 374,
          width: 256,
          isMoving: true,
          surfaceType: PlatformSurfaceType.STATIC
        },
        {
          state: this,
          x: 128,
          y: this.world.bounds.bottom - 724,
          width: 128,
          isMoving: false,
          speed: 4,
          surfaceType: PlatformSurfaceType.STATIC
        },
        {
          state: this,
          x: 200,
          y: this.world.bounds.bottom - 1424,
          width: 128,
          isMoving: true,
          surfaceType: PlatformSurfaceType.STATIC
        },
        {
          state: this,
          x: 100,
          y: this.world.bounds.bottom - 1724,
          width: 256,
          isMoving: false,
          surfaceType: PlatformSurfaceType.STATIC
        }
      ];

      this.platforms = this.game.add.existing(this.generatePlatforms(options));
      this.player = new Player(this, this.world.width / 2, this.world.bounds.bottom - 64);

      this.camera.follow(this.player);
      this.camera.deadzone = new Phaser.Rectangle(0, 668, 640, 300);
      console.log('Game Started');
    }

    private generatePlatforms(platforms: IPlatformOptions[]): Phaser.Group {
      let group = new Phaser.Group(this.game);
      group.physicsBodyType = Phaser.Physics.ARCADE;
      group.enableBody = true;
      group.add(new Ground(this));
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

    update(): void {
      this.physics.arcade.collide(this.player, this.platforms, (p: Player, pl: Platform) => {
        p.landed();
        pl.isHoldingPlayer = true;
      });
    }

    render(): void {
      this.game.debug.text('Grounded: ' + this.player.isGrounded, 32, 16);
      this.game.debug.text('Falling: ' + this.player.isFalling, 32, 32);
      this.game.debug.text('Primed: ' + this.player.isPrimed, 32, 48);
    }
  }
}