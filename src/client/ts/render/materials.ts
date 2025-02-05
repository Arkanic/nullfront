import * as three from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {getAssetUrl} from "../assets";
import constants from "../../../shared/constants";

const textureLoader = new three.TextureLoader();
const gltfLoader = new GLTFLoader();

const load = (name:string) => textureLoader.load(getAssetUrl(name));

// the player
export const playerMaterial = new three.MeshBasicMaterial();
playerMaterial.color = new three.Color(0x042d65);
export const playerGeometry = new three.SphereGeometry(1);

// floor
const floorTexture = load("./grass_floor.jpg");
floorTexture.wrapS = three.RepeatWrapping;
floorTexture.wrapT = three.RepeatWrapping;
floorTexture.repeat.set(constants.map.maxsize.x / 16, constants.map.maxsize.y / 16);
export const floorMaterial = new three.MeshPhongMaterial();
floorMaterial.map = floorTexture;

// beachball
export let beachballGroup!:three.Group;

// barrel
export let barrelGroup!:three.Group;


export function materialPromise():Promise<void[]> {
    return Promise.all<void>([
        new Promise((resolve) => {
            gltfLoader.load(getAssetUrl("./beachball.glb"), async data => {
                const model = data.scene;
                //await renderer.compileAsync(model, camera, scene);
                beachballGroup = model;
                resolve();
            });
        }),
        new Promise((resolve => {
            gltfLoader.load(getAssetUrl("./barrel.glb"), async data => {
                const model = data.scene;
                barrelGroup = model;
                resolve();
            });
        }))
    ]);
}