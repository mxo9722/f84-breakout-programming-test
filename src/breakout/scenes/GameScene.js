import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import PlayButton from '../component/PlayButton.js';
import PaddleController from '../component/PaddleControler.js';

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
    }
}