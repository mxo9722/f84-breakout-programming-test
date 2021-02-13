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

    }

    pause() {
        console.log("Pause")
    }
}