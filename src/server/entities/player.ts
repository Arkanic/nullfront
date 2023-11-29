import constants from "../../shared/constants";

import Entity from "./entity";
import * as Data from "../../shared/types/inputObject";
import * as Serialized from "../../shared/types/serializedData";
import {Vector3} from "three";
import * as cannon from "cannon-es";

class Player extends Entity {
    username:string;

    constructor(id:string, username:string, position:Vector3) {
        super(id);

        this.username = username;
        this.body = new cannon.Body({
            mass: 1
        });
        this.body.addShape(new cannon.Sphere(1));
    }

    update() {
        super.update();
    }

    serialize():Serialized.Player {
        return {
            ...super.serialize(),
            username: this.username
        }
    }
}

export default Player;