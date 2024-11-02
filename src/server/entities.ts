// consider this the "dictionary" of generic entities that are themselves all the same class (i.e. a beachball is a PassiveEntity)
import * as cannon from "cannon-es";
import PassiveEntity from "./entities/passiveEntity";

export function newBarrel(id:string):PassiveEntity {
    return new PassiveEntity(id, "barrel", new cannon.Body({
        shape: new cannon.Cylinder(0.305, 0.305, 0.880, 12),
        type: cannon.BODY_TYPES.STATIC
    }));
}

export function newGround(id:string):PassiveEntity {
    let body = new cannon.Body({
        shape: new cannon.Plane(),
        type: cannon.BODY_TYPES.STATIC
    });
    body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    return new PassiveEntity(id, "ground", body);
}