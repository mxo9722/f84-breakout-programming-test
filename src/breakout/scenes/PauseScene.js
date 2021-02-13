import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import HoverButton from '../component/HoverButton.js';
import SplashScene from './SplashScene.js';

export default class PauseScene extends Scene
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
        new Image(backgroundEntity, "pauseBackground")

        const pausedHeader = new Entity(this, 1024/2.0, 576/2.0 - 100)
        new TextField(pausedHeader, "PAUSED", new TextFieldConfig("Arial", "62px", "#FFFFFF", TextAlign.CENTER))

        const scoreLine=new Entity(this,1024/2,576/2-80)
        new Image(scoreLine,"pauseLine")

        const resumeBtn=new Entity(this,1024/2,576/2-20);
        new Image(resumeBtn,"btnPink")
        new HoverButton(resumeBtn, 259, 56, this.resume, "btnPinkHover", this)

        const resumeText = new Entity(this,0,15)
        new TextField(resumeText, "Resume", new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER))
        resumeBtn.addChild(resumeText);

        const quitBtn=new Entity(this,1024/2,576/2+60);
        new Image(quitBtn,"btnPink")
        new HoverButton(quitBtn, 259, 56, this.quit, "btnPinkHover", this)

        const quitText = new Entity(this,0,15)
        new TextField(quitText, "Quit", new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER))
        quitBtn.addChild(quitText);

    }

    resume(){
        this.engine.scenes.remove(this);
    }

    quit(){
        this.engine.scenes.remove(this);
        this.engine.scenes.remove(this.engine.scenes.scenes[0]);
        this.engine.scenes.add(new SplashScene(this.engine));
    }
}