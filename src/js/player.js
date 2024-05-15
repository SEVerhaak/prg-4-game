import {Actor, Engine, Screen, Vector, Keys, clamp, Color, ParticleEmitter} from "excalibur";
import {Resources, ResourceLoader} from './resources.js'
import {Game} from './game.js'
import {Food} from './food.js'

export class Player extends Actor {
    score = 0;
    game;
    ySpeed = 80;
    xSpeed = 80;
    xScale = 0.5
    yScale = 0.5
    playerScale = new Vector(this.xScale, this.yScale)

    constructor(game) {
        super({width: 100, height: 85});
        this.game = game
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.on('collisionstart', (event) => this.hitSomething(event, this.game))
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(400, 400);
        this.vel = new Vector(0, 0);
        this.scale = this.playerScale;
    }

    hitSomething(event, game) {
        console.log(event.other)
        if (event.other instanceof Food) {
            console.log("the fish eats the food")
            event.other.kill();
            //this.game.spawnFood();
            this.xScale += 0.1
            this.yScale += 0.1
            if (!this.ySpeed < 10) {
                this.ySpeed -= 5;
            }
            if (!this.xSpeed < 10) {
                this.xSpeed -= 5;
            }
            this.playerScale = new Vector(this.xScale, this.yScale)
            this.scale = this.playerScale;
            this.score++
            this.game.scoreLabel.text = 'Score: ' + this.score.toString();
            this.spawnBlood(game);
        }
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        this.pos.x = clamp(this.pos.x, 0, 1024)
        this.pos.y = clamp(this.pos.y, 0, 720)

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -this.ySpeed * 0.8;
            this.graphics.flipVertical = false;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = this.ySpeed * 1.3;
            this.graphics.flipVertical = true;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.xSpeed;
            this.graphics.flipHorizontal = true;

        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.xSpeed;
            this.graphics.flipHorizontal = false;

        }

        this.vel = new Vector(xspeed, yspeed);
        // this.graphics.flipHorizontal = (this.vel.x > 0)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log("shoot!")
        }
    }

    spawnBlood(game) {
        let emitter = new ParticleEmitter(0, 0, 2, 2);
        emitter.pos = this.pos.clone(); // Clone the player's position vector
        emitter.radius = 5;
        emitter.minVel = 100;
        emitter.maxVel = 200;
        emitter.minAngle = 0;
        emitter.maxAngle = 6.2;
        emitter.isEmitting = true;
        emitter.emitRate = 300;
        emitter.opacity = 0.5;
        emitter.fadeFlag = true;
        emitter.particleLife = 2352;
        emitter.maxSize = 20;
        emitter.minSize = 1;
        emitter.startSize = 0;
        emitter.endSize = 0;
        emitter.acceleration = new Vector(0, 0);
        emitter.beginColor = Color.Red;
        emitter.endColor = Color.Red;
        game.add(emitter);

        setTimeout(() => {
            emitter.kill();
        }, 100);
    }


}
