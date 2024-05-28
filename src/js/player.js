import {
    Actor,
    Engine,
    Vector,
    Keys,
    clamp,
    Color,
    ParticleEmitter,
    SpriteSheet,
    Animation,
    range,
    Timer,
    CollisionType
} from "excalibur";
import {Resources, ResourceLoader} from './resources.js'
import {Tuna} from "./tuna.js"
import {ScaredRadius} from "./scaredRadius.js";
import {Bubbles} from "./bubbles.js";
import {Healthbar} from "./healthBar.js";
import {StaminaBar} from "./staminaBar.js";
import {Fish} from "./fish.js";
import {Coin} from "./coin.js";

export class Player extends Actor {
    score = 0;
    counter = 0;
    playerHealth = 1;
    ySpeed = 80;
    xSpeed = 80;
    speedMultiplier = 1;
    xScale = 0.25;
    yScale = 0.25;
    bubbleOffset = -15;
    fishAmountLimit = 30;
    staminaRegenMultiplier = 2;
    staminaRegenBonusMultiplier = 1;
    staminaSlowdownMultiplier = 1;
    playerScale = new Vector(this.xScale, this.yScale);
    particleOn = false;
    fishSpawn = true;
    stamina = true
    fishCollection = [];
    running = null;
    scaredRadius;
    game;
    scene;

