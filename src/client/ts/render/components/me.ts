import * as three from "three";
import * as serialized from "../../../../shared/types/serializedData";
import Entity from "./entity";

class Me extends Entity {
    camera:three.PerspectiveCamera;
    audioListener:three.AudioListener

    constructor(scene:three.Scene, camera:three.PerspectiveCamera, audio:three.AudioListener) {
        super(scene);

        this.camera = camera;
        this.audioListener = audio;

        this.mesh = new three.Mesh(new three.SphereGeometry(0.1));
    }

    update(data:serialized.Player) {
        super.update(data);
        this.camera.position.set(data.position.x, data.position.y, data.position.z);
        //this.camera.setRotationFromQuaternion(new three.Quaternion(data.rotation.x, data.rotation.y, data.rotation.z, data.rotation.w));
    }
}

export default Me;