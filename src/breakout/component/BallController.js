import Component from "../../core/components/Component.js";
import Vector2 from "../../core/math/Vector2.js";

import Mouse, {MouseEvent} from "../../core/input/Mouse.js";

export default class BallController extends Component
{

    constructor(entity, radius, bricks, paddle){
        super(entity)
        this.radius = radius

        this.bricks = bricks;
        this.paddle = paddle;

        this.speed = 300;
        
        this.vx = 0
        this.vy = 0;

        this.rebrickTimer = 0;

        this.paddle.addChild(this.entity);

        this.entity.scene.input.mouse.events.addEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
    }

    update(delta){
        if(this.entity.parent!=this.paddle){
            this.move(delta)
        }
        if(this.bricks.length==0){
            this.rebrickTimer += delta;
            if(this.rebrickTimer>=2)
            {
                this.speed *= 1.3;
                this.vx *= 1.3;
                this.vy *= 1.3;
                this.entity.scene.rebrick(this.bricks);
                this.rebrickTimer=0;
            }
        }
    }

    onMouseDown(event)  {
        this.launch.bind(this)(event);
    }

    launch(event)  {
        if(this.entity.parent==this.paddle)  {
            this.paddle.removeChild(this.entity);
            this.entity.localPosition.x+=this.paddle.getPosition().x;
            this.entity.localPosition.y+=this.paddle.getPosition().y;
            this.vy = -this.speed;
        }
    }

    move(delta){

        const futurePos = this.entity.getPosition();
        futurePos.x += this.vx*delta;
        futurePos.y += this.vy*delta;

        if(futurePos.x>1024){
            this.vx*=-1;
            futurePos.x = 1024-Math.abs(futurePos.x-1024)
        }
        else if(futurePos.x<0){
            this.vx*=-1;
            futurePos.x = Math.abs(futurePos.x);
        }

        if(futurePos.y<0){
            this.vy*=-1;
            futurePos.y = Math.abs(futurePos.y);
        }
        else if(futurePos.y>576-this.radius){
            this.respawn();
            return;
        }

        let breaker = null;

        this.bricks.forEach(element => {
            if(element.components[1].containsPoint(futurePos))
            {
                const dir = this.entity.getPosition();
                const from = element.getPosition();
    
                dir.x -= from.x;
                dir.y -= from.y;
    
                let length = dir.length;
    
                dir.x = dir.x*this.speed/length;
                dir.y = dir.y*this.speed/length;
    
                this.vx =dir.x;
                this.vy = dir.y;

                this.entity.scene.breakBrick(this.bricks,element);
            }
            
        });

        if(this.paddle.components[2].containsPoint(futurePos))  {
            const dir = this.entity.getPosition();
            const from = this.paddle.getPosition();

            dir.x -= from.x;
            dir.y -= from.y;

            console.log(dir.x)

            let length = dir.length;

            dir.x = dir.x*this.speed/length;
            dir.y = dir.y*this.speed/length;

            this.vx =dir.x;
            this.vy = dir.y;
        }

        this.entity.localPosition = futurePos;
    }

    respawn(){        
        this.vx = 0
        this.vy = 0;

        this.entity.localPosition = new Vector2(0,-this.radius*2);
        this.paddle.addChild(this.entity);

        this.entity.scene.lives -= 1;
    }

    destroy()  {
        this.entity.scene.input.mouse.events.removeEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
    }
}