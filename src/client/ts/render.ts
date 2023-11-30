import {debounce} from "throttle-debounce";
import * as three from "three";

import Game from "./render/game";

let canvas = document.getElementById("game")!;

const scene = new three.Scene();
const renderer = new three.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const game = new Game(scene);

window.addEventListener("resize", debounce(40, onWindowResize));
function onWindowResize() {
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

let rendering = false;
export function startRendering() {
    rendering = true;
    animate();
}

function animate() {
    if(!rendering) return; // only loop if allowed to

    requestAnimationFrame(animate);

    renderer.render(scene, game.camera);
}

export function stopRendering() {
    rendering = false;
}