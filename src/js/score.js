import {Font, Label, ScreenElement, Vector} from "excalibur";
import {Resources} from "./resources.js";

export class Score extends ScreenElement {

    scoreText

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(40 , 40),
            font: new Font({size: 20}),
        })
        this.addChild(this.scoreText)
        this.scoreText.z = 3;
        this.z = 3;
    }

    updateScore(newScore) {
        this.scoreText.text = `Score: ` + newScore
    }
}