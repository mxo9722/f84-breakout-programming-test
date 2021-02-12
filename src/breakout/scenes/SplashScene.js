import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';

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

        const gameTitle = new Entity(this,1024/2,576/2)
        new Image(gameTitle,"gameTitle")
    }

    update(delta)
    {
        super.update(delta)
    }
}