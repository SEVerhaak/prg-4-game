import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class Sardine extends Fish {
    randomScale
    maxScale
    minScale
    sprite
    constructor(game, x, y) {
        super({});
        this.maxScale = 0.2
        this.minScale = 0.07
        this.sprite = Resources.Sardine.toSprite();
    }
}
