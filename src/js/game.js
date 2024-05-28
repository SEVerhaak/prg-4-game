import '../css/style.css'
import {Engine} from "excalibur"
import {Resources, ResourceLoader} from './resources.js'
import {Mainlevel} from "./mainlevel.js";
import {TiledResource} from "@excaliburjs/plugin-tiled";
import {IntroScene} from "./intro.js";
import {GameOverScene} from "./gameOver.js";


export class Game extends Engine {

    mainLevel
    introLevel
    gameOver
    constructor() {
        super({width: window.innerWidth, height: window.innerHeight, antialiasing: false, maxFps: 60, suppressPlayButton: true})
        this.start(ResourceLoader).then(() => this.startGame())
    }

    onInitialize(engine) {
        console.log("initializing game");
        this.introLevel = new IntroScene(this);
        this.add('intro', this.introLevel);
        //this.showDebug(true);
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

    loadMainScene(){
        this.mainLevel = new Mainlevel(this, window.innerWidth, window.innerHeight);
        this.add('mainlevel', this.mainLevel);
        //this.goToScene('mainlevel');
    }

    goToMainScene(){
        this.goToScene('mainlevel');
    }

    removeMainScene(){
        this.remove('mainlevel')
    }

    gameOverScene(){
        this.gameOver = new GameOverScene(this, this.mainLevel.getScore());
        this.add('gameover', this.gameOver);
        this.goToScene('gameover');
        //this.remove('mainlevel');
    }

}

new Game()