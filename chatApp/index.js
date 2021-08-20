const Websocket = require("ws");

const wss = new Websocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("new user connected");
  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      client.send(data);
    });
  });
  console.log(wss.clients.size);
  wss.on("close", () => {
    console.log("client disconnected");
  });
});
