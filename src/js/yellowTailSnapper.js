import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class YellowTailSnapper extends Fish {
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
        this.maxScale = 1.0
        this.minScale = 0.5
        this.sprite = Resources.YellowTailSnapper.toSprite();
        this.speedX = randomInRange(50,100);
        this.score = 125
        this.game = game;
        this.yPosVar = y;
        this.xPosVar = x;
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
        this.z = 0

    }
}
