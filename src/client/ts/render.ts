import {debounce} from "throttle-debounce";
import * as three from "three";

import Game from "./render/game";

let canvas = document.getElementById("game")!;

const scene = new three.Scene();
const renderer = new three.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", debounce(40, onWindowResize));
function onWindowResize() {
}