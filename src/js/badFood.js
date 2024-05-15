import {Actor, Color, ParticleEmitter, Vector} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Game} from './game.js'
import {Food} from './food.js'

export class BadFood extends Actor {
    game
    constructor(game) {
        super({width: 1920 * 0.1, height: 1920 * 0.1 });
        this.game = game;
    }

    getRandomNumber(min, max) {
        // Ensure that min and max are integers
        min = Math.ceil(min);
        max = Math.floor(max);

        // Generate a random number within the range [min, max]
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.graphics.use(Resources.Food.toSprite());
        this.pos = new Vector(this.getRandomNumber(500,500), this.getRandomNumber(0,0));
        this.scale = new Vector(0.04, 0.04);
        this.vel = new Vector(0, 0);
    }

    update(engine, delta) {
        // Custom update here
        super.update(engine, delta);
        this.vel.x = 0;
        this.vel.y = 10 * 0.8 * delta;

        if (this.pos.x > 1100) {
            this.pos.x = -50;
        }
        if (this.pos.x < -50) {
            this.pos.x = 1100;
        }
        if (this.pos.y < -50) {
            this.pos.y = 800
            // this.kill();
        }
        if (this.pos.y > 800) {
            this.pos.y = -50
            this.kill();
        }
        // Custom update here
    }

    onPostKill(scene) {
        super.onPostKill(scene);
    }

}
