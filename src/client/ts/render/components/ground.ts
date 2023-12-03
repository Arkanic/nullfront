import * as three from "three";
import Entity from "./entity";
import {floorMaterial} from "../materials";

import constants from "../../../../shared/constants";

class Ground extends Entity {
    constructor(scene:three.Scene) {
        super(scene);

        this.mesh = new three.Mesh(new three.PlaneGeometry(constants.map.maxsize.x, constants.map.maxsize.y), floorMaterial);
        scene.add(this.mesh);
    }
}

export default Ground;