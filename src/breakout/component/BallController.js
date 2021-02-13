import Component from "../../core/components/Component.js";
import Vector2 from "../../core/math/Vector2.js";

export default class BallController extends Component
{

    constructor(entity, radius, bricks, paddle){
        super(entity)
        this.radius = radius

        this.bricks = bricks;
        this.paddle = paddle;

        const speed = 240;
        
        this.vx = 0
        this.vy = speed;

        this.entity.scene.input.mouse.events.addEventListener(MouseEvent.MOUSE_MOVE, this.onMouseMoved, this);
    }

    update(delta){
        this.move(delta)
    }

    move(delta){

        const futurePos = this.entity.getPosition();
        futurePos.x += this.vx*delta;
        futurePos.y += this.vy*delta;

        if(futurePos.x>1024-this.radius){
            this.vx*=-1;
            this.move(delta);
            return;
        }
        else if(futurePos.x<0+this.radius){
            this.vx*=-1;
            this.move(delta);
            return;
        }

        if(futurePos.y<0+this.radius){
            this.vy*=-1;
            this.move(delta);
            return;
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
                const speed = 300.0;
    
                dir.x -= from.x;
                dir.y -= from.y;
    
                let length = dir.length;
    
                dir.x = dir.x*speed/length;
                dir.y = dir.y*speed/length;
    
                this.vx =dir.x;
                this.vy = dir.y;

                this.entity.scene.breakBrick(this.bricks,element);
                
                this.move(delta);
                
                return;
            }
            
        });

        if(this.paddle.components[2].containsPoint(futurePos))  {
            const dir = this.entity.getPosition();
            const from = this.paddle.getPosition();
            const speed = 300.0;

            dir.x -= from.x;
            dir.y -= from.y;

            console.log(dir.x)

            let length = dir.length;
            
            console.log(dir.x*speed)

            dir.x = dir.x*speed/length;
            dir.y = dir.y*speed/length;

            

            this.vx =dir.x;
            this.vy = dir.y;

            

            this.move(delta);
            return;
        }

        this.entity.localPosition = futurePos;
    }

    respawn(){

    }
}