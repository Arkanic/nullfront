import {nanoid} from "nanoid";
import _ from "lodash";
import * as three from "three";
import * as state from "../state";
import * as serialized from "../../../shared/types/serializedData";
import constants from "../../../shared/constants";

import Player from "./components/player";
import Me from "./components/me";
import Entity from "./components/entity";
import {SkimDifference} from "../../../shared/util/skim";

class Game {
    scene:three.Scene;
    camera:three.PerspectiveCamera;
    audioListener:three.AudioListener;
    me:Me;
    others:{[unit:string]:Player};
    entities:{[unit:string]:Entity};

    constructor(scene:three.Scene) {
        this.scene = scene;
        this.camera = new three.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.audioListener = new three.AudioListener();
        this.camera.add(this.audioListener);

        this.me = new Me(scene, this.camera, this.audioListener);
        this.others = {};
        this.entities = {};
    }

    update() {
        let difference = state.getGameDifference();
        let world = state.getCurrentState();

        this.me.update(world.me);

        this.updateEntities(world, difference.entities);
        this.updateOthers(world, difference.others);
    }

    updateEntities(world:serialized.World, difference:SkimDifference) {
        // todo
    }

    updateOthers(world:serialized.World, difference:SkimDifference) {
        for(let i in difference.added) {
            let id = difference.added[i];
            this.others[id] = new Player(this.scene);
            let data = _.find(world.others, {id})
            if(data) this.others[id].update(data);
        }

        for(let i in difference.modified) {
            let id = difference.modified[i];
            let data = _.find(world.others, {id});
            if(data) this.others[id].update(data);
        }

        for(let i in difference.removed) {
            let id = difference.removed[i];
            this.others[id].dispose();
        }
    }
}

export default Game;