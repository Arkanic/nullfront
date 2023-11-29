import io from "socket.io";
import striptags from "striptags";
import * as cannon from "cannon-es";
import {nanoid} from "nanoid";

import Socket from "./socket";

import Entity from "./entities/entity";
import Player from "./entities/player";
import Physics from "./physics";

import * as Data from "../shared/types/inputObject";
import * as serializedData from "../shared/types/serializedData";
import constants from "../shared/constants";

class Game {
    sockets:{[key:string]:Socket};
    players:{[key:string]:Player};
    entities:{[key:string]:Entity};
    staticEntities:{[key:string]:Entity};

    physics:Physics;

    private then:number
    private now:number

    constructor() {
        this.sockets = {};
        this.players = {};
        this.entities = {};
        this.staticEntities = {};

        this.physics = new Physics();

        this.then = Date.now();
        this.now = 0;

        setInterval(this.update.bind(this), 1000 / 60);

        console.log("Game initialised");
    }

    addEntity(entity:Entity):void {
        this.entities[entity.id] = entity;
        this.physics.world.addBody(entity.body);
    }

    removeEntity(id:string):void {
        this.physics.world.removeBody(this.entities[id].body);
        delete this.entities[id];
    }
}