import {Skim, SkimDifference} from "../util/skim";

export interface Vector3 {
    x:number;
    y:number;
    z:number;
}

export interface Quaternion {
    x:number;
    y:number;
    z:number;
    w:number;
}

export interface Entity {
    id:string;
    type:string;
    position:Vector3;
    rotation:Quaternion;
}

export interface Player extends Entity {
    username:string;
}

export interface Beachball extends Entity {
    radius:number;
}

export interface InitData {
    staticEntities:Array<Entity>;
}

export interface World {
    time:number;
    me:Player;
    others:Array<Player>;
    entities:Array<Entity>;
}

export interface WorldSkim {
    time:number;
    me:Player;
    others:Skim<Player>;
    entities:Skim<Entity>;
}

export interface WorldDifference {
    others:SkimDifference,
    entities:SkimDifference
}