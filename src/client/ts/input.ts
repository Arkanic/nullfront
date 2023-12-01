import * as keyboard from "./input/keyboard";
import * as mouse from "./input/mouse";

export function startInputHandling() {
    keyboard.startKeyboardInputHandling();
    mouse.startMouseInputHandling();
}

export function stopInputHandling() {
    keyboard.stopKeyboardInputHandling();
    mouse.stopMouseInputHandling();
}