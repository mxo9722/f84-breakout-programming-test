import Image from '../../core/components/Image.js';

export default class LifeDisplay extends Image{
    /**
     * @constructs LifeDisplay
     * @param {Entity} entity The entity this component is attached to.
     * @param {String} keyFull The key of the image of the full life.
     * @param {String} keyEmpty The key of the image of the empty life.
     * @param {Number} threshold the minimum number of lives in which this life is hown as full and not empty.
     */
    constructor(entity, keyFull, keyEmpty, threshold)
    {
        super(entity,keyFull);

        /** 
         * The key of the image of the full life icon. 
         * @public
         * @type {String} 
         * @member LifeDisplay#keyFull
         */
        this.keyFull = keyFull;
        /** 
         * The key of the image of the empty life icon. 
         * @public
         * @type {String} 
         * @member LifeDisplay#keyEmpty
         */
        this.keyEmpty = keyEmpty;
        /** 
         * The minimum number of lives that the player can have while this display is still full. 
         * @public
         * @type {Number} 
         * @member LifeDisplay#threshold
         */
        this.threshold = threshold;
    }

    update(delta)
    {
        if(this.entity.scene.lives<this.threshold){
            this.key = this.keyEmpty;
        }
        else{
            this.key = this.keyFull;
        }
    }
}