import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class SpanishMackeral extends Fish {
    randomScale
    maxScale
    minScale
    sprite
    speedX
    score
    xPosVar
    yPosVar
    windowWidth
    windowHeight
    constructor(game, x, y, windowWidth, windowHeight) {
        super({});
        this.maxScale = 0.50
        this.minScale = 0.15
        this.sprite = Resources.Mackeral.toSprite();
        this.speedX = randomInRange(90,160);
        this.score = 200;
        this.game = game;
        this.yPosVar = y;
        this.xPosVar = x;
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
        this.z = 0

    }
}
