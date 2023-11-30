import * as three from "three";
import * as serialized from "../../../shared/types/serializedData";

class Player {
    private mesh:three.Mesh;

    constructor(scene:three.Scene) {
        const material = new three.MeshStandardMaterial();
        material.color = new three.Color(0x042d65);
        this.mesh = new three.Mesh(new three.SphereGeometry(1), material);
        scene.add(this.mesh);
    }

    update(data:serialized.Player) {
        this.mesh.position.set(data.position.x, data.position.y, data.position.z);
        this.mesh.setRotationFromQuaternion(new three.Quaternion(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w));
    }
}

export default Player;