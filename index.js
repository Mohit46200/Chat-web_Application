const http = require("http");
const express = require("express");
const path = require("path");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Create WebSocket server
const wss = new WebSocket.Server({ server }); //passing http server to websocket server

// When a new client connects
wss.on("connection", (socket) => {        //socket represents to client or user
    console.log("New client connected");

    // Send welcome message
    socket.send(
        JSON.stringify({
            type: "system",
            message: "Welcome to the chat!"
        })
    );

    // Receive message from client
    socket.on("message", (data) => {
        const message = JSON.parse(data);  //JSON.parse() converts that string back into a JavaScript object:

        console.log("Received:", message);

        // Send message to every connected client
        //wss.clients  => The WebSocket server maintains a collection of all connected clients. like user 1 , user2 , user3
        //client.readyState === WebSocket.OPEN => This checks whether the client is currently connected and ready to receive data.
        //client.readyState => {
            // Every WebSocket connection has a state.
            // For example:
            // CONNECTING
            // OPEN
            // CLOSING
            // CLOSED
        // }


        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(
                    JSON.stringify({
                        type: "chat",
                        username: message.username,
                        message: message.message
                    })
                );
            }
        });
    });

    // Client disconnected
    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

server.listen(9000, () => {
    console.log("Server started at http://localhost:9000");
});