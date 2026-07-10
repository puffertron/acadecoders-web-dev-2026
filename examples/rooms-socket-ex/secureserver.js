const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

// 1. Load your SSL/TLS certificates
// Replace 'path/to/...' with the actual paths to your certificate files
const serverConfig = {
    key: fs.readFileSync("keys/private.key"),
    cert: fs.readFileSync("keys/certificate.crt")
};

// 2. Create an HTTPS server
const httpsServer = https.createServer(serverConfig);

// 3. Attach the WebSocket server to the HTTPS server
const wss = new WebSocket.Server({ server: httpsServer });

const rooms = new Map();

function join(room, ws) {
    if (!rooms.has(room)) rooms.set(room, new Set());
    rooms.get(room).add(ws);
    ws.room = room;
}

function leave(ws) {
    const room = ws.room;
    if (!room) return;

    const set = rooms.get(room);
    if (set) {
        set.delete(ws);
        if (set.size === 0) rooms.delete(room);
    }
}

function broadcast(room, data, sender) {
    const set = rooms.get(room);
    if (!set) return;

    for (const client of set) {
        if (client !== sender && client.readyState === WebSocket.OPEN) { // Using standard constant
            client.send(JSON.stringify(data));
        }
    }
}

wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        let data;
        try { data = JSON.parse(msg); } catch { return; }

        if (data.type === "join") {
            join(data.room, ws);
        }

        if (data.type === "state") {
            broadcast(ws.room, {
                type: "state",
                id: data.id,
                x: data.x,
                y: data.y
            }, ws);
        }
    });

    ws.on("close", () => leave(ws));
});

// 4. Start the HTTPS server on port 8080
httpsServer.listen(8080, () => {
    console.log("wss://localhost:8080");
});