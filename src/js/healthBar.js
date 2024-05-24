import {Actor, Color, Vector, ScreenElement, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Healthbar extends ScreenElement {

    healthbar
    currentHealth
    background


    onInitialize(engine) {
        console.log('im somewhere in this bs scene')
        this.currentHealth = 1;
        this.background = new Actor({ x: 0, y: 0, color: Color.fromRGB(255, 255, 255, 0.4), width: 200, height: 5, anchor: Vector.Zero})
        this.background.z = 3
        this.addChild(this.background)

        this.healthbar = new Actor({ x: 0, y: 0, color: Color.Green, width: 200, height: 5, anchor: Vector.Zero })
        this.addChild(this.healthbar)
        this.healthbar.z = 3


        this.body.collisionType = CollisionType.PreventCollision
        this.healthbar.body.collisionType = CollisionType.PreventCollision
        this.background.body.collisionType = CollisionType.PreventCollision
    }

    reduceHealth(amount) {
        if (this.currentHealth <= 0){
            // player dead
        }else{
            this.healthbar.scale = new Vector(this.currentHealth - amount, 1) // de health is nu 50%
            this.currentHealth = this.currentHealth - amount
            if (this.currentHealth > 0){
                // player also dead
            }
        }

    }
}