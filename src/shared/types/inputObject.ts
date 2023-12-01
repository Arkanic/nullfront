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
    rotation: {
        x:number;
        y:number;
        z:number;
        w:number;
    }
}