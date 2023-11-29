import io from "socket.io";
import * as serialized from "../shared/types/serializedData";

class Socket { // will later store information about the state of the socket, for the "skim" compression system
    socket:io.Socket;

    constructor(socket:io.Socket) {
        this.socket = socket;
    }
}

export default Socket;