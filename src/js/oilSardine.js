import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class OilSardine extends Fish {
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
        this.maxScale = 0.35
        this.minScale = 0.1
        this.sprite = Resources.OilSardine.toSprite();
        this.speedX = randomInRange(50,120);
        this.score = 20;
        this.game = game;
        this.yPosVar = y;
        this.xPosVar = x;
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
        this.z = 0

    }
}
