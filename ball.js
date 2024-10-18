 
let game;
    let ball;
    let startTime;
    let time = 0;
    let gameOver = false;
    let score = 0;
    let scoreText;
    let gameOverText;
    let scoreMultiplier = 1;


    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "phaser-game",
      // backgroundColor: '#add8e6', 
      backgroungimage:'/background.jpg',
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    // var platforms;
    // var score = 0;
    //  var scoreText;

    // var game = new Phaser.Game(config);


    function preload() {
      this.load.image("ball", "/football.jpg");
      this.load.image("background", "/background.jpg");
      this.load.image("surface", "/surface.png");
    }

    function create() {
      this.add.image(500, 300, 'background').setDisplaySize(1000, 600); 
      ball = this.physics.add.sprite(400, 200, "ball");
      ball.setCollideWorldBounds(true);
      ball.body.setGravityY(300);
      startTime = Date.now();

      this.input.keyboard.on('keydown-E', () => setDifficulty('easy'));
      this.input.keyboard.on('keydown-M', () => setDifficulty('medium'));
      this.input.keyboard.on('keydown-H', () => setDifficulty('hard'));

      let surface = this.physics.add.staticGroup();

      surface.create(400, 568, 'surface').setScale(2).refreshBody();

      //  The score
    scoreText = this.add.text(640, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


    

    // Add the move up text
  const moveUpText = this.add.text(670, 500, 'Move Up', { fontSize: '24px', fill: '#000' });
  moveUpText.setInteractive();
  moveUpText.on('pointerdown', handleMoveUp, this);

  // Add the game over text (initially invisible)
  gameOverText = this.add.text(200, 300, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
  gameOverText.setOrigin(0.5);
  gameOverText.setVisible(false);
     }

    function update() {
      if (
        (ball.y >= 600 - ball.height / 2 || ball.y <= ball.height / 2) &&
        !gameOver
      ) {
        gameOver = true;
        this.scene.pause();
        gameOverText.setVisible(false); // Show game over text
        document.querySelector(".game-container").style.display = "none";
        document.querySelector(".game-over-container").style.display = "flex";
        // document.getElementById("score-display").innerText = `Your score is: ${time * scoreMultiplier}`;

        // document.getElementById("score-display").innerText = `Your score is: ${time}`;

          //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);


      } else if (!gameOver) {
        time = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("time-display").innerText = `Time: ${time} seconds`;
      }
    }


    
    function handleMoveUp() {
      if (!gameOver) {
        ball.setVelocityY(-200);
      }
    }
    // function handleEasyUp() {
    //   if (!gameOver) {
    //     ball.setVelocityY(-100);
    //   }
    // }

    // function handleMediumUp() {
    //   if (!gameOver) {
    //     ball.setVelocityY(-200);
    //   }
    // }

    // function handleHardUp() {
    //   if (!gameOver) {
    //     ball.setVelocityY(-300);
    //   }
    // }

    function setDifficulty(level) {
      switch (level) {
        case 'easy':
          scoreMultiplier = 5;
          break;
        case 'medium':
          scoreMultiplier = 10;
          break;
        case 'hard':
          scoreMultiplier = 15;
          break;
        default:
          scoreMultiplier = 1;
      }
    }
   
    // function startGame(){
    //   this.scene.reload();
    // }


    // document.getElementById("move-up-button").addEventListener("click", handleMoveUp);
    // document.getElementById("easy-up-button").addEventListener("click",  handleEasyUp);
    // document.getElementById("medium-up-button").addEventListener("click", handleMediumUp);
    // document.getElementById("hard-up-button").addEventListener("click", handleHardUp);
    document.getElementById("restart-button").addEventListener("click", () => {
      window.location.reload();
    });

    // document.getElementById("easy-up-button").addEventListener("click", () => {
    //  console.log("funtion called ");
    //   let difficulty = 'easy';
    //   setDifficulty(difficulty);
    //   startGame();
    // });

    // document.getElementById("medium-up-button").addEventListener("click", () => {
    //   setDifficulty = 'medium';
    //   setDifficulty(setDifficulty);
    //   startGame();
    // });

    // document.getElementById("hard-up-button").addEventListener("click", () => {
    //   difficulty = 'hard';
    //   setDifficulty(difficulty);
    //   startGame();
    // });


    window.onload = () => {
      game = new Phaser.Game(config);
    };