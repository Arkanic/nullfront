import * as three from "three";
import * as serialized from "../../../shared/types/serializedData";
import Entity from "./entity";

class Me extends Entity {
    camera:three.Camera;

    constructor(scene:three.Scene) {
        super();

        this.camera = new three.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const listener = new three.AudioListener();
        this.camera.add(listener);
    }
}

export default Me;