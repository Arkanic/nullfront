import constants from "../../shared/constants";

import Entity from "./entity";
import * as Data from "../../shared/types/inputObject";
import * as Serialized from "../../shared/types/serializedData";
import {Vector3, Vector2} from "three";
import * as cannon from "cannon-es";

class Player extends Entity {
    username:string;
    keys:Data.KeyboardInput;

    constructor(id:string, username:string, position:Vector3) {
        super(id);
        this.type = "player";

        this.username = username;
        this.body = new cannon.Body({
            mass: 1
        });
        this.body.addShape(new cannon.Sphere(1));

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        }
    }

    update() {
        super.update();

        let delta = new cannon.Vec3(0, 0, 0);
        if(this.keys.a) delta.x -= constants.player.speed;
        if(this.keys.d) delta.x += constants.player.speed;
        if(this.keys.w) delta.z += constants.player.speed;
        if(this.keys.s) delta.z -= constants.player.speed;
        let direction = this.body.quaternion.vmult(delta);
        this.body.velocity.set(direction.x, direction.y, direction.z);
    }

    translateKeyboardInput(keys:Data.KeyboardInput):void {
        this.keys = keys;
    }

    translateMouseInput(mouse:Data.MouseInput):void {
        
    }

    serialize():Serialized.Player {
        return {
            ...super.serialize(),
            username: this.username
        }
    }
}

export default Player;