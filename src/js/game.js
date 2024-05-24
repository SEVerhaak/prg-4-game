import '../css/style.css'
import {Actor, Font, Engine, Vector, Label, SpriteSheet, BoundingBox, Loader} from "excalibur"
import {Resources, ResourceLoader} from './resources.js'
import {Mainlevel} from "./mainlevel.js";
import {Player} from "./player.js";
import {Healthbar} from "./healthBar.js";
import {StaminaBar} from "./staminaBar.js";
import {TiledResource} from "@excaliburjs/plugin-tiled";
import {Tuna} from "./tuna.js";
import {IntroScene} from "./intro.js";


export class Game extends Engine {

    mainlevel
    constructor() {
        super({width: 1024, height: 720, antialiasing: false, maxFps: 60})
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize(engine) {
        console.log("initializing game");
        this.introLevel = new IntroScene(this);
        this.add('intro', this.introLevel);
        this.showDebug(true);
    }

    startGame() {
        // end of tilemap bs
        console.log("start de game!")
        this.goToScene('intro');

        // old way to load map
        /*
        const tiledMapResource = new TiledResource('/src/assets/tileMap/map_good.tmx');
        const loader = new Loader([tiledMapResource])
        this.start(loader).then(() => {
            tiledMapResource.addToScene(this.currentScene);
        });
         */
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }

    spawnFish(x, y) {
        const tuna = new Tuna(this, x, y)
        this.add(tuna);
    }

    goToMainScene(){
        this.mainlevel = new Mainlevel(this);
        this.add('mainlevel', this.mainlevel);
        this.goToScene('mainlevel');
    }
}

new Game()