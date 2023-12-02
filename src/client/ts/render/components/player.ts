import * as three from "three";
import Entity from "./entity";
import {playerGeometry, playerMaterial} from "../materials";

class Player extends Entity {
    constructor(scene:three.Scene) {
        super(scene);

        this.mesh = new three.Mesh(playerGeometry, playerMaterial);
        scene.add(this.mesh);
    }

    dispose() {
        super.dispose();
    }
}

export default Player;