import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Player} from "./player.js";
export class Fish extends Actor {
    game
    minScale = 0;
    maxScale = 0;
    randomScale = 0;
    sprite
    xPosVar
    yPosVar
    randomY
    randomX
    speedX
    speedY
    counter = 0
    runningAway

    constructor(game, x, y) {
        super({
            width: 69,
            height: 48,
            collisionType: CollisionType.Passive
            });
        this.game = game;
        this.yPosVar = y;
        this.xPosVar = x;
    }

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onInitialize(engine) {
        this.randomScale = randomInRange(this.minScale, this.maxScale);
        this.scale = new Vector(this.randomScale, this.randomScale);
        this.z = 3;
        super.onInitialize(engine);
        this.on('collisionstart', (event) => this.scaredHit(event))
        //console.log('player coordinates within fish')
        //console.log('x: ' + this.xPosVar, 'y: ' + this.yPosVar)
        //this.sprite = Resources.Tuna.toSprite();
        this.graphics.use(this.sprite);
        this.randomX = Math.floor(randomInRange(0,3020));
        this.randomY = Math.floor(randomInRange(0,960));
        //console.log('Random coordinates')
        //console.log('x: ' + this.randomX + 'y: ' + this.randomY)
        if ((this.xPosVar + 512) > this.randomX ){
            this.randomX += this.randomX + (this.xPosVar-this.randomX)
            //console.log('within positive x')
        } else if ((this.xPosVar - 512) > this.randomX){
            this.randomX -= this.randomX + (this.randomX - this.xPosVar)
            //console.log('within negative x')
        }
        //console.log('Random corrected coordinates')
        //console.log('x: ' + this.randomX + 'y: ' + this.randomY)
        this.pos = new Vector(this.randomX, this.randomY);
        //console.log('Fish position')
        //console.log('x: ' + this.pos.x + 'y: ' + this.pos.y)
        this.vel = new Vector(0, 0);
        if (Math.random() > 0.5){
            this.speedX = this.getRandomNumber(50,150);
            this.vel.x = this.speedX
        } else {
            this.speedX = this.getRandomNumber(-150,-50);
            this.vel.x = this.speedX
            this.graphics.flipHorizontal = true;
        }
    }

    update(engine, delta) {
        // Custom update here
        super.update(engine, delta);
        this.counter++
        if (this.counter === 20){
            this.speedY = randomInRange(-50, 50);
            this.vel.y = this.speedY;
            this.counter = 0;
        }
        //this.vel.x = this.speedX;
        // Custom update here
        if (this.pos.x > 3100) {
            this.pos.x = -50;
            this.runningAway = false;
        }
        if (this.pos.x < -50) {
            this.pos.x = 3100;
            this.runningAway = false;
        }
        if (this.pos.y < -50) {
            this.pos.y = 1400
            this.runningAway = false;
        }
        if (this.pos.y > 1050) {
            this.kill();
        }
    }

    onPostKill(scene) {
        super.onPostKill(scene);
    }

    scaredHit(event){
        if (event.other instanceof Player){
            console.log(event.other)
        }
    }

}
