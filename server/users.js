const users = [];

const addUser = ({ id, name, room }) => {
    const originalName = name;
    const originalRoom = room;

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: `Username '${originalName}' is already taken in the room '${originalRoom}'` };
    }

    const user = {
        id,
        name,
        room,
        displayName: originalName.trim(),
        displayRoom: originalRoom.trim()
    };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
    const normalizedRoom = room.trim().toLowerCase();
    return users.filter((user) => user.room === normalizedRoom);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };