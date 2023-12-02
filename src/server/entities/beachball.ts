import Entity from "./entity";
import * as cannon from "cannon-es";

class Beachball extends Entity {
    constructor(id:string) {
        super(id);
        this.type = "beachball";
        
        this.body = new cannon.Body({
            mass: 1
        });
        this.body.addShape(new cannon.Sphere(1));
    }
}

export default Beachball;