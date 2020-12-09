class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        this.io.on("connection", (socket) => {
            console.log(socket.id);
            //socket.emit("saludo", "Hola como estas?");
            socket.on("mensaje-to-server", (text) => {
                console.log("Recibido del ciente: ", text);
                this.io.emit("mensaje-from-server", text);
            });
        });
    }
}

module.exports = Sockets;