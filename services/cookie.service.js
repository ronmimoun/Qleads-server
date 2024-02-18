function generateSessionId() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const sessionIdLength = 32;
    let sessionId = '';
    for (let i = 0; i < sessionIdLength; i++) {
        sessionId += characters[Math.floor(Math.random() * characters.length)];
    }
    return sessionId;
}

function storeUserObject(userId) {
    document.cookie = `userId=${userId}; path=/;`;
}

function getStoredUser() {
    const userCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('user='));
    if (userCookie) {
        const userStr = userCookie.split('=')[1];
        return JSON.parse(userStr);
    }
    return null;
}


module.exports = {
    generateSessionId,
    storeUserObject,
    getStoredUser
}