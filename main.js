// Create our 'main' state that will contain the game
var mainState = {
	preload: function() { 
		// This function will be executed at the beginning     
		// That's where we load the images and sounds
		game.load.image('bird', 'assets/bird.png'); //bird image lodaded 
		game.load.image('pipe', 'assets/pipe.png') //pipe image loaded
	},

	create: function() { 
		// This function is called after the preload function     
		// Here we set up the game, display sprites, etc.

		game.stage.backgroundColor = '#71c5cf'; //background set as blue

		game.physics.startSystem(Phaser.Physics.ARCADE); //load the physics engine

		this.bird = game.add.sprite(100, 245, 'bird'); //coordinates where the bird needs to be set initially

		game.physics.arcade.enable(this.bird); //bird is given life (nah physics only)

		this.bird.body.gravity.y = 1000; //gravity added fruitfully to make it fall

		var spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //define spacekey as the even of pressing the SPACEBAR
		spacekey.onDown.add(this.jump, this); //spacekey when buttoned down, bird will jump

		this.pipes = game.add.group();

		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 

		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0", 
    		{ font: "30px Arial", fill: "#ffffff" }); 
	},

	update: function() {
		// This function is called 60 times per second    
		// It contains the game's logic   
		if(this.bird.y < 0 || this.bird.y > 490)
			this.restartGame();

		game.physics.arcade.overlap(
    	this.bird, this.pipes, this.restartGame, null, this);

	},

	jump: function() {
		this.bird.body.velocity.y = -350; //jumping gives a vertical velocity to the bird in upward direction
	},

	restartGame: function() {
		game.state.start('main');
	},

	addOnePipe: function(x, y) {
		var pipe = game.add.sprite(x, y, 'pipe'); //create a new pipe at (x, y)

		this.pipes.add(pipe);

		game.physics.arcade.enable(pipe);

		pipe.body.velocity.x = -200;

		pipe.checkWorldBounds = true; //check if object within game world (area yeah)
		pipe.outOfBoundKill = true; //kill the object if its outside the world
	},

	addRowOfPipes: function() {
		var hole = Math.floor(Math.random() * 5) + 1;

		for(var i = 0; i < 8; i++)
			if(i != hole && i != hole + 1)
				this.addOnePipe(400, i * 60 + 10);

		this.score += 1;
		this.labelScore.text = this.score;  
	},
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');