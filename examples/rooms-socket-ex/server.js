const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

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
        if (client !== sender && client.readyState === 1) {
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

console.log("ws://localhost:8080");