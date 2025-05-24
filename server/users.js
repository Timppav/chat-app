const users = [];
const MAX_LENGTH = 20;

const colors = [
    "userRed", // 1
    "userOrange", // 2
    "userEmerald", // 3
    "userGreen", // 4
    "userCyan", // 5
    "userBlue", // 6
    "userPurple", // 7
    "userPink", // 8
    "userPeach", // 9
    "userLime", // 10
    "userTeal", // 11
    "userSky", // 12
    "userWineRed", // 13
    "userAmber", // 14
    "userLavender", // 15
];

const usedColors = [];

const getRandomColor = () => {
    if (colors) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        colors.splice(randomIndex, 1);
        usedColors.push(randomColor);
        return randomColor;
    } else {
        return null;
    }
};

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
    const userColor = getRandomColor();

    const user = {
        id,
        name,
        room,
        displayName: originalName.trim(),
        displayRoom: originalRoom.trim(),
        picture: picture || defaultPicture,
        color: userColor
    };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        const removedUserColor = users[index].color;
        usedColors.forEach((color, index) => {
            if (color === removedUserColor) {
                usedColors.splice(index, 1);
                colors.push(removedUserColor);
            };
        });
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
    const normalizedRoom = room.trim().toLowerCase();
    return users.filter((user) => user.room === normalizedRoom);
}

export default { addUser, removeUser, getUser, getUsersInRoom, MAX_LENGTH };