import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import HoverButton from '../component/HoverButton.js';
import SplashScene from './SplashScene.js';
import Scoreboard from '../component/Scoreboard.js';
import GameScene from './GameScene.js';

export default class GameOverScene extends Scene
{

    /**
     * 
     * @param {Engine} engine 
     */

    constructor(engine)
    {
        super(engine);

        const overlay = new Entity(this, 1024/2.0, 576/2.0)
        new Image(overlay, "overlay")

        const backgroundEntity = new Entity(this, 1024/2.0, 576/2.0)
        new Image(backgroundEntity, "gameOverBackground")

        const pausedHeader = new Entity(this, 1024/2.0, 576/2.0 - 100)
        new TextField(pausedHeader, "GAME OVER", new TextFieldConfig("Arial", "62px", "#FFFFFF", TextAlign.CENTER))

        const scoreLine=new Entity(this,1024/2,576/2-80)
        new Image(scoreLine,"pauseLine")

        const resumeBtn=new Entity(this,1024/2,576/2+80);
        new Image(resumeBtn,"btnPink")
        new HoverButton(resumeBtn, 259, 56, this.resume, "btnPinkHover", this)

        const resumeText = new Entity(this,0,15)
        new TextField(resumeText, "Resume", new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER))
        resumeBtn.addChild(resumeText);

        const quitBtn=new Entity(this,1024/2,576/2+160);
        new Image(quitBtn,"btnPink")
        new HoverButton(quitBtn, 259, 56, this.quit, "btnPinkHover", this)

        const quitText = new Entity(this,0,15)
        new TextField(quitText, "Quit", new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER))
        quitBtn.addChild(quitText);

        const scoreDisplay = new Entity(this, 1024/2.0, 576/2)
        new Scoreboard(scoreDisplay,new TextFieldConfig("Arial", "50px", "#FFFFFF", TextAlign.CENTER), this.engine.scenes.scenes[0])
    }

    resume(){
        this.engine.scenes.remove(this);
        this.engine.scenes.remove(this.engine.scenes.scenes[0]);
        this.engine.scenes.add(new GameScene(this.engine));
    }

    quit(){
        this.engine.scenes.remove(this);
        this.engine.scenes.remove(this.engine.scenes.scenes[0]);
        this.engine.scenes.add(new SplashScene(this.engine));
    }
}