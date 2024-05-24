import { Scene, Label, TextAlign, Color, Vector, Input, Font } from 'excalibur';

export class IntroScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
        // Add scene initialization code here
    }

    onInitialize() {
        // Add event listener to transition to main game scene
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space) {
                this.game.goToMainScene();
            }
        });

        // Display instructions
        const instructions = new Label({
            text: 'Vang zo veel mogelijk vissen binnen de tijd als hongerige haai! \nGebruik de pijltes toetsen om te bewegen en shift om te sprinten!\nDruk op spatie om verder te gaan!',
            font: new Font({
                size: 23,  // Set font size here
                family: 'Arial',
                textAlign: TextAlign.Center
            }),
            textAlign: TextAlign.Center,
            pos: new Vector((this.game.drawWidth / 2), this.game.drawHeight / 2),
            color: Color.White,
        });
        this.add(instructions);
    }
}