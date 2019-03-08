import { Scene } from 'phaser'

var levels = [
  {
    platforms: [
      [600, 400],
      [50, 250],
      [750, 220]
    ],
    stars: [
      [600, 350],
      [100, 200],
      [750, 170]
    ],
    launchers: [
      [50, 200]
    ]
  },
  {
    platforms: [
      [100, 100],
      [200, 200],
      [300, 300],
      [400, 400]
    ],
    stars: [
      [100, 150],
      [200, 250],
      [300, 350]
    ],
    launchers: [
      [70, 150],
      [170, 250],
      [270, 350]
    ]
  }
]

console.log(levels);
class GameScene extends Scene {

  constructor(){
    super();
    this.score = 0;
    this.level = 0;
    this.bombInterval = 4000;
    this.startTime = new Date();
    this.lastTimeStep = new Date();
    this.time = new Date();
  }

  preload() {
    this.load.image('star', 'assets/star.png')
    this.load.image('ground', 'assets/ground.png')
    this.load.image('sky', 'assets/sky.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('launcher', 'assets/launcher.png')
    this.load.spritesheet('dude',
      'assets/dude.png',
      {frameWidth: 32, frameHeight: 48}
    );

  }

  create() {
    const sky = this.add.image(0,0,'sky');
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.timeText = this.add.text(620, 16, 'Time: 0', { fontSize: '32px', fill: '#000' });
    sky.setOrigin(0,0);
    this.createPlatforms();
    this.createLaunchers(this.level);
    this.createPlayer();
    this.createCursor();
    this.createStars(this.level);
    this.createBombs();

  }

  update() {
    // Timer
    this.time = new Date();
    this.timeText.setText('Time: ' + (this.time.getSeconds() - this.startTime.getSeconds()));

    //Player movement
    if (this.cursors.left.isDown) {
      this.player.setAccelerationX(-360)
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setAccelerationX(360)
      this.player.anims.play('right', true);
    } else {

      if(this.player.body.touching.down){
        this.player.setVelocityX(0);
      }
      this.player.setAccelerationX(0);
      this.player.anims.play('turn');
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    } else if (this.cursors.up.isDown && this.player.body.touching.left) {
      this.player.setVelocityY(-240);
      this.player.setVelocityX(160);
    } else if (this.cursors.up.isDown && this.player.body.touching.right) {
      this.player.setVelocityY(-240);
      this.player.setVelocityX(-160);
    }

    // Shoots bomb every 2 seconds
    if(this.time.getTime() > this.lastTimeStep.getTime() + this.bombInterval){
      this.lastTimeStep = this.time
      this.shootBomb(this.level, this.bombs);
    }
  }

  createPlatforms(){
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    console.log(levels[this.level].platforms)
    for (let index in levels[this.level].platforms){
      let nums = levels[this.level].platforms[index];
      this.platforms.create(nums[0],nums[1], 'ground');
    }
  }

  createPlayer(){
    this.player = this.physics.add.sprite(100,400,'dude');
    this.player.setSize(25, 40);
    this.player.setOffset(3, 8);
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player,this.platforms)
    this.physics.add.collider(this.player,this.launchers)
    this.player.setMaxVelocity(240)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  createCursor(){
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createStars(level){
   this.stars = this.physics.add.group({
       key: 'star',
       repeat: levels[level].stars.length - 1,
       // setXY: { x: 12, y: 0, stepX: 70 }
    });

    //console.log(this.level);
    let i = 0;
    this.stars.children.iterate(function(child) {
      console.log('**********')
      let x = levels[level].stars[i][0];
      let y = levels[level].stars[i][1];
      console.log(x + " " + y);
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setPosition(x, y)
      i += 1;
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  collectStar(player, star) {
    star.disableBody(true,true);
    this.score += 1;
    this.scoreText.setText('score: ' + this.score);
  }

  createBombs(){
    this.bombs = this.physics.add.group();
    // this.bombs.setAllowGravity(false);
    // this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  createLaunchers(level){
    this.launchers = this.physics.add.staticGroup();
    for (let index in levels[level].launchers){
      let nums = levels[level].launchers[index];
      this.platforms.create(nums[0],nums[1], 'launcher');
    }
    this.physics.add.collider(this.launchers, this.platforms);
  }

  shootBomb(level, bombs){
    let i = 0
    for (let i in levels[level].launchers){
      const x = levels[level].launchers[i][0];
      const y = levels[level].launchers[i][1];
      let bomb = bombs.create(x + 10, y - 10, 'bomb');
      bomb.setBounce(0);
      bomb.setCollideWorldBounds(false);
      bomb.setVelocity(200, 0);
      bomb.body.setAllowGravity(false);
      i += 1;
    };
  }

  hitBomb (player, bomb){

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    //gameOver = true;
  }
}

export default GameScene
