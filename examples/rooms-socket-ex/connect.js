<<<<<<< HEAD
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const usernameE = document.getElementById("username")
const ipE = document.getElementById("ip address")

let ws;

let players;
let me;
let room;

let keys;

let username;
let ip;

const button = document.getElementById("connect");

let connected = false;



button.addEventListener("click", () => {
	username = usernameE.value;
	ip = ipE.value;
	if (!connected) {
		connect();
		connected = true;
	}
});


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 70;
}
resize();
window.addEventListener("resize", resize);


function connect() {
// --- WebSocket ---
ws = new WebSocket(`ws://${ip}:8080`);

id = username + Math.random().toString().slice(2, 5);
	
room = "page1";

players = {};

me = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 4
};

keys = {};



ws.onopen = () => {
    ws.send(JSON.stringify({
        type: "join",
        room
    }));
    loop(); // start game only when connected
};

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === "state") {
        players[data.id] = { x: data.x, y: data.y };
    }
};

}

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// --- update movement ---
function update() {
    if (keys["w"] || keys["arrowup"]) me.y -= me.speed;
    if (keys["s"] || keys["arrowdown"]) me.y += me.speed;
    if (keys["a"] || keys["arrowleft"]) me.x -= me.speed;
    if (keys["d"] || keys["arrowright"]) me.x += me.speed;

    ws.send(JSON.stringify({
        type: "state",
        id,
        x: me.x,
        y: me.y
    }));

    players[id] = { x: me.x, y: me.y };
}

// --- draw ---
function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	

    for (const pid in players) {
        const p = players[pid];

        ctx.fillStyle = pid === id ? "lime" : "white";
        ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
	ctx.font="12px Monospace"
	ctx.fillText(pid, p.x, p.y - 50)
    }
}

function loop() {
    if (connected){
	update();
    	draw();
    	requestAnimationFrame(loop);
    }
    

}


loop();
=======
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 70;
}
resize();
window.addEventListener("resize", resize);

// --- WebSocket ---
// SECURE VERSION:
const ws = new WebSocket("wss://localhost:8080");
// UNSECURE (EASIER):
const ws = new WebSocket("ws://localhost:8080");


const id = Math.random().toString(36).slice(2);
const room = "page1";

const players = {};

const me = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 4
};

const keys = {};

ws.onopen = () => {
    ws.send(JSON.stringify({
        type: "join",
        room
    }));
    loop(); // start game only when connected
};

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === "state") {
        players[data.id] = { x: data.x, y: data.y };
    }
};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// --- update movement ---
function update() {
    if (keys["w"] || keys["arrowup"]) me.y -= me.speed;
    if (keys["s"] || keys["arrowdown"]) me.y += me.speed;
    if (keys["a"] || keys["arrowleft"]) me.x -= me.speed;
    if (keys["d"] || keys["arrowright"]) me.x += me.speed;

    ws.send(JSON.stringify({
        type: "state",
        id,
        x: me.x,
        y: me.y
    }));

    players[id] = { x: me.x, y: me.y };
}

// --- draw ---
function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const pid in players) {
        const p = players[pid];

        ctx.fillStyle = pid === id ? "lime" : "white";
        ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
    
}
loop();
>>>>>>> 48d97b6bff4d9a6236be0bb5bfa9964bec3d53dc
