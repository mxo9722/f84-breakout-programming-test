import Component from "../../core/components/Component.js";
import Mouse, {MouseEvent} from "../../core/input/Mouse.js";

export default class PaddleController extends Component
{
    constructor(entity, width){
        super(entity)
        this.width = width

        this.entity.scene.input.mouse.events.addEventListener(MouseEvent.MOUSE_MOVE, this.onMouseMoved, this);
    }
    
    movePaddle(event)  {
        
        const x = event.x;
        this.entity.localPosition.x = x;

    }

    onMouseMoved(event)  {
        console.log("move")
        this.movePaddle.bind(this)(event);
    }

    

    destroy()  {
        this.entity.scene.input.mouse.events.removeEventListener(MouseEvent.MOUSE_MOVE, this.onMouseMoved, this);
    }
}