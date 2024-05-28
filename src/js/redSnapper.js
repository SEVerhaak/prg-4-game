import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class RedSnapper extends Fish {
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
        this.maxScale = 0.60
        this.minScale = 0.25
        this.sprite = Resources.RedSnapper.toSprite();
        this.speedX = randomInRange(50,100);
        this.score = 100
        this.game = game;
        this.yPosVar = y;
        this.xPosVar = x;
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
        this.z = 0

    }
}
