import * as three from "three";
import Entity from "./entity";
import {beachballGroup} from "../materials";

class Beachball extends Entity {
    constructor(scene:three.Scene) {
        super(scene);

        this.mesh = beachballGroup.clone();
        scene.add(this.mesh);
    }
}

export default Beachball;