import Entity from "./entity";
import * as cannon from "cannon-es";

class Barrel extends Entity {
    constructor(id:string) {
        super(id);
        this.type = "barrel";

        this.body = new cannon.Body({
            type: cannon.BODY_TYPES.STATIC,
            shape: new cannon.Cylinder(0.305, 0.305, 0.880, 12)
        });
    }
}

export default Barrel;