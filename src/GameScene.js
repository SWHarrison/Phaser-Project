import Phaser, { Scene } from 'phaser'

class GameScene extends Scene {

  preload() {
    this.load.image('star', 'assets/star.png')
    this.load.image('ground', 'assets/ground.png')
    this.load.image('sky', 'assets/sky.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});

  }

  create() {
    const sky = this.add.image(0,0,'sky');
    sky.setOrigin(0,0);
    this.star = this.add.image(400, 300, 'star')
  }
}

export default GameScene
