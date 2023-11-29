import * as cannon from "cannon-es";

import * as Serialized from "../../shared/types/serializedData";
import constants from "../../shared/constants";

abstract class Entity {
    id:string;
    type:string;

    body!:cannon.Body;

    constructor(id:string) {
        this.id = id;
        this.type = "entity";
    }

    update():void {
    }

    serialize():Serialized.Entity {
        return {
            id: this.id,
            type: this.type,
            position: {
                x: this.body.position.x,
                y: this.body.position.y,
                z: this.body.position.z
            },
            rotation: {
                x: this.body.quaternion.x,
                y: this.body.quaternion.y,
                z: this.body.quaternion.z,
                w: this.body.quaternion.w 
            }
        }
    }
}

export default Entity;