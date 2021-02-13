import Component from "../../core/components/Component.js";
import Vector2 from "../../core/math/Vector2.js";
import TextField from "../../core/components/TextField.js";


export default class HighScoreBoard extends TextField  {

    /**
     * The TextField component allows you to configure and render dynamic text within the game engine.
     * @constructs HighScoreBoard
     * @param {Entity} entity The entity this component is attached to.
     * @param {TextFieldConfig} config The configuration that controls the display of the text.
     */
    constructor(entity, config=null)
    {
        super(entity,"High Score: \t0", config);
    }

    update(delta)  {
        if(localStorage.getItem("highScore")!=undefined)  {
            this.text = "High Score: \t"+localStorage.getItem("highScore");
        }
    }
}