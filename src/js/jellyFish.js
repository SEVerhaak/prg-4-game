import {
    Actor,
    Engine,
    Vector,
    SpriteSheet,
    Animation,
    Loader,
    range,
    ImageSource,
    AnimationStrategy,
    CollisionType, Timer, randomInRange, randomIntInRange
} from "excalibur";
import {Resources} from "./resources.js";
import {Fish} from "./fish.js";
import {Player} from "./player.js";

export class JellyFish extends Actor {
    x
    y
    counter
    originalY; // Store the original Y position
    direction = 1; // Start moving downwards
    speed = 0.01; // Movement speed
    random = 40

    constructor(x,y) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.x = x;
        this.y = y;
        this.originalY = this.y
    }

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onInitialize(engine) {
        if (this.getRandomNumber(0,1) > 0){
            this.direction *= -1
        }
        // Define the sprite sheet
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.JellyFish, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 4,
                rows: 2,
                spriteWidth: 32,
                spriteHeight: 16
            },
        });
        const selectedRow = this.getRandomNumber(0,1)

        this.Animation = Animation.fromSpriteSheet(spriteSheet, range(selectedRow * 4, selectedRow * 4 + 3), 100, AnimationStrategy.Loop);


        this.graphics.use(this.Animation);

        this.pos.y = this.y;
        this.pos.x = this.x;
        this.vel.y = 0

        this.z = 3;
        this.scale = new Vector(1,1);
        this.rotation = -(Math.PI / 2);


        this.on('precollision', (evt) => this.handleCollision(evt));
    }

    onPostUpdate(engine, delta) {
        super.onPostUpdate(engine, delta);

        this.pos.y += this.speed * this.direction * delta;

        if (this.pos.y <= this.originalY - this.random) { // Move 10 pixels below original position
            this.direction = 1; // Move downwards
        } else if (this.pos.y >= this.originalY + this.random) { // Move 10 pixels above original position
            this.direction = -1; // Move upwards
        }
    }


    handleCollision(evt) {
        // Example: Log the collision
        if (evt.other instanceof Player){
            evt.other.healthbar.reduceHealth(0.008)
            evt.other.scene.shakeCam();
        }
        // Example: Remove the coin on collision
        // You can add other collision logic here
    }
}
