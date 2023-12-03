import io from "socket.io";
import striptags from "striptags";
import * as cannon from "cannon-es";
import {v4 as uuid} from "uuid";

import Socket from "./socket";

import Entity from "./entities/entity";
import Player from "./entities/player";
import * as entities from "./entities";
import Physics from "./physics";

import * as Data from "../shared/types/inputObject";
import * as serializedData from "../shared/types/serializedData";
import constants from "../shared/constants";
import {Vector3} from "three";
import _ from "lodash";

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

        this.addEntity(entities.newGround(uuid()));

        for(let i = 0; i < 10; i++) {
            let beachball = entities.newBeachball(uuid());
            beachball.setPosition((Math.random() * 20) - 10, 2, (Math.random() * 20) - 10); 
            this.addEntity(beachball);
        }

        for(let i = 0; i < 5; i++) {
            let barrel = entities.newBarrel(uuid());
            barrel.setPosition((Math.random() * 20) - 10, 1, (Math.random() * 20) - 10);
            this.addEntity(barrel);
        }

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

    /**
     * Add entity which is a static body.
     * This will place it in the "staticEntities" group so that it only gets sent to the client once,
     * when they first join. Saves unecessary skim calculation, i.e. if there are a lot of static bodies.
     * Cannot be removed as they are static, should not change. If a physically static body needs to be
     * removed, it should go in the normal entities group.
     */
    addStaticEntity(entity:Entity):void {
        if(!((entity.body.type == cannon.BODY_TYPES.STATIC) || (entity.body.mass == 0))) throw new Error(`Tried to add static entity that was not static ("${entity.type}")`);
        this.staticEntities[entity.id] = entity;
        this.physics.world.addBody(entity.body);
    }

    addPlayer(socket:io.Socket, data:Data.Join):void {
        this.sockets[socket.id] = new Socket(socket);

        const position = new Vector3((Math.random() * 10) - 5, 10, (Math.random() * 10) - 5);
        this.players[socket.id] = new Player(socket.id, striptags(data.username), position);

        this.physics.world.addBody(this.players[socket.id].body);

        this.sendInitData(socket);
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

    handleMouseInput(socket:io.Socket, state:Data.MouseInput):void {
        if(!this.players[socket.id]) return;
        this.players[socket.id].translateMouseInput(state);
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

    sendInitData(socket:io.Socket) {
        socket.emit(constants.msg.initdata, this.createInitData());
    }

    createInitData():serializedData.InitData {
        const staticEntities = Object.values<Entity>(this.staticEntities);

        return {
            staticEntities: staticEntities.map(e => e.serialize())
        }
    }

    createUpdate(player:Player, socket:Socket):serializedData.WorldSkim {
        let others = Object.values<Player>(this.players).map(p => p.serialize());
        _.remove(others, {
            id: player.id
        });
        let update = {
            time: Date.now(),
            me: player.serialize(),
            others,
            entities: Object.values<Entity>(this.entities).map(e => e.serialize())
        }

        let skim = socket.getSkim(update);

        return skim;
    }
}

export default Game;