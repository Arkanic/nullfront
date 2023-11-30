import {nanoid} from "nanoid";
import * as three from "three";
import * as state from "../state";
import * as serialized from "../../../shared/types/serializedData";
import constants from "../../../shared/constants";

import Player from "./components/player";
import Me from "./components/me";

export function render(scene:three.Scene) {
    const {me, others, entities} = state.getCurrentState();
}