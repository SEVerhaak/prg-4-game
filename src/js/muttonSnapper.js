import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class MuttonSnapper extends Fish {
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
        this.maxScale = 0.8
        this.minScale = 0.5
        this.sprite = Resources.MuttonSnapper.toSprite();
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
