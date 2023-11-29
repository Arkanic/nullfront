export interface Vector3 {
    x:number,
    y:number,
    z:number
}

export interface Quaternion {
    x:number,
    y:number,
    z:number,
    w:number
}

export interface Entity {
    id:string;
    type:string;
    position:Vector3,
    rotation:Quaternion
}

export interface Player extends Entity {
    username:string;
}