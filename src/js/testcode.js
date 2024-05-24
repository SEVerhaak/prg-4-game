import { Actor, Vector, Keys, CollisionType, SpriteSheet, ImageSource, Animation, range } from "excalibur";

export const AdamImage = new ImageSource('src/assets/tileset/Modern tiles_Free/Characters_free/Adam_run_16x16.png');

export class Player extends Actor {
    score = 0;
    health = 100;
    currentAnimation = null;

    constructor() {
        super({
            width: 16,
            height: 16,
            collisionType: CollisionType.Active
        });
        this.direction = new Vector(0, 0); // Initialize direction vector
    }

    onInitialize(engine) {
        // Define the sprite sheet
        const spriteSheet = SpriteSheet.fromImageSource({
            image: AdamImage,
            grid: {
                rows: 1,
                columns: 24,
                spriteWidth: 16,
                spriteHeight: 32
            },
        });

        // Create animations from the sprite sheet
        this.runAnimationRight = Animation.fromSpriteSheet(spriteSheet, range(0, 5), 100);
        this.runAnimationTop = Animation.fromSpriteSheet(spriteSheet, range(6, 11), 100);
        this.runAnimationLeft = Animation.fromSpriteSheet(spriteSheet, range(12, 17), 100);
        this.runAnimationDown = Animation.fromSpriteSheet(spriteSheet, range(18, 23), 100);
        this.runAnimationRightIdle = Animation.fromSpriteSheet(spriteSheet, range(2, 2), 100);
        this.runAnimationTopIdle = Animation.fromSpriteSheet(spriteSheet, range(9, 9), 100);
        this.runAnimationLeftIdle = Animation.fromSpriteSheet(spriteSheet, range(14, 14), 100);
        this.runAnimationDownIdle = Animation.fromSpriteSheet(spriteSheet, range(20, 20), 100);

        // Set the initial position and scale of the actor
        this.pos = new Vector(400, 400);
        this.scale = new Vector(1.2, 1.2)
    }
    noMovementKeysHeld(engine) {
        return !(
            engine.input.keyboard.isHeld(Keys.W) ||
            engine.input.keyboard.isHeld(Keys.A) ||
            engine.input.keyboard.isHeld(Keys.S) ||
            engine.input.keyboard.isHeld(Keys.D) ||
            engine.input.keyboard.isHeld(Keys.Up) ||
            engine.input.keyboard.isHeld(Keys.Left) ||
            engine.input.keyboard.isHeld(Keys.Down) ||
            engine.input.keyboard.isHeld(Keys.Right)
        );
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -1;
            if (this.currentAnimation !== this.runAnimationTop) {
                this.graphics.use(this.runAnimationTop);
                this.currentAnimation = this.runAnimationTop;
            }
        } else if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 1;
            if (this.currentAnimation !== this.runAnimationDown) {
                this.graphics.use(this.runAnimationDown);
                this.currentAnimation = this.runAnimationDown;
            }
        } else {
            yspeed = 0;

        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 1;
            if (this.currentAnimation !== this.runAnimationRight) {
                this.graphics.use(this.runAnimationRight);
                this.currentAnimation = this.runAnimationRight;
            }
        } else if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -1;
            if (this.currentAnimation !== this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeft);
                this.currentAnimation = this.runAnimationLeft;
            }
        } else {
            xspeed = 0;

        }
        if (this.noMovementKeysHeld(engine)) {
            if (this.currentAnimation === this.runAnimationRight) {
                this.graphics.use(this.runAnimationRightIdle);
                this.currentAnimation = this.runAnimationRightIdle;
            } else if (this.currentAnimation === this.runAnimationLeft) {
                this.graphics.use(this.runAnimationLeftIdle);
                this.currentAnimation = this.runAnimationLeftIdle;
            } else if (this.currentAnimation === this.runAnimationTop) {
                this.graphics.use(this.runAnimationTopIdle);
                this.currentAnimation = this.runAnimationTopIdle;
            } else if (this.currentAnimation === this.runAnimationDown) {
                this.graphics.use(this.runAnimationDownIdle);
                this.currentAnimation = this.runAnimationDownIdle;
            }
        }

        this.direction = new Vector(xspeed, yspeed);

        // Apply movement speed to the direction
        const movementSpeed = 100; // Define a constant movement speed
        this.vel = this.direction.scale(movementSpeed);
    }
}