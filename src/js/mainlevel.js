import '../css/style.css'
import {
    Actor,
    Font,
    Engine,
    Vector,
    Label,
    SpriteSheet,
    BoundingBox,
    Loader,
    Scene,
    Timer,
    randomInRange, Particle, randomIntInRange
} from "excalibur"
import {TiledResource} from "@excaliburjs/plugin-tiled";
import {Resources, ResourceLoader} from './resources.js'
import {Player} from "./player.js";
import {Bubbles} from "./bubbles.js";
import {Score} from "./score.js";
import {Fish} from "./fish.js";
import {Tuna} from "./tuna.js";
import {Coin} from "./coin.js";
import {Sardine} from "./sardine.js";


export class Mainlevel extends Scene {
    game
    zoom = 2;
    fishCollection = [];
    fishSpawn = true;
    fishAmountLimit = 30;
    fishArray = [];

    constructor(game) {
        super()
        this.game = game
    }

    onInitialize(engine) {
        console.log('mainlevel loaded!')
        const score = new Score()
        this.add(score);

        const player = new Player(this.game, this)
        this.add(player);

        engine.currentScene.camera.strategy.lockToActor(player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = this.zoom;
    }

    shakeCam(){
        this.engine.currentScene.camera.shake(4,4,500);
    }

    onActivate(context) {
        super.onActivate(context);
        Resources.Map.addToScene(this)
        const fishTimer = new Timer({
            fcn: () => this.spawnFish(),
            repeats: true,
            interval: 500,
        })
        this.add(fishTimer)
        fishTimer.start()

        this.coinSpawner();

        const coinTimer = new Timer({
            fcn: () => this.coinSpawner(),
            repeats: true,
            interval: 50000,
        })
        this.add(coinTimer)
        coinTimer.start()
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }

    zoomUpdate(){
        console.log('samer ')
        this.camera.zoom = this.zoom - 0.05;
    }

    spawnFish() {
        console.log('spawned fish')
        if(this.fishSpawn){
            this.fishArray = [];
            // add to fish array
            const fish = new Tuna(this.game, randomInRange(0,3000), randomInRange(0,900))
            const sardine = new Sardine(this.game, randomInRange(0,3000), randomInRange(0,900))
            this.fishArray.push(fish, sardine)
            const random = randomIntInRange(0,1);
            //console.log(random)
            //this.add(sardine)
            this.add(this.fishArray[random]);
            //console.log(this.fishArray[random])
            this.fishCollection.push(this.fishArray[random]);
            if (this.fishCollection.length > this.fishAmountLimit){
                this.fishSpawn = false;
            }
        }
    }

    coinSpawner(){
        const coin = new Coin(randomInRange(10,3000), 10)
        this.game.add(coin);
    }

}


//new Game()
