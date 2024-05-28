import {Scene, Label, TextAlign, Color, Vector, Input, Font, Sprite, Actor} from 'excalibur';
import {Resources, ResourceLoader} from './resources.js'
export class IntroScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
        // Add scene initialization code here
    }

    onInitialize() {
        // Add event listener to transition to main game scene
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space && this.game.currentScene.name !== 'mainlevel') {
                this.game.loadMainScene();
                this.game.goToMainScene();
            }
        });

        const splashScreenActor = new Actor({
            pos: new Vector(this.game.drawWidth / 2, this.game.drawHeight / 2),
            width: Resources.SplashScreen.width,
            height: Resources.SplashScreen.height
        });

        splashScreenActor.graphics.use(Resources.SplashScreen.toSprite());

        splashScreenActor.anchor.setTo(0.5, 0.5);

        splashScreenActor.scale = new Vector(0.75, 0.75)

        this.add(splashScreenActor);
    }
}