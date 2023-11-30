import * as three from "three";
import Entity from "./entity";

class Player extends Entity {
    constructor(scene:three.Scene) {
        super(scene);

        const material = new three.MeshBasicMaterial();
        material.color = new three.Color(0x042d65);
        this.mesh = new three.Mesh(new three.SphereGeometry(1), material);
        scene.add(this.mesh);
    }

    dispose() {
        (this.mesh.material as three.MeshStandardMaterial).dispose();
        super.dispose();
    }
}

export default Player;