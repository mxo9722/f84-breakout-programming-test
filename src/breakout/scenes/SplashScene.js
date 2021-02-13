import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import PlayButton from '../component/PlayButton.js';
import GameScene from './GameScene.js';

export default class SplashScene extends Scene
{
    /**
     * 
     * @param {Engine} engine 
     */

    constructor(engine)
    {
        super(engine);

        const backgroundEntity = new Entity(this, 1024/2.0, 576/2.0)
        new Image(backgroundEntity, "splashBackground")

        const gameTitle = new Entity(this,1024/2,576/2-160)
        new Image(gameTitle,"gameTitle")

        const dashLine = new Entity(this, 1024/2, 576/2-110)
        new Image(dashLine,"splashLine")

        //TODO: Implement high score system
        const highScore = new Entity(this, 1024/2.0-30, 576/2.0 - 80)
        new TextField(highScore, "High Score: \t", new TextFieldConfig("Arial", "14px", "#FFFFFF", TextAlign.CENTER))

        const playBtn = new Entity(this,1024/2,576/2+160);
        new Image(playBtn,"btnPurple")
        new PlayButton(playBtn,259,56,this.play,"btnPurpleHover",this)

        const playBtnText = new Entity(this,0,15)
        playBtn.addChild(playBtnText)
        new TextField(playBtnText,"Play",new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER))

        const playBtnSymbol = new Entity(this,-100,0)
        playBtn.addChild(playBtnSymbol)
        new Image(playBtnSymbol,"playIcon")
    }

    play(event)
    {
         this.engine.scenes.remove(this);
         //this.engine.scenes.add(new GameScene(this.engine));
    }

    update(delta)
    {
        super.update(delta)
    }
}