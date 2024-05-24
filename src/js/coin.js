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
    CollisionType, Timer, randomInRange
} from "excalibur";
import {Resources} from "./resources.js";

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

    }

    slowDownCoin(){
        this.vel.y *= 0.95
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        this.counter++
        if (this.counter > 10 && this.vel.y > 15){
            this.vel.y *= 0.999
        }
    }
}
