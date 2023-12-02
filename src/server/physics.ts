import path from "path";
import fs from "fs";

import * as cannon from "cannon-es";
import * as three from "three";

import constants from "../shared/constants";

import {OBJLoader} from "./util/OBJLoader";
import CannonUtils from "./util/cannonUtils";

import {playerMaterial, groundMaterial} from "./physics/materials";

export default class Physics {
    world = new cannon.World();

    groundMesh:three.Mesh;
    groundBody:cannon.Body;

    constructor() {
        /*const loader = new OBJLoader();
        const data = fs.readFileSync("src/client/assets/models/groundmap.obj");
        const obj = loader.parse(data.toString());
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
        });*/

        this.world.gravity.set(0, -9.81, 0);

        
        this.world.addContactMaterial(new cannon.ContactMaterial(playerMaterial, groundMaterial, {
            friction: 0.0,
            restitution: 0.3
        }));

        this.groundMesh = new three.Mesh(new three.BoxGeometry(constants.map.maxsize.x, 1, constants.map.maxsize.y));
        this.groundMesh.position.set(0, 0, 0);

        const shape = CannonUtils.CreateTrimesh(this.groundMesh.geometry);
        this.groundBody = new cannon.Body({
            mass: 0,
            material: groundMaterial
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
}