import * as three from "three";
import * as serialized from "../../../../shared/types/serializedData";

abstract class Entity {
    protected scene:three.Scene;
    protected mesh!:three.Mesh;

    constructor(scene:three.Scene) {
        this.scene = scene;
    }

    update(data:serialized.Player) {
        this.mesh.position.set(data.position.x, data.position.y, data.position.z);
        this.mesh.setRotationFromQuaternion(new three.Quaternion(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w));
    }

    dispose() {
        this.scene.remove(this.mesh);
    }
}

export default Entity;