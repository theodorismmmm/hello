const WebSocket = require("ws");
const port = process.env.PORT || 10000;

const server = new WebSocket.Server({ port });

server.on("connection", socket => {
  console.log("New user connected");

  socket.on("message", msg => {
    // Broadcast message to all clients
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  socket.on("close", () => {
    console.log("User disconnected");
  });
});

console.log("WebSocket server running on port " + port);
