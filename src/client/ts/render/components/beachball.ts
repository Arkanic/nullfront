import * as three from "three";
import Entity from "./entity";
import * as serialized from "../../../../shared/types/serializedData";
import {beachballGroup} from "../materials";

class Beachball extends Entity {
    constructor(scene:three.Scene) {
        super(scene);

        this.mesh = beachballGroup.clone();
        scene.add(this.mesh);
    }

    update(data:serialized.Beachball) {
        super.update(data);
        this.mesh.scale.set(data.radius, data.radius, data.radius);
    }
}

export default Beachball;