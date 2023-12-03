// consider this the "dictionary" of generic entities that are themselves all the same class (i.e. a beachball is a PassiveEntity)
import * as cannon from "cannon-es";
import PassiveEntity from "./entities/passiveEntity";


export function newBeachball(id:string):PassiveEntity {
    return new PassiveEntity(id, "beachball", new cannon.Body({
        shape: new cannon.Sphere(1),
        mass: 1,
        linearDamping: 0.3
    }));
}

export function newBarrel(id:string):PassiveEntity {
    return new PassiveEntity(id, "barrel", new cannon.Body({
        shape: new cannon.Cylinder(0.305, 0.305, 0.880, 12),
        type: cannon.BODY_TYPES.STATIC
    }));
}