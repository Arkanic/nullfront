import constants from "../../shared/constants";

import Entity from "./entity";
import * as Data from "../../shared/types/inputObject";
import * as Serialized from "../../shared/types/serializedData";
import {Vector3} from "three";
import * as cannon from "cannon-es";
import {throttle, debounce} from "throttle-debounce";
import {playerMaterial} from "../physics/materials";

class Player extends Entity {
    username:string;
    keys:Data.KeyboardInput;
    canJump:boolean;
    lookingAt:cannon.Quaternion;

    private interactThrottle:debounce<() => void>;

    constructor(id:string, username:string, position:Vector3) {
        super(id);
        this.type = "player";

        this.username = username;
        this.body = new cannon.Body({
            mass: 70,
            linearDamping: 0.99,
            angularDamping: 0.5,
            material: playerMaterial
        });
        this.body.addShape(new cannon.Sphere(1));
        this.body.position.set(position.x, position.y, position.z);

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false,
            e: false
        }

        this.canJump = false;
        this.lookingAt = new cannon.Quaternion();

        const contactNormal = new cannon.Vec3();
        const upAxis = new cannon.Vec3(0, 1, 0);
        this.body.addEventListener("collide", (e:any) => {
            const {contact} = e;

            if(contact.bi.id === this.body.id) { // bi is the player
                contact.ni.negate(contactNormal);
            } else {
                contactNormal.copy(contact.ni);
            }

            if(contactNormal.dot(upAxis) > 0.5) {
                this.canJump = true;
            }
        });

        this.interactThrottle = debounce(400, this.interact.bind(this));
    }

    update() {
        super.update();

        // wasd movement
        let delta = new cannon.Vec3(0, 0, 0);
        if(this.keys.a) delta.x -= constants.player.acceleration;
        if(this.keys.d) delta.x += constants.player.acceleration;
        if(this.keys.w) delta.z -= constants.player.acceleration;
        if(this.keys.s) delta.z += constants.player.acceleration;
        let direction = this.lookingAt.vmult(delta);
        this.body.velocity.x += direction.x;
        this.body.velocity.z += direction.z;
        
        this.body.velocity.x = Math.min(constants.player.maxspeed, Math.max(-constants.player.maxspeed, this.body.velocity.x))
        this.body.velocity.z = Math.min(constants.player.maxspeed, Math.max(-constants.player.maxspeed, this.body.velocity.z))

        // jump
        if(this.keys.space && this.canJump) {
            this.body.velocity.y += constants.player.jumpspeed;
            this.canJump = false;
        }

        // interact
        if(this.keys.e) this.interactThrottle();
    }

    interact() {
        // do something!
        console.log("interact 2");
    }

    translateKeyboardInput(keys:Data.KeyboardInput):void {
        this.keys = keys;
    }

    translateMouseInput(mouse:Data.MouseInput):void {
        this.lookingAt.set(mouse.rotation.x, mouse.rotation.y, mouse.rotation.z, mouse.rotation.w);
    }

    serialize():Serialized.Player {
        return {
            ...super.serialize(),
            username: this.username
        }
    }
}

export default Player;