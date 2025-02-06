import Entity from "./entity";
import * as cannon from "cannon-es";
import * as serialized from "../../shared/types/serializedData";

class Beachball extends Entity {
    radius:number;

    constructor(id:string, radius:number) {
        super(id);

        this.type = "beachball";
        this.radius = radius;
        this.body = new cannon.Body({
            shape: new cannon.Sphere(radius),
            mass: radius * radius * radius * 4,
            linearDamping: 0.3,
            angularDamping: 0.3
        });
    }

    serialize():serialized.Beachball {
        return {
            ...super.serialize(),
            radius: this.radius
        }
    }
}

export default Beachball;