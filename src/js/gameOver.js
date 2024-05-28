import {Scene, Label, TextAlign, Color, Vector, Input, Font, Actor} from 'excalibur';
import {Resources} from "./resources.js";

export class GameOverScene extends Scene {
    game
    score
    constructor(game, score) {
        super();
        this.game = game;
        this.score = score;
        // Add scene initialization code here
    }

    onInitialize() {
        // Add event listener to transition to main game scene
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space && this.game.currentScene.name !== 'mainlevel') {
                this.game.removeMainScene();
                this.game.loadMainScene();
            }
        });
        const splashScreenActor = new Actor({
            pos: new Vector(this.game.drawWidth / 2, this.game.drawHeight / 2),
            width: Resources.SplashScreen.width,
            height: Resources.SplashScreen.height
        });

        splashScreenActor.graphics.use(Resources.GameOver.toSprite());

        splashScreenActor.anchor.setTo(0.5, 0.5);

        splashScreenActor.scale = new Vector(0.75, 0.75)

        this.add(splashScreenActor);

        // Display instructions
        const instructions = new Label({
            text: 'Score: ' + this.score,
            font: new Font({
                size: 30,  // Set font size here
                family: 'Arial',
                textAlign: TextAlign.Center
            }),
            textAlign: TextAlign.Center,
            pos: new Vector((this.game.drawWidth / 2), this.game.drawHeight / 2.5),
            color: Color.White,
        });
        this.add(instructions);

    }
}