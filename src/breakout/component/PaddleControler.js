import Component from "../../core/components/Component.js";
import Mouse, {MouseEvent} from "../../core/input/Mouse.js";

export default class PaddleController extends Component
{
    /**
     * @constructs PaddleController
     * @param {Entity} entity The entity the PaddleController component will be attached to.
     */
    constructor(entity){
        super(entity)

        this.entity.scene.input.mouse.events.addEventListener(MouseEvent.MOUSE_MOVE, this.onMouseMoved, this);
    }
    
    movePaddle(event)  {
        
        const x = event.x;
        this.entity.localPosition.x = x;

    }

    onMouseMoved(event)  {
        
        this.movePaddle.bind(this)(event);
    }

    

    destroy()  {
        this.entity.scene.input.mouse.events.removeEventListener(MouseEvent.MOUSE_MOVE, this.onMouseMoved, this);
    }
}