    constructor(game, scene) {
        super({
            width: 380, height: 200, collisionType: CollisionType.Active
        });
        this.game = game
        this.scene = scene
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        console.log('player init')
        // ANIMATION
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.SharkAnim, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 4,
                rows: 1,
                spriteWidth: 240,
                spriteHeight: 432
            },
        });
        this.Animation = Animation.fromSpriteSheet(spriteSheet, range(0, 3), 100);
        this.graphics.use(this.Animation);
        this.z = 1;
        // COLLISION EVENT
        this.on('collisionstart', (event) => this.hitSomething(event, this.game))
        // TIMER FOR SPAWNING THE BUBBLES
        const timer = new Timer({
            fcn: () => this.spawnBubbles(),
            repeats: true,
            interval: 5000,
        })
        engine.currentScene.add(timer)
        timer.start()
        // SET INITIAL POSITION, SCALE AND SPEED
        this.pos = new Vector(1550, 400);
        this.vel = new Vector(0, 0);
        this.scale = this.playerScale;
        // SET UP COLLIDER

        this.collider.useBoxCollider(
            70,
            70,
            new Vector (0,0),
            new Vector (-100,0)
        )

        // ADD HEALTHBAR
        this.healthbar = new Healthbar(this.game);
        this.addChild(this.healthbar);
        this.healthbar.pos = new Vector(-100,-120);
        // ADD STAMINABAR
        this.staminabar = new StaminaBar();
        this.addChild(this.staminabar);
        this.staminabar.pos = new Vector(-100,-100);
        // ADD SCARED RADIUS
         this.scaredRadius = new ScaredRadius(this.pos.x -1550, this.pos.y - 400, 0)
        this.addChild(this.scaredRadius)
        console.log('player complete init')
    }

    spawnBubbles(){
        const bubble = new Bubbles(this.pos.x + this.bubbleOffset,this.pos.y - 15) // - 15 om bubbels boven de haai te zetten
        this.game.add(bubble);
    }

    updateScore(scoreToAdd){
        this.score += scoreToAdd
        this.scene.score.updateScore(this.score)
    }

    updateStats(health, stamina, staminaRegen ,speed, selector){
        if (selector === 0){
            if (this.healthbar.currentHealth < 1){
                this.healthbar.increaseHealth(health)
                console.log('extra health')
                console.log(this.healthbar.currentHealth)
            } else{
                this.updateStats(0,0.1, 0,0, 1)
            }
        } else if (selector === 1){
            if (this.staminaSlowdownMultiplier > 0.3){
                this.staminaSlowdownMultiplier -= stamina
                console.log('extra stamina')
                console.log(this.staminaSlowdownMultiplier)
            } else{
                this.updateStats(0,0, 0.5,0, 2)
            }
        } else if (selector === 2){
            if (this.staminaRegenBonusMultiplier < 9){
                this.staminaRegenBonusMultiplier += staminaRegen
                console.log('extra stamina regen')
                console.log(this.staminaRegenBonusMultiplier)
            } else{
                this.updateStats(0,0, 0,0.5, 3)
            }

        } else if (selector === 3){
            if (this.speedMultiplier < 3){
                this.speedMultiplier += speed
                console.log('extra speed')
                console.log(this.staminaRegenBonusMultiplier)
            } else{
                console.log('nothing else to upgrade!')
            }
        }
    }

    hitSomething(event, game) {
        if (event.other instanceof Fish && this.pos.y < 850) {
            if(event.other.randomScale * 48 < this.yScale * 75){
                //console.log('this fish is smaller!')
                // kill fish
                event.other.kill();
                //increase shark size
                this.xScale += 0.01 + (event.other.randomScale/100)
                this.yScale += 0.01 + (event.other.randomScale/100)
                //increase shark speed
                /*
                if (!this.ySpeed > 120) {
                    this.ySpeed += 0.5;
                }
                if (!this.xSpeed > 120) {
                    this.xSpeed += 0.5;
                }
                 */
                // decrease the camera zoom
                //this.scene.zoomUpdate();
                if (this.healthbar.currentHealth < 0.8){
                    this.healthbar.increaseHealth(0.1);
                }

                if (this.scene.camera.zoom > 1){
                    this.scene.camera.zoom -= 0.01;
                }

                // check if fish are allowed to spawn again
                this.fishCheck();

                this.playerScale = new Vector(this.xScale, this.yScale)
                this.updateScore(event.other.score)
                //this.children[0].text = 'Score: ' + this.score.toString();
                // this.game.scoreLabel.text =
                //this.children[0].pos.y += 0.01;
                this.spawnBlood(game, event.other.pos.x, event.other.pos.y);
            }else{
                // console.log('this fish is bigger')
                this.playerHealth -= 0.01;
                this.healthbar.reduceHealth(0.01)
                this.vel.x *= -1
                this.vel.y *= -1
                this.scene.shakeCam();
            }
        }
    }

    fishCheck(){
        if (this.fishCollection.length < this.fishAmountLimit){
            this.fishSpawn = true;
        }
    }

    onPreUpdate(engine) {
        //stupid fix for shark hiding
        if (this.pos.y > 850){
            //console.log('in the safe zone')
            this.scaredRadius.body.collisionType = CollisionType.PreventCollision
        } else{
            this.scaredRadius.body.collisionType = CollisionType.Passive
        }

        if (!(
            engine.input.keyboard.isHeld(Keys.W) ||
            engine.input.keyboard.isHeld(Keys.A) ||
            engine.input.keyboard.isHeld(Keys.S) ||
            engine.input.keyboard.isHeld(Keys.D) ||
            engine.input.keyboard.isHeld(Keys.Up) ||
            engine.input.keyboard.isHeld(Keys.Left) ||
            engine.input.keyboard.isHeld(Keys.Down) ||
            engine.input.keyboard.isHeld(Keys.Right)
        ))
        {
            this.graphics.use(Resources.SharkStill.toSprite());
        } else{
            this.graphics.use(this.Animation);
        }

        let xspeed = 0;
        let yspeed = 0;
        this.pos.x = clamp(this.pos.x, 0, 3040)
        this.pos.y = clamp(this.pos.y, 0, 960)

        if (engine.input.keyboard.isHeld(Keys.ShiftLeft) && this.stamina === true && (this.vel.x !== 0 || this.vel.y !== 0)) {
            if(this.staminabar.currentStamina <= 0){
                this.stamina = false;
                this.staminaRegenMultiplier = 8;
                //console.log('no stamina anymore')
                //console.log(this.stamina)
            } else{
                this.running = 2;
                //this.scene.staminabar.reduceStamina(0.005);
                //console.log(this.children[1].currentStamina)
                this.staminabar.reduceStamina(0.005 * this.staminaSlowdownMultiplier)
            }
        } else{
            this.running = 1;
            //this.scene.staminabar.increaseStamina(0.0005);
            this.staminabar.increaseStamina(0.0008 * this.staminaRegenMultiplier * this.staminaRegenBonusMultiplier)

            if (this.staminabar.currentStamina >= 0.5){
                this.stamina = true;
                this.staminaRegenMultiplier = 2;
            }

        }

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -this.ySpeed * 0.8 * this.running * this.speedMultiplier;
            if (this.running > 1){
                //this.spawnSpeedBubbles(this.game, this.pos.x,this.pos.y, 0, -1000)
                this.particleOn = true
            }
            //this.actions.rotateTo(Math.PI / 2, Math.PI, RotationType.Clockwise);
            //this.graphics.flipVertical = false;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = this.ySpeed * 1.3 * this.running * this.speedMultiplier;
            if (this.running > 1){
                //this.spawnSpeedBubbles(this.game, this.pos.x,this.pos.y, 0, 1000)
                this.particleOn = true
            }
            //this.graphics.flipVertical = true;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.xSpeed * this.running * this.speedMultiplier;
            this.graphics.flipHorizontal = true;

            this.collider.useBoxCollider(
                70,
                70,
                new Vector (0,0),
                new Vector (40,0)
            )

            this.bubbleOffset = 20;

            if (this.running > 1){
                this.spawnSpeedBubbles(this.game, this.pos.x - 25,this.pos.y + 2, -1000, 0)
                this.particleOn = true
            }
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.xSpeed * this.running * this.speedMultiplier;
            this.graphics.flipHorizontal = false;

            this.collider.useBoxCollider(
                70,
                70,
                new Vector (0,0),
                new Vector (-100,0)
            )

            this.bubbleOffset = -20;

            if (this.running > 1){
                if (this.running > 1){
                    this.spawnSpeedBubbles(this.game, this.pos.x + 25,this.pos.y + 2, 1000, 0)
                }
                this.particleOn = true
            }
        }

        this.vel = new Vector(xspeed, yspeed);
        // this.graphics.flipHorizontal = (this.vel.x > 0)
    }

    spawnBlood(game, x, y) {
        let emitter = new ParticleEmitter(0, 0, 2, 2);
        emitter.pos = new Vector(x, y); //this.pos.clone(); // Clone the player's position vector
        emitter.radius = 5;
        emitter.minVel = 100;
        emitter.maxVel = 200;
        emitter.minAngle = 0;
        emitter.maxAngle = 6.2;
        emitter.isEmitting = true;
        emitter.emitRate = 1000;
        emitter.opacity = 0.8;
        emitter.fadeFlag = true;
        emitter.particleLife = 3000;
        emitter.maxSize = 5;
        emitter.minSize = 1;
        emitter.startSize = 0;
        emitter.endSize = 0;
        emitter.acceleration = new Vector(0, 0);
        emitter.beginColor = Color.Red;
        emitter.endColor = Color.Red;
        game.add(emitter);

        setTimeout(() => {
            emitter.kill();
        }, 5);
    }

    spawnSpeedBubbles(game, x, y, velX, velY){
        let emitter = new ParticleEmitter(0,0,0,2);
        //emitter.emitterType = ex.EmitterType.Rectangle;
        emitter.pos = new Vector(x, y); //this.pos.clone(); // Clone the player's position vector
        emitter.radius = 5;
        emitter.minVel = 50;
        emitter.maxVel = 100;
        emitter.minAngle = -1;
        emitter.maxAngle = 1;
        emitter.isEmitting = true;
        emitter.emitRate = 50;
        emitter.opacity = 0.5;
        emitter.fadeFlag = true;
        emitter.particleLife = 1000;
        emitter.maxSize = 10;
        emitter.minSize = 1;
        emitter.startSize = 0;
        emitter.endSize = 0;
        emitter.acceleration = new Vector(velX, velY);
        emitter.beginColor = Color.Cyan;
        emitter.endColor = Color.Blue;
        game.add(emitter);
        setTimeout(() => {
            //console.log('clearing')
            emitter.clearParticles();
            emitter.kill();
        }, 1);
    }



}
