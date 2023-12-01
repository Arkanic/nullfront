import {Quaternion} from "./serializedData";

export interface Join {
    username:string;
}

export interface KeyboardInput {
    w:boolean;
    a:boolean;
    s:boolean;
    d:boolean;
}

export interface MouseInput {
    rotation:Quaternion
}