import constants from "../../shared/constants";

import Entity from "./entity";
import * as Data from "../../shared/types/inputObject";
import * as Serialized from "../../shared/types/serializedData";
import {Vector3} from "three";
import * as cannon from "cannon-es";

class Player extends Entity {
    username:string;
    keys:Data.KeyboardInput;

    constructor(id:string, username:string, position:Vector3) {
        super(id);
        this.type = "player";

        this.username = username;
        this.body = new cannon.Body({
            mass: 1,
            linearDamping: 0.95
        });
        this.body.addShape(new cannon.Sphere(1));
        this.body.position.set(position.x, position.y, position.z);

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
        if(this.keys.a) delta.x -= constants.player.acceleration;
        if(this.keys.d) delta.x += constants.player.acceleration;
        if(this.keys.w) delta.z -= constants.player.acceleration;
        if(this.keys.s) delta.z += constants.player.acceleration;
        let direction = this.body.quaternion.vmult(delta);
        this.body.velocity.x += direction.x;
        this.body.velocity.z += direction.z;
        
        this.body.velocity.x = Math.min(constants.player.maxspeed, Math.max(-constants.player.maxspeed, this.body.velocity.x))
        this.body.velocity.z = Math.min(constants.player.maxspeed, Math.max(-constants.player.maxspeed, this.body.velocity.z))

    }

    translateKeyboardInput(keys:Data.KeyboardInput):void {
        this.keys = keys;
    }

    translateMouseInput(mouse:Data.MouseInput):void {
        this.body.quaternion.set(mouse.rotation.x, mouse.rotation.y, mouse.rotation.z, mouse.rotation.w);
    }

    serialize():Serialized.Player {
        return {
            ...super.serialize(),
            username: this.username
        }
    }
}

export default Player;