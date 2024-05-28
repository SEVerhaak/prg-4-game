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
import {JellyFish} from "./jellyFish.js";
import {Tuna} from "./tuna.js";
import {Coin} from "./coin.js";
import {Sardine} from "./sardine.js";
import {OilSardine} from "./oilSardine.js";
import {BlackSnapper} from "./blackSnapper.js";
import {MuttonSnapper} from "./muttonSnapper.js";
import {RedSnapper} from "./redSnapper.js";
import {SpanishMackeral} from "./spanishMackeral.js";
import {YellowTailSnapper} from "./yellowTailSnapper.js";
import {YellowTang} from "./yellowTang.js";


export class Mainlevel extends Scene {
    game
    score
    player
    jellyfish
    zoom = 2;
    fishAmountLimit = 30;
    fishSpawn = true;
    fishCollection = [];
    fishArray = [];
    fishTypes = [];
    jellyHeightArray = []
    windowWidth;
    windowHeight;

    constructor(game, windowWidth, windowHeight) {
        super()
        this.game = game
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight

        for (let i = 0; i < 30; i++) {
            const min = Math.ceil(10);
            const max = Math.floor(750);
            const random =  Math.floor(Math.random() * (max - min + 1)) + min;
            this.jellyHeightArray.push(random)
        }
    }

    onInitialize(engine) {
        console.log('mainlevel loaded!')
        this.score = new Score()
        this.add(this.score);

        this.player = new Player(this.game, this)
        this.add(this.player);

        for (let i = 0; i < 30; i++) {
            if (i !== 15 || i !== 16){
                const random1 = randomIntInRange(0, 50)
                this.jellyfish = new JellyFish((100 * i) + random1, this.jellyHeightArray[i])
                this.add(this.jellyfish);
            }
        }
        engine.currentScene.camera.strategy.lockToActor(this.player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3040, 960)); // Set the game bounds
        engine.currentScene.camera.zoom = this.zoom;
    }

    shakeCam(){
        console.log('screen shake activated')
        this.engine.currentScene.camera.shake(4,4,500);
    }

    onActivate(context) {
        this.fishTypes.push(Tuna, Sardine, OilSardine, BlackSnapper, MuttonSnapper, RedSnapper, YellowTailSnapper, SpanishMackeral, YellowTang)
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
            interval: 10000,
        })
        this.add(coinTimer)
        coinTimer.start()
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }

    getScore(){
        console.log('score returned')
        return this.player.score
    }

    spawnFish() {
        console.log('spawned fish')
        if(this.fishSpawn){
            this.fishArray = [];
            /*
            // add to fish array
            const fish = new Tuna(this.game, randomInRange(0,3000), randomInRange(0,900))
            const sardine = new Sardine(this.game, randomInRange(0,3000), randomInRange(0,900))
            const oilSardine = new OilSardine(this.game, randomInRange(0,3000), randomInRange(0,900))
            const blackSnapper = new BlackSnapper(this.game, randomInRange(0,3000), randomInRange(0,900))
            const muttonSnapper = new MuttonSnapper(this.game, randomInRange(0,3000), randomInRange(0,900))
            const redSnapper = new RedSnapper(this.game, randomInRange(0,3000), randomInRange(0,900))
            const yellowTailSnapper = new YellowTailSnapper(this.game, randomInRange(0,3000), randomInRange(0,900))
            const mackeral = new SpanishMackeral(this.game, randomInRange(0,3000), randomInRange(0,900))
            const yellowTang = new YellowTang(this.game, randomInRange(0,3000), randomInRange(0,900))
            this.fishArray.push(fish, sardine, oilSardine, blackSnapper, muttonSnapper, redSnapper, yellowTailSnapper, mackeral, yellowTang)
             */
            const random = randomIntInRange(0,this.fishTypes.length - 1);

            //const fishToSpawn = new this.fishTypes[random](this.game, randomInRange(0,3000), randomInRange(0,900))
            const fishToSpawn = new this.fishTypes[random](this.game, this.player.pos.x , this.player.pos.y, this.windowWidth, this.windowHeight)

            //console.log(random)
            //this.add(sardine)
            //this.add(this.fishArray[random]);
            this.add(fishToSpawn);
            //console.log(this.fishArray[random])
            this.fishCollection.push(this.fishArray[random]);
            if (this.fishCollection.length > this.fishAmountLimit){
                this.fishSpawn = false;
            }
        }
    }

    coinSpawner(){
        console.log('coin spawned')
        const coin = new Coin(randomInRange(10,3000), 10)
        this.game.add(coin);
    }

}


//new Game()
