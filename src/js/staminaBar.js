import {Actor, Color, Vector, ScreenElement, CollisionType} from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class StaminaBar extends ScreenElement {

    staminaBar
    currentStamina
    background

    onInitialize(engine) {
        console.log('im here!')
        this.currentStamina = 1;
        this.background = new Actor({ x: 0, y: 0, color: Color.fromRGB(255, 255, 255, 0.4), width: 200, height: 5, anchor: Vector.Zero})
        this.background.z = 3
        this.addChild(this.background)

        this.staminaBar = new Actor({ x: 0, y: 0, color: Color.Blue, width: 200, height: 5, anchor: Vector.Zero })
        this.addChild(this.staminaBar)
        this.staminaBar.z = 3
        this.z = 3

        this.body.collisionType = CollisionType.PreventCollision
        this.staminaBar.body.collisionType = CollisionType.PreventCollision
        this.background.body.collisionType = CollisionType.PreventCollision
    }

    reduceStamina(amount) {
        if (this.currentStamina <= 0){
            // player no more stamina
        }else{
            this.staminaBar.scale = new Vector(this.currentStamina - amount, 1) // de health is nu 50%
            this.currentStamina = this.currentStamina - amount
            if (this.currentStamina > 0){
                // player also no more stamina
            }
        }
    }

    increaseStamina(amount){
        if (this.currentStamina >= 1){
            // player no more stamina
        }else{
            this.staminaBar.scale = new Vector((this.currentStamina + amount), 1) // de health is nu 50%
            this.currentStamina = this.currentStamina + amount
            if (this.currentStamina >= 1){
                // player also no more stamina
            }
        }
    }
}