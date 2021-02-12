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
        this.loader.load("ball","./assets/images/breakout-ball.png",FileType.TEXTURE)
        this.loader.load("btnPauseHover","./assets/images/breakout-btn-pause-hover.png",FileType.TEXTURE)
        this.loader.load("btnPause","./assets/images/breakout-btn-pause.png",FileType.TEXTURE)
        this.loader.load("btnPinkHover","./assets/images/breakout-btn-pink-hover.png",FileType.TEXTURE)
        this.loader.load("btnPink","./assets/images/breakout-btn-pink.png",FileType.TEXTURE)
        this.loader.load("btnPurpleHover","./assets/images/breakout-btn-purple-hover.png",FileType.TEXTURE)
        this.loader.load("btnPurple","./assets/images/breakout-btn-purple.png",FileType.TEXTURE)
        this.loader.load("enemyBrick","./assets/images/breakout-enemy-brick.png",FileType.TEXTURE)

        const backgroundEntity = new Entity(this, 1024/2.0, 576/2.0)
        
        new Image(backgroundEntity, "splashBackground")

        const textEntity = new Entity(this, 1024/2.0-40, 576/2.0 - 60)
        new TextField(textEntity, "Loading...", new TextFieldConfig("Arial", "20px", "#FFFFFF", TextAlign.LEFT))
       
        const loadingBarOutline = new Entity(this, 1024/2,576/2-20)
        new Image(loadingBarOutline,"loadingBarBackground")

        const loadingBar = new Entity(this, (1024/2)-(322/2),576/2-20);
        new Image(loadingBar,"loadingBarFill");
    }

    updateLoadingBar(percent){
        //if(this.loadingBar != undefined){
        console.log(percent)
        this.entities[3].localPosition=new Vector2((1024/2)-((322/2)*(1-percent)),576/2-20)
        this.entities[3].localScale=new Vector2(percent,1);
        //}
    }

    update(delta)
    {
        super.update(delta);

        if(this.loader.totalAssets!=0)
        this.updateLoadingBar(this.loader.assetsLoaded*1.0/this.loader.totalAssets)

        /*if(this.loader.assetsLoaded == this.loader.totalAssets){

        }*/
    }

    
}