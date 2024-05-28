import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class BlackSnapper extends Fish {
    randomScale
    maxScale
    minScale
    sprite
    speedX
    score
    game
    xPosVar
    yPosVar
    windowWidth
    windowHeight

    constructor(game, x, y, windowWidth, windowHeight) {
        super({});
        this.maxScale = 0.8
        this.minScale = 0.3
        this.sprite = Resources.BlackSnapper.toSprite();
        this.speedX = randomInRange(100,110);
        this.score = 150
        this.game = game;
        this.yPosVar = y;
        this.xPosVar = x;
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
        this.z = 0
    }
}
