import Entity from "./entity";
import * as cannon from "cannon-es";

class PassiveEntity extends Entity {
    /**
     * Generic wrapper for all objects that don't do anything other than be passive (static or otherwise)
     * @param type unique name for rendering purposes
     * @param body cannon es body of the object
     */
    constructor(id:string, type:string, body:cannon.Body) {
        super(id);

        this.type = type;
        this.body = body;
    }
}

export default PassiveEntity;