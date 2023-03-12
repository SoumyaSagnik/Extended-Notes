# Socket io

Create two folders, client and server.

The Socket io library exists inside on an HTTP server. So we need to crete that server in order to use the library.

## Commands

- Navigate to client folder.

- npm create vite@latest

- cd `react-app-name`

- npm install

- npm i socket.io-client

- npm run dev

- Navigate to server folder.

- npm init -y

- Create a file index.js inside the server folder.

- npm i express cors nodemon socket.io

```javascript
"scripts": {
    "start": "nodemon index.js"
  }

  // package.json of server
```

- npm start

## Server

```javascript
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("Server running at 3001");
});
```

- app is our instance of the express server.

- http is the instance of the HTTP library.

- { Server } from ("socket.io") is a class.

- cors is a middleware preventing connection errors between the server and client.

- server is how we create http server with express.

- io is the variable which we'll be using to do anything related to socket.io in our backend.

- To the io variable we pass in our http server and information related to cors.

- origin is where your react app is running. 5173 is where react + vite runs.

- methods is what requests we'll allow/ accept.

## How Socket io works

- You create certain events, and you name those events.

- You can either listen to an event or emit an event.

- Emitting an event means sending some data to all the people listening to that event.

- From above you can see our backend server is running at port `3001` and our frontend is running at port `5173`.

- Setting up our frontend socket.io code.

- `An important point to note is that we can't emit an event from one client to another client. We can emit an event from client to the backend and the backend can further emit the event to another client. This is the main concept of socket.io. Thus the backend is necessary as a layer to connect various events.`

- io was the variable in our server that was responsible for socketio events as mentioned above. in order to listen to events from client side we need to do `io.on()`.

---

## Establishing connection between client and server using socket io

```javascript
// App.jsx i.e., client

import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
// Server running at 3001 that's why

const App = () => {
  const sendMessage = () => {};

  return (
    <div id="App">
      <input type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
```

```javascript
// index.js i.e., server

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(3001, () => {
  console.log("Server running at 3001");
});
```

Refresh the browser and you'll see socket ids connected in the console (server console).

Now we need to send real messages between two clients. Here's how to achieve this.

```javascript
// client

import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");
// Server running at 3001 that's why

const App = () => {
  const [value, setValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message: value });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveValue(() => data.message);
    });
  }, [socket]);

  return (
    <div id="App">
      <div id="top">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div id="bottom">
        <h1>Message</h1>
        <div className="mess-area">{receiveValue}</div>
      </div>
    </div>
  );
};

export default App;
```

```javascript
// server

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server running at 3001");
});
```

In the `client` side, we're emitting an event on `send_message` with the value of whatever is present in the input field at that time.

In the `server` side, we're listening on `send_message` event and emitting an event with the name of `receive message` and sending the data which we received earlier from frontend. The broadcast here basically means sending the message to anyone whose listening to that event except for himself. So we're receiving the message from frontend and sending the same message to all other frontends except the frontend from which we received the message, just like a chat room.

Back in the `client` side, we're listening on `receive_message` and we're displaying whatever is being sent from the server here in the mess-area div.

## Sending message to specific people (Room)

A room in socket.io is like a restricted channel. Only those having access to the channel will receive messages sent to the channel, just like a whatsappp group.

```javascript
// server

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server running at 3001");
});
```

```javascript
// Client

import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");
// Server running at 3001 that's why

const App = () => {
  const [value, setValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message: value, room: room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setReceiveValue(() => data.message);
    });
  }, [socket]);

  return (
    <div id="App">
      <div id="rooms">
        <input
          type="text"
          placeholder="Room Number..."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
      <div id="top">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div id="bottom">
        <h1>Message</h1>
        <div className="mess-area">{receiveValue}</div>
      </div>
    </div>
  );
};

export default App;
```

We're just emitting the event of `receive_message` from server to client to a particular room instead of broadcasting it.
