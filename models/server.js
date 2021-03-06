const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Socket = require("./sockets");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {
            cors: {
                origin: false,
                methods: ["GET", "POST"],
            },
        });
    }

    middlewares() {
        this.app.use("/", express.static(path.resolve(__dirname, "../public")));
        this.app.use(cors());
    }
    configurarSockets() {
        new Socket(this.io);
    }
    execute() {
        //iniciar middlewares
        this.middlewares();
        //Inicializar sockets
        this.configurarSockets();
        //Iniciar server
        this.server.listen(this.port, () => {
            console.log(`Server corriento en puerto ${this.port}`);
        });
    }
}

module.exports = Server;