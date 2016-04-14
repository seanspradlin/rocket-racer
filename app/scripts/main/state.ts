/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    player: Player;
    platforms: Phaser.Group;

    create(): void {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.time.advancedTiming = true;

      let levelOptions: ILevelOptions = {
        minDistance: 250,
        maxDistance: 750,
        minWidth: 6,
        maxWidth: 12,
        minSpeed: 1,
        maxSpeed: 4,
        staticPlatforms: 4,
        movingStaticPlatforms: 4,
        conveyorPlatforms: 4,
        movingConveyorPlatform: 4
      };
      let options = this.generateLevel(levelOptions);
      let platforms = this.generatePlatforms(options);
      this.platforms = this.game.add.existing(platforms);
      this.player = new Player(this, this.world.width / 2, this.world.bounds.bottom - 64);

      this.camera.follow(this.player);
      this.camera.deadzone = new Phaser.Rectangle(0, 668, 640, 300);
      console.log('Game Started');
    }

    private generateLevel(options: ILevelOptions): IPlatformOptions[] {
      let platforms = [] as IPlatformOptions[];

      let totalPlatforms = 0;
      totalPlatforms += options.staticPlatforms;
      totalPlatforms += options.movingStaticPlatforms;
      totalPlatforms += options.conveyorPlatforms;
      totalPlatforms += options.movingConveyorPlatform;

      let values = [];
      let distanceRange = options.maxDistance - options.minDistance;
      let widthRange = options.maxWidth - options.minWidth;
      let speedRange = options.maxSpeed - options.minSpeed;
      let prev = 0;
      for (let i = 0; i < totalPlatforms; i++) {
        let value = {
          distance: Math.floor(options.minDistance + (Math.random() * distanceRange)),
          width: Math.floor(options.minWidth + (Math.random() * widthRange)),
          speed: Math.floor(options.minSpeed + (Math.random() * speedRange))
        };
        value.distance += prev;
        prev = value.distance;
        values.push(value);
      }
      
      let worldHeight = values[values.length - 1].distance + (options.maxDistance * 2);
      this.world.setBounds(0, 0, this.game.width, worldHeight);
      
      values = Utilities.Shuffle(values);

      for (let i = 0; i < options.staticPlatforms; i++) {
        let value = values.pop();
        let platform = this.getPlatformValues(value.distance, value.width, value.speed, false, PlatformSurfaceType.STATIC);
        platforms.push(platform);
      }

      for (let i = 0; i < options.movingStaticPlatforms; i++) {
        let value = values.pop();
        let platform = this.getPlatformValues(value.distance, value.width, value.speed, true, PlatformSurfaceType.STATIC);
        platforms.push(platform);
      }
      
      for (let i = 0; i < options.conveyorPlatforms; i++) {
        let value = values.pop();
        let platform = this.getPlatformValues(value.distance, value.width + 2, value.speed, false, PlatformSurfaceType.CONVEYOR);
        platforms.push(platform);
      }
      
      for (let i = 0; i < options.movingStaticPlatforms; i++) {
        let value = values.pop();
        let platform = this.getPlatformValues(value.distance, value.width + 2, value.speed, true, PlatformSurfaceType.CONVEYOR);
        platforms.push(platform);
      }
      return platforms;
    }
    
    private getPlatformValues(height: number, width: number, speed: number, isMoving: boolean, surfaceType: PlatformSurfaceType): IPlatformOptions {
      width *= 32;
      let hPosition = (Math.random() * (this.world.width - width - 40)) + 40;
      return {
        state: this,
        x: hPosition,
        y: this.world.height - height,
        width: width,
        isMoving: isMoving,
        surfaceType: surfaceType,
        speed: speed
      };
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
            break;
          case PlatformSurfaceType.CONVEYOR:
            platform = new ConveyorPlatform(platforms[i]);
            break;
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
  }
}