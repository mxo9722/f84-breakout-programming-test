import AssetLoader, { FileType } from '../../core/AssetLoader.js';
import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Vector2 from '../../core/math/Vector2.js';

export default class LoadingScene extends Scene
{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        super(engine);

        this.loader = new AssetLoader(this);
        /*Load assets here*/
        this.loader.load("Ball","./assets/images/breakout-ball.png",FileType.TEXTURE)

        const backgroundEntity = new Entity(this, 1024/2.0, 576/2.0)
        
        new Image(backgroundEntity, "splashBackground")

        const textEntity = new Entity(this, 1024/2.0-40, 576/2.0 - 60)
        new TextField(textEntity, "Loading...", new TextFieldConfig("Arial", "20px", "#FFFFFF", TextAlign.LEFT))
       
        const loadingBarOutline = new Entity(this, 1024/2,576/2-20)
        new Image(loadingBarOutline,"loadingBarBackground")

        const loadingBar = new Entity(this, (1024/2)-(322/2),576/2-20)
        new Image(loadingBar,"loadingBarFill")

        loadingBar.localScale=new Vector2(0,1);
    }

    update(delta)
    {
        super.update(delta);
    }
}