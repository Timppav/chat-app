const users = [];
const MAX_LENGTH = 20;

const addUser = ({ id, name, room, picture }) => {
    const originalName = name;
    const originalRoom = room;

    if (originalName.length > MAX_LENGTH) {
        return { error: `Username cannot be longer than ${MAX_LENGTH} characters!` };
    }

    if (originalName.length < 1) {
        return { error: "Username cannot be blank!" };
    }

    if (originalRoom.length > MAX_LENGTH) {
        return { error: `Room name cannot be longer than ${MAX_LENGTH} characters` };
    }

    if (originalRoom.length < 1) {
        return { error: "Room name cannot be blank!" };
    }

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: `Username '${originalName}' is already taken in the room '${originalRoom}'` };
    }

    const defaultPicture = "avatar1";

    const user = {
        id,
        name,
        room,
        displayName: originalName.trim(),
        displayRoom: originalRoom.trim(),
        picture: picture || defaultPicture
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

module.exports = { addUser, removeUser, getUser, getUsersInRoom, MAX_LENGTH };