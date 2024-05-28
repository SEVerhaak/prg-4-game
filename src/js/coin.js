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

export class Coin extends Actor {
    x
    y
    counter

    constructor(x,y) {
        super({ width: 16, height: 16, collisionType: CollisionType.Passive});
        this.x = x;
        this.y = y;
    }

    onInitialize(engine) {
        // Define the sprite sheet
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.BigCoin, // BubbleImage should be an instance of the image resource
            grid: {
                columns: 8,
                rows: 1,
                spriteWidth: 16,
                spriteHeight: 16
            },
        });

        this.Animation = Animation.fromSpriteSheet(spriteSheet, range(0, 7), 100, AnimationStrategy.Loop);
        this.graphics.use(this.Animation);

        this.pos.y = this.y;
        this.pos.x = this.x;

        this.z = 3;
        this.scale = new Vector(1,1);
        this.vel.y = 50;

        this.on('collisionstart', (evt) => this.handleCollision(evt));
    }


    handleCollision(evt) {
        // Example: Log the collision
        if (evt.other instanceof Player){
            console.log(`Coin collided with ${evt.other.constructor.name}`);
            this.kill();
            evt.other.updateScore(500)
            evt.other.updateStats(0.25, 0.1, 0.5, 0.2, randomIntInRange(0, 3))
        }
        // Example: Remove the coin on collision
        // You can add other collision logic here
    }


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        this.counter++
        if (this.counter > 10 && this.vel.y > 15){
            this.vel.y *= 0.99
            this.counter = 0;
        }
    }
}
