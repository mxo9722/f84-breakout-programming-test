import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import LifeDisplay from '../component/LifeDisplay.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Scoreboard from '../component/Scoreboard.js';
import PaddleController from '../component/PaddleControler.js';
import HoverButton from '../component/HoverButton.js';
import Rectangle from '../component/Rectangle.js';
import Ball from '../component/BallController.js';
import PauseScene from './PauseScene.js';
import GameOverScene from './GameOverScene.js';
import HighScoreBoard from '../component/HighScoreBoard.js';

export default class GameScene extends Scene{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        super(engine);

        const backgroundEntity = new Entity(this, 1024/2.0, 576/2.0)
        new Image(backgroundEntity, "gameplayBackground")
        
        const paddle = new Entity(this, 1024/2, 576/2+240)
        new Image(paddle, "paddle")
        new PaddleController(paddle)
        new Rectangle(paddle,150,18)

        const btnPause = new Entity(this, 60, 60)
        new Image(btnPause, "btnPause")
        new HoverButton(btnPause, 56, 56, this.pause, "btnPauseHover", this)

        this.score = 0;

        const scoreDisplay = new Entity(this, 1024/2.0, 60)
        new Scoreboard(scoreDisplay,new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER),this)

        const scoreLine=new Entity(this,1024/2,75)
        new Image(scoreLine,"splashLine")

        this.highScore = 0;

        if(localStorage.getItem("highScore")!=undefined)
            this.highScore = localStorage.getItem("highScore");

        const highScore = new Entity(this, 1024/2.0-30, 100)
        new HighScoreBoard(highScore, new TextFieldConfig("Arial", "20px", "#FFFFFF", TextAlign.CENTER))

        const livesDisplay = new Entity(this, 1024-60,60)
        new TextField(livesDisplay, "Lives: \t", new TextFieldConfig("Arial", "14px", "#FFFFFF", TextAlign.CENTER))

        this.lives = 3;

        const firstLife = new Entity(this, 15, 10);
        livesDisplay.addChild(firstLife);
        new LifeDisplay(firstLife,"lifeFull","lifeEmpty",3)

        const secondLife = new Entity(this, 0, 10);
        livesDisplay.addChild(secondLife);
        new LifeDisplay(secondLife,"lifeFull","lifeEmpty",2)

        const thirdLife = new Entity(this, -15, 10);
        livesDisplay.addChild(thirdLife);
        new LifeDisplay(thirdLife,"lifeFull","lifeEmpty",1)

        const bricks = []

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 135)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 185)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 235)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        for(var i=0;i<5;i++){
            const brick = new Entity(this, 206+i*140, 285)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        const ball = new Entity(this, 0,-30)
        new Image(ball, "ball")
        new Ball(ball, 15, bricks, paddle)
    }

    update(delta)  {
        super.update(delta);
        if(this.lives==0 && this.engine.scenes.scenes.length==1)  {
            this.engine.scenes.add(new GameOverScene(this.engine));
        }
    }

    breakBrick(bricks, brick)
    {
        const index=bricks.indexOf(brick);
        bricks.splice (index, 1);

        brick.localPosition.x = -100;
        
        this.score++;

        if(this.score>this.highScore)  {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.score);
        }
    }

    rebrick(bricks)  {
        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 135)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 185)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        for(var i=0;i<6;i++){
            const brick = new Entity(this, 149+i*140, 235)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }

        for(var i=0;i<5;i++){
            const brick = new Entity(this, 206+i*140, 285)
            new Image(brick, "enemyBrick")
            new Rectangle(brick, 132, 27)
            bricks.push(brick)
        }
    }

    pause() {
        if(this.engine.scenes.scenes.length==1)  {
            this.engine.scenes.add(new PauseScene(this.engine));
        }
    }
}