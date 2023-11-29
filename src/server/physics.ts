import path from "path";
import fs from "fs";

import * as cannon from "cannon-es";
import * as three from "three";

import {OBJLoader} from "./util/OBJLoader";
import CannonUtils from "./util/cannonUtils";

export default class Physics {
    world = new cannon.World();

    groundMesh!:three.Mesh;
    groundBody!:cannon.Body;

    constructor() {
        const loader = new OBJLoader();
        const data = fs.readFileSync("src/client/models/groundmap.obj");
        const obj = loader.parse(data);
        obj.traverse((child:three.Object3D) => {
            if((child as three.Mesh).isMesh) {
                const mesh = child as three.Mesh;
                this.groundMesh = mesh;

                const shape = CannonUtils.CreateTrimesh(this.groundMesh.geometry);
                this.groundBody = new cannon.Body({
                    mass: 0
                });
                this.groundBody.addShape(shape);
                this.groundBody.position.x = this.groundMesh.position.x;
                this.groundBody.position.y = this.groundMesh.position.y;
                this.groundBody.position.z = this.groundMesh.position.z;
                this.groundBody.quaternion.x = this.groundMesh.quaternion.x;
                this.groundBody.quaternion.y = this.groundMesh.quaternion.y;
                this.groundBody.quaternion.z = this.groundMesh.quaternion.z;
                this.world.addBody(this.groundBody);
            }
        });
    }
}