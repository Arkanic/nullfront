import _ from "lodash";
import * as three from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import * as state from "../state";
import * as serialized from "../../../shared/types/serializedData";
import constants from "../../../shared/constants";

import Player from "./components/player";
import Me from "./components/me";
import Entity from "./components/entity";
import Beachball from "./components/beachball";
import Barrel from "./components/barrel";
import Ground from "./components/ground";
import {SkimDifference} from "../../../shared/util/skim";


class Game {
    scene:three.Scene;
    camera:three.PerspectiveCamera;
    controls:PointerLockControls;
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

        this.controls = new PointerLockControls(this.camera, document.body);
        scene.add(this.controls.getObject());

        this.me = new Me(scene, this.camera, this.audioListener);
        this.others = {};
        this.entities = {};

        // sky
        scene.background = new three.Color(0x1787b5);
        scene.fog = new three.Fog(0x1787b5, 0, 500);

        // ambient light
        let light = new three.AmbientLight(0x404040);
        light.intensity = 10;
        scene.add(light);
    }

    lockScreen() {
        this.controls.lock();
    }

    unlockScreen() {
        this.controls.unlock();
    }

    isLocked() {
        return this.controls.isLocked;
    }

    update() {
        let difference = state.getGameDifference();
        let world = state.getCurrentState();

        this.me.update(world.me);

        this.updateEntities(world, difference.entities);
        this.updateOthers(world, difference.others);
    }

    updateEntities(world:serialized.World, difference:SkimDifference) {
        for(let i in difference.added) {
            let id = difference.added[i];
            this.addEntity(id, _.find(world.entities, {id}));
        }

        for(let i in difference.modified) {
            let id = difference.modified[i];
            let data = _.find(world.entities, {id});
            if(data) this.entities[id].update(data);
        }

        for(let i in difference.removed) {
            let id = difference.removed[i];
            this.entities[id].dispose();
            delete this.entities[id];
        }
    }

    addEntity(id:string, data:serialized.Entity | undefined) {
        if(!data) return;
        let entity:Entity;
        switch(data.type) {
            case "beachball":
                entity = new Beachball(this.scene);
                break;
            case "barrel":
                entity = new Barrel(this.scene);
                break;
            case "ground":
                entity = new Ground(this.scene);
                break;
            default:
                entity = new Beachball(this.scene);
                break;
        }

        this.entities[id] = entity;
        this.entities[id].update(data);
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
            delete this.others[id];
        }
    }
}

export default Game;