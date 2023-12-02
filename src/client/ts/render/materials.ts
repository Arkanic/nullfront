import * as three from "three";
import {getAssetUrl} from "../assets";
import constants from "../../../shared/constants";

const loader = new three.TextureLoader();

const load = (name:string) => loader.load(getAssetUrl(name));

// the player
export const playerMaterial = new three.MeshBasicMaterial();
playerMaterial.color = new three.Color(0x042d65);
export const playerGeometry = new three.SphereGeometry(1);

// floor
const floorTexture = load("./grass_floor.jpg");
floorTexture.wrapS = three.RepeatWrapping;
floorTexture.wrapT = three.RepeatWrapping;
floorTexture.repeat.set(constants.map.maxsize.x / 64, constants.map.maxsize.y / 64);
export const floorMaterial = new three.MeshPhongMaterial();
floorMaterial.map = floorTexture;