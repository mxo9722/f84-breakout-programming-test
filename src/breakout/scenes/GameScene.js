import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import PlayButton from '../component/HoverButton.js';
import PaddleController from '../component/PaddleControler.js';
import HoverButton from '../component/HoverButton.js';

export default class SplashScene extends Scene{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        super(engine);

        const backgroundEntity = new Entity(this, 1024/2.0, 576/2.0)
        new Image(backgroundEntity, "gameplayBackground")
        
        const paddle = new Entity(this, 1024/2, 576/2+240)
        new Image(paddle, "paddle")
        new PaddleController(paddle,150)

        const btnPause = new Entity(this, 60, 60)
        new Image(btnPause, "btnPause")
        new HoverButton(btnPause, 56, 56, this.pause, "btnPauseHover", this)

        var score = 0;

        const scoreDisplay = new Entity(this, 1024/2.0, 60)
        new TextField(scoreDisplay,"Score: "+score,new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER))

        const scoreLine=new Entity(this,1024/2,75)
        new Image(scoreLine,"splashLine")

        //TODO: Implement high score system
        const highScore = new Entity(this, 1024/2.0-30, 100)
        new TextField(highScore, "High Score: \t", new TextFieldConfig("Arial", "20px", "#FFFFFF", TextAlign.CENTER))

        const livesDisplay = new Entity(this, 1024-60,60)
        new TextField(livesDisplay, "Lives: \t", new TextFieldConfig("Arial", "14px", "#FFFFFF", TextAlign.CENTER))

        var lives = 3;

        const firstLife = new Entity(this, 15, 10);
        livesDisplay.addChild(firstLife);
        new Image(firstLife,"lifeFull")

        const secondLife = new Entity(this, 0, 10);
        livesDisplay.addChild(secondLife);
        new Image(secondLife,"lifeFull")

        const thirdLife = new Entity(this, -15, 10);
        livesDisplay.addChild(thirdLife);
        new Image(thirdLife,"lifeFull")

        const bricks = []

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 135)
            new Image(brick, "enemyBrick")
            bricks.push(brick)
        }

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 185)
            new Image(brick, "enemyBrick")
            bricks.push(brick)
        }

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 235)
            new Image(brick, "enemyBrick")
            bricks.push(brick)
        }

        for(var i=0;i<5;i++){
            const brick = new Entity(this, 206+i*140, 285)
            new Image(brick, "enemyBrick")
            bricks.push(brick)
        }
    }

    pause() {
        console.log("Pause")
    }
}