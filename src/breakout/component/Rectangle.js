import Component from "../../core/components/Component.js";
import Vector2 from "../../core/math/Vector2.js";


export default class Rectangle extends Component  {

    constructor(entity, width, height)  {
        super(entity, width, height)

        /** 
         * The width of the rectange. 
         * @public
         * @type {Number} 
         * @member Rectangle#width
         */
        this.width = width;
        /** 
         * The height of the rectangle
         * @public
         * @type {Number} 
         * @member Rectangle#height
         */
        this.height = height;
        /** 
         * The origin point of the rectangle. This defaults to center, (0.5, 0.5), which matches the default origin of Images. 
         * @public
         * @type {Vector2} 
         * @member Rectangle#origin
         */
        this.origin = new Vector2(0.5, 0.5);
    }

    containsPoint(point){
        const position = this.entity.getPosition();
        const scale = this.entity.getScale();
        const rotation = this.entity.getRotation();

        const x0 = position.x - this.width*scale.x*this.origin.x;
        const x1 = position.x + this.width*scale.x*(1.0-this.origin.x);
        const y0 = position.y - this.height*scale.y*this.origin.y;
        const y1 = position.y + this.height*scale.y*(1.0-this.origin.y);

        return point.x>=x0 && point.x<=x1 && point.y>=y0 && point.y<=y1;
    }


}