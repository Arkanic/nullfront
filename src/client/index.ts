import "./css/main.scss";

import * as state from "./ts/state";
import * as networking from "./ts/networking";
import * as render from "./ts/render";
import * as input from "./ts/input";
import * as assets from "./ts/assets";
import constants from "../shared/constants";
import * as materials from "./ts/render/materials";

console.log("nullfront");

const playMenu = document.getElementById("play-menu")!;
const playButton = document.getElementById("play-button")!;
const usernameInput = document.getElementById("username-input")! as HTMLInputElement;

Promise.all([
    networking.connect(),
    materials.materialPromise()
]).then(() => {
    playMenu.classList.remove("hidden");
    usernameInput.focus();

    playButton.addEventListener("click", () => {
        networking.play({username: usernameInput.value});
        console.log("Game started.");
        playMenu.classList.add("hidden");
        state.initState();
        input.startInputHandling();
        render.startRendering();
    });
}).catch(console.error);