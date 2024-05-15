import '../css/style.css'
import {Actor, Font, Engine, Vector, Label, ParticleEmitter, Color} from "excalibur"
import {Resources, ResourceLoader} from './resources.js'
import {Player} from './player.js'
import {Food} from './food.js'
import {BadFood} from './badFood.js'
export class Game extends Engine {
    count = 0;

    constructor() {
        super({width: 1024, height: 720})
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize(engine) {
        console.log("initializing game");
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector((this.drawWidth / 2) - 75, 25),
            font: new Font({size: 30}),
        });
        this.add(this.scoreLabel);
    }

    startGame() {
        console.log("start de game!")
        const player = new Player(this)
        this.add(player);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        this.count++
        if(this.count === 150){
            this.spawnFood();
            console.log('test?')
            this.count = 0;
        }
    }

    spawnFood(){
        const food  = new Food()
        this.add(food);
    }

    addBlood(blood){
        this.add(blood);
    }

}


new Game()
