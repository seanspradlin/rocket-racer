/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

namespace Main {
  export class Controls {
    state: State;
    left: Phaser.Sprite;
    right: Phaser.Sprite;
    charge: Phaser.Sprite;
    currentPress: ControlButtons;

    constructor(state: State) {
      this.state = state;
      this.left = this.state.add.sprite(0, this.state.camera.height - 68, 'ui', 'left');
      this.right = this.state.add.sprite(this.state.camera.width - 96, this.state.camera.height - 68, 'ui', 'right');
      this.charge = this.state.add.sprite(96, this.state.camera.height - 68, 'ui', 'button');
      this.left.name = 'left';
      this.right.name = 'right';
      this.charge.name = 'charge';
      this.left.animations.add('unpressed', ['left'], 0, false);
      this.left.animations.add('pressed', ['leftpressed'], 0, false);
      this.right.animations.add('unpressed', ['right'], 0, false);
      this.right.animations.add('pressed', ['rightpressed'], 0, false);
      this.charge.animations.add('unpressed', ['button'], 0, false);
      this.charge.animations.add('pressed', ['buttonpressed'], 0, false);
      this.left.fixedToCamera = true;
      this.right.fixedToCamera = true;
      this.charge.fixedToCamera = true;
      this.left.inputEnabled = true;
      this.right.inputEnabled = true;
      this.charge.inputEnabled = true;
      this.left.events.onInputDown.add(this.leftClick, this);
      this.left.events.onInputUp.add(this.leftRelease, this);
      this.right.events.onInputDown.add(this.rightClick, this);
      this.right.events.onInputUp.add(this.rightRelease, this);
      this.charge.events.onInputDown.add(this.chargeClick, this);
      this.charge.events.onInputUp.add(this.chargeRelease, this);
      this.currentPress = ControlButtons.NONE;
    }

    leftClick(): void {
      this.left.animations.play('pressed');
      this.right.animations.play('unpressed');
      this.charge.animations.play('unpressed');
      this.currentPress = ControlButtons.LEFT;
    }

    rightClick(): void {
      this.left.animations.play('unpressed');
      this.right.animations.play('pressed');
      this.charge.animations.play('unpressed');
      this.currentPress = ControlButtons.RIGHT;
    }

    chargeClick(): void {
      this.left.animations.play('unpressed');
      this.right.animations.play('unpressed');
      this.charge.animations.play('pressed');
      this.currentPress = ControlButtons.CHARGE;
    }

    leftRelease(): void {
      this.left.animations.play('unpressed');
      if (this.currentPress === ControlButtons.LEFT) {
        this.currentPress = ControlButtons.NONE;
      }
    }

    rightRelease(): void {
      this.right.animations.play('unpressed');
      if (this.currentPress === ControlButtons.RIGHT) {
        this.currentPress = ControlButtons.NONE;
      }
    }

    chargeRelease(): void {
      this.charge.animations.play('unpressed');
      if (this.currentPress === ControlButtons.CHARGE) {
        this.currentPress = ControlButtons.NONE;
      }
    }
  }
}