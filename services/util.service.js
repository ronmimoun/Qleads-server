const { CREDIT_VALUE } = require('../constants/credit')

module.exports = {
    getFirstLetterUppercase,
    getUsersOneWeekAgo,
    getTransactionsContactValueInCredit,
    generateRandomNumber,
    getContactValueInCredit
}

function getFirstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getUsersOneWeekAgo(users) {
    const ONE_WEEK_IN_MS = 604800000; // 1 week in milliseconds
    const oneWeekAgo = Date.now() - ONE_WEEK_IN_MS; // calculate the timestamp for one week ago
    return users.filter(user => {
        const joinDate = new Date(user.createdAt).getTime(); // convert the join date to a timestamp
        return joinDate >= oneWeekAgo && joinDate < Date.now(); // check if the join date falls within the past week
    });
}

function getTransactionsContactValueInCredit(contactTransactions) {
    return contactTransactions.price / CREDIT_VALUE
}

function getContactValueInCredit(price) {
    return price / CREDIT_VALUE
}

function generateRandomNumber(length) {
    let randomNumber = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        randomNumber += digits.charAt(randomIndex);
    }
    return randomNumber;
}