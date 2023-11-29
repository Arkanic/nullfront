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
import { Vector3 } from "three";

class Game {
    sockets:{[key:string]:Socket};
    players:{[key:string]:Player};
    entities:{[key:string]:Entity};

    physics:Physics;

    private then:number
    private now:number

    constructor() {
        this.sockets = {};
        this.players = {};
        this.entities = {};

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

    addPlayer(socket:io.Socket, data:Data.Join):void {
        this.sockets[socket.id] = new Socket(socket);

        const position = new Vector3((Math.random() * 200) - 100, 60, (Math.random() * 200) - 100);
        this.players[socket.id] = new Player(socket.id, striptags(data.username), position);

        this.physics.world.addBody(this.players[socket.id].body);
    }

    removePlayer(socket:io.Socket):void {
        if(this.players[socket.id]) this.physics.world.removeBody(this.players[socket.id].body);

        delete this.players[socket.id];
        delete this.sockets[socket.id];
    }

    handleKeyboardInput(socket:io.Socket, state:Data.KeyboardInput):void {
        if(!this.players[socket.id]) return;
        this.players[socket.id].translateKeyboardInput(state);
    }

    update():void {
        Object.keys(this.entities).forEach(id => {
            const entity = this.entities[id];
            entity.update();
        });

        Object.keys(this.players).forEach(id => {
            const player = this.players[id];
            player.update();
        });

        this.now = Date.now();
        let dt = (this.now - this.then) / 1000;

        this.physics.world.step(1 / 60, dt, 3);

        Object.keys(this.sockets).forEach(id => {
            const socket = this.sockets[id].socket;
            const player = this.players[id];

            socket.emit(constants.msg.update, this.createUpdate(player, this.sockets[id]));
        });

        this.then = this.now;
    }

    createUpdate(player:Player, socket:Socket):serializedData.WorldSkim {
        let update = {
            time: Date.now(),
            me: player.serialize(),
            others: Object.values<Player>(this.players).map(p => p.serialize()),
            entities: Object.values<Entity>(this.entities).map(e => e.serialize())
        }

        let skim = socket.getSkim(update);

        return skim;
    }
}

export default Game;