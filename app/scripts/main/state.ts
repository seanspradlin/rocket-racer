/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class State extends Phaser.State {
    lives: number;
    level: number;
    player: Player;
    platforms: Phaser.Group;
    controls: Controls;
    hud: HUD;
    lava: Lava;
    goal: Goal;
    
    init(lives: number, level: number) {
      this.lives = lives;
      this.level = level;
    }

    create(): void {
      this.stage.backgroundColor = 0x88c070;
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.time.advancedTiming = true;
      
      let levels = this.cache.getJSON('levels');
      let levelOptions = levels[this.level];
      let options = this.generateLevel(levelOptions);
      let platforms = this.generatePlatforms(options);
      this.platforms = this.game.add.existing(platforms);
      this.player = new Player(this, this.world.width / 2, this.world.bounds.bottom - 200);
      this.lava = new Lava(this, levelOptions.lavaDelay, levelOptions.lavaSpeed);

      this.camera.follow(this.player);
      this.camera.deadzone = new Phaser.Rectangle(0, 368, 640, 500);
      
      this.controls = new Controls(this);
      
      this.hud = new HUD(this);
      
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
      this.goal = new Goal(this, this.game.width / 2, options.maxDistance);
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
      
      for (let i = 0; i < options.movingConveyorPlatform; i++) {
        let value = values.pop();
        let platform = this.getPlatformValues(value.distance, value.width + 2, value.speed, true, PlatformSurfaceType.CONVEYOR);
        platforms.push(platform);
      }
      return platforms;
    }
    
    private getPlatformValues(height: number, width: number, speed: number, isMoving: boolean, surfaceType: PlatformSurfaceType): IPlatformOptions {
      width *= 32;
      let hPosition = (Math.random() * (this.game.width - width - 10)) + 10;
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
      this.physics.arcade.overlap(this.player, this.lava, (p: Player, l: Lava) => {
        this.fail();
      });
      this.physics.arcade.collide(this.player, this.goal, () => {
        this.nextLevel();
      });
    }
    
    nextLevel(): void {
      this.game.state.start('Stage', true, false, this.lives, ++this.level);
    }
    
    fail(): void {
      this.lives--;
      if (this.lives === 0) {
        this.lives = 3;
        this.level = 0;
      }
      this.game.state.start('Stage', true, false, this.lives, this.level);
    }
  }
}