import Component from "../../core/components/Component.js";
import Vector2 from "../../core/math/Vector2.js";
import TextField from "../../core/components/TextField.js";
import Scene from "../../core/Scene.js";


export default class ScoreBoard extends TextField  {

    /**
     * The TextField component allows you to configure and render dynamic text within the game engine.
     * @constructs Scoreboard
     * @param {Entity} entity The entity this component is attached to.
     * @param {TextFieldConfig} config The configuration that controls the display of the text.
     * @param {Scene} gameScene The GameScene in which the game is either actively being played or where the game was being played
     */
    constructor(entity, config=null, gameScene)
    {
        super(entity,"Score: \t0", config);

        /** 
         * The GameScene in which the game is either actively being played or where the game was being played.
         * @public
         * @type {GameScene} 
         * @member ScoreBoard #gameScene
         */
        this.gameScene = gameScene;
    }

    update(delta)  {
        this.text = "Score: \t"+this.gameScene.score;
    }
}