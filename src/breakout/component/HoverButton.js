import Vector2 from "../../core/math/Vector2.js";
import Button from "../../core/components/Button.js";
import Mouse, {MouseEvent} from "../../core/input/Mouse.js";

export default class HoverButton extends Button
{
    /**
     * @constructs HoverButton
     * @param {Entity} entity The entity the button component will be attached to.
     * @param {Number} width The width of the button.
     * @param {Number} height The height of the button.
     * @param {Function} onClickCallback The function the button will call when clicked.
     * @param {String} hoverImageKey The key of the hover image for the button
     * @param {any} onClickCallbackContext The context that will be bound to the function when called. Usually set to 'this'.
     */
    constructor(entity, width, height, onClickCallback, hoverImageKey, onClickCallbackContext=null){
        
        super(entity, width, height, onClickCallback, onClickCallbackContext);
        this.hoverImageKey = hoverImageKey;

        this.origin = new Vector2(0.5, 0.5);
        const image = this.entity.scene.engine.assets.textures[this.key];
        
        this.width = this.width;
        
        this.height = this.height;
        this.hover = false;

        this.entity.scene.input.mouse.events.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMove, this);
    }

    hoverCheck(event){
        const position = this.entity.getPosition();
        const scale = this.entity.getScale();
        const rotation = this.entity.getRotation();

        const x0 = position.x - this.width*scale.x*this.origin.x;
        const x1 = position.x + this.width*scale.x*(1.0-this.origin.x);
        const y0 = position.y - this.height*scale.y*this.origin.y;
        const y1 = position.y + this.height*scale.y*(1.0-this.origin.y);
        this.hover = event.x>=x0 && event.x<=x1 && event.y>=y0 && event.y<=y1;
    }

    mouseMove(event)  {
        this.hoverCheck.bind(this)(event);
    }

    

    render(context){
        if(this.hover){
            context.save();

            const pos = this.entity.getPosition();
            const scale = this.entity.getScale();
            const x = pos.x;
            const y = pos.y;
            const scaleX = scale.x;
            const scaleY = scale.y;
            const rotation = this.entity.getRotation();

            context.setTransform(1, 0, 0, 1, x, y); // sets scale and origin
            context.rotate(rotation*Math.PI/180.0);
            const image = this.entity.scene.engine.assets.textures[this.hoverImageKey];
            context.drawImage(image, -this.width*scaleX*this.origin.x, -this.height*scaleY*this.origin.y, this.width*scaleX, this.height*scaleY);

            context.restore();
        }
    }

    /**
     * Cleans up input listeners the button is subscribed to.
     * @instance
     * @memberof HoverButton
     * @param {Vector2} event 
     */
    destroy()
    {
        console.log("Destroy");
        this.entity.scene.input.mouse.events.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMove, this);
        this.entity.scene.input.mouse.events.removeEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
        super.destroy();
    }
}