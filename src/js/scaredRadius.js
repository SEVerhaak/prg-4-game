import {Actor, CollisionType, Color, range, Vector} from 'excalibur';
import {Player} from "./player.js";
import {Tuna} from "./tuna.js";
import {Fish} from "./fish.js";

export class ScaredRadius extends Actor {
    working = true;
    test = this.working;

    constructor(x, y, radius) {
        super({
            pos: new Vector(x, y),
            color: Color.Transparent,
            width: 700,
            height: 700,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        this.z = 3;
        super.onInitialize(engine);
        this.scale = new Vector(1,1)
        // Set up collision event listener
        this.on('collisionstart', this.scaredHit);
        console.log('scared radius loaded')
    }

    scaredHit(event) {
        // Check if the collision involves another actor
        if (event.other instanceof Fish) {
            if(event.other.runningAway !== true ){
                // Handle the scared hit event
                //console.log('Scared hit with actor:', event.other.vel.x);
                event.other.vel.x = event.other.vel.x * -1;
                event.other.graphics.flipHorizontal = !event.other.graphics.flipHorizontal
                event.other.runningAway = true;
            }
        }
    }
    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        //console.log(this.parent.scaredRadius);
        //console.log(this.working)
    }

    testFunc(){

    }
}