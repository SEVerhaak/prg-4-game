import {Actor, Engine, Screen, Vector, Keys, randomInRange, Color, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import {Fish} from "./fish.js";
export class Tuna extends Fish {
    randomScale
    maxScale
    minScale
    sprite
    constructor(game, x, y) {
        super({});
        this.maxScale = 1.0
        this.minScale = 0.35
        this.sprite = Resources.Tuna.toSprite();
    }
}
