 
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "phaser-game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};


var game;
var ball;
var startTime;
var time = 0;
var gameOver = false;
var score = 0;  
var scoreText;
var gameOverText;
 
function preload() {
  this.load.image("ball", "./football.png");
  this.load.image("background", "./background.jpg");
  this.load.image("surface", "./surface.png");
  this.load.image("restartButton", "./restart.png");  
}

function create() {
  this.add.image(400, 300, 'background').setDisplaySize(800, 600);
  ball = this.physics.add.image(400, 200, "ball");
  ball.setCollideWorldBounds(true);
  ball.body.setGravityY(300);
  startTime = Date.now();

  let surface = this.physics.add.staticGroup();
  surface.create(400, 568, 'surface').setScale(2).refreshBody();

   scoreText = this.add.text(600, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

   const moveUpText = this.add.text(670, 500, 'Move Up', { fontSize: '24px', fill: '#000' });
  moveUpText.setInteractive();
  moveUpText.on('pointerdown', handleMoveUp, this);

   gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
  gameOverText.setOrigin(0.5);
  gameOverText.setVisible(false);

   this.restartButton = this.add.image(750, 570, 'restartButton').setScale(0.1).setInteractive();  
   
  this.restartButton.setVisible(false);
  this.restartButton.on('pointerdown', () => {
    this.scene.restart();  
    gameOver = false;  
    score = 0;  
    startTime = Date.now();  
  });
}

function update() {
  if (
    (ball.y >= 600 - ball.height / 2 || ball.y <= ball.height / 2) &&
    !gameOver
  ) {
    gameOver = true;
    this.physics.pause();  
    
     
    score = time;
    gameOverText.setVisible(true);  
    this.restartButton.setVisible(true);  
  } else if (!gameOver) {
    time = Math.floor((Date.now() - startTime) / 1000);
     
    scoreText.setText(`Score: ${time }`);
  }
}

function handleMoveUp() {
  if (!gameOver) {
    ball.setVelocityY(-200);
  }
}

window.onload = () => {
  game = new Phaser.Game(config);
};
