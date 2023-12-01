import * as three from "three";
import * as cannon from "cannon-es";
import * as networking from "../networking";
import {pointerLockControls} from "../render";
import * as Data from "../../../shared/types/inputObject";

const controls = pointerLockControls();

let mouseState = {
    rotation: {
        w: 0,
        x: 0,
        y: 0,
        z: 0
    }
};

function handlePointerLockControlsChange(e:any) {
    mouseState.rotation.x = e.target.camera.quaternion.x;
    mouseState.rotation.y = e.target.camera.quaternion.y;
    mouseState.rotation.z = e.target.camera.quaternion.z;
    mouseState.rotation.w = e.target.camera.quaternion.w;

    networking.updateMouseInput(mouseState)
}

export function startMouseInputHandling() {
    controls.addEventListener("change", handlePointerLockControlsChange);
}

export function stopMouseInputHandling() {
    controls.removeEventListener("change", handlePointerLockControlsChange);
}