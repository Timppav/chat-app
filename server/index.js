const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

const formatUsers = (users) => {
    if (!Array.isArray(users)) return [];
    return users.map(u => ({
        id: u.id,
        name: u.displayName || u.name
    }));
};

io.on("connect", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        const usersInRoom = getUsersInRoom(user.room);

        io.to(user.room).emit("roomData", {
            room: user.displayRoom || user.room,
            users: formatUsers(usersInRoom)
        });

        socket.emit("message", {
            user: "System",
            text: `${user.displayName || user.name}, welcome to ${user.displayRoom || user.room}`
        });

        socket.broadcast.to(user.room).emit("message",{
            user: "System",
            text: `${user.displayName || user.name} has joined!`
        });

        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        if (!user) return callback("User not found!");

        io.to(user.room).emit("message",{
            user: user.displayName || user.name,
            text: message
        });

        const usersInRoom = getUsersInRoom(user.room);
        
        io.to(user.room).emit("roomData", {
            room: user.displayRoom || user.room,
            users: formatUsers(usersInRoom)
        });

        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", {
                user: "System",
                text: `${user.displayName || user.name} has left.`
            });

            const usersInRoom = getUsersInRoom(user.room);
            
            io.to(user.room).emit("roomData", {
                room: user.displayRoom || user.room,
                users: formatUsers(usersInRoom)
            });
        }
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));