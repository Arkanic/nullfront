import io, * as socketio from "socket.io-client";
import {throttle} from "throttle-debounce";
import constants from "../../shared/constants";
import {handleGameUpdate, handleInitData} from "./handler";
import * as Data from "../../shared/types/inputObject";

const protocol:string = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket:socketio.Socket = io(`${protocol}://${window.location.host}`, {reconnection:false});
let disconnectMessage:string = "Unknown. Try checking your network. If not, the server may have crashed.";

const connected:Promise<void> = new Promise((resolve) => {
    socket.on("connect", () => {
        console.log(`Connected, using ${protocol}`);
        resolve();
    });
});

/**
 * Connect to the socket system
 */
export function connect() {
    connected.then(() => {
        console.log("Starting handlers");
        socket.on(constants.msg.update, handleGameUpdate);
        socket.on(constants.msg.initdata, handleInitData);
        socket.on(constants.msg.serverclosing, function (data:any) {
            disconnectMessage = data.message;
            document.getElementById("disconnect-message")!.innerHTML = data.message;
        });

        socket.on("disconnect", () => {
            console.log("disconnected");
            console.log(`(${disconnectMessage})`);
            document.getElementById("disconnected")!.classList.remove("hidden");
            document.getElementById("reconnect-button")!.addEventListener("click", (e) => {
                window.location.reload();
            });
        });
    });
}

export const play = (data:Data.Join) => {
    socket.emit(constants.msg.join, {data});
}

let previousKeyboardState = "";
export const updateKeyboardInput = (state:Data.KeyboardInput) => {
    // if a key has actually changed
    if(previousKeyboardState != JSON.stringify(state)) {
        socket.emit(constants.msg.keyboardinput, {state});
        previousKeyboardState = JSON.stringify(state);
    }
}

let previousMouseState = "";
export const updateMouseInput = (state:Data.MouseInput) => {
    if(previousMouseState != JSON.stringify(state)) {
        socket.emit(constants.msg.mouseinput, {state});
        previousMouseState = JSON.stringify(state);
    }
}