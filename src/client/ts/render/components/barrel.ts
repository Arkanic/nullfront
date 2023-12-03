import * as three from "three";
import Entity from "./entity";
import {barrelGroup} from "../materials";

class Barrel extends Entity {
    constructor(scene:three.Scene) {
        super(scene);

        this.mesh = barrelGroup.clone();
        scene.add(this.mesh);
    }
}

export default Barrel;