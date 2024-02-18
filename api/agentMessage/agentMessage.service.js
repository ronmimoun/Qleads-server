const AgentMessage = require('./agentMessage.model')
const User = require("../user/user.model")

async function get() {
    try {
        const entities = await AgentMessage.find({})
        return entities
    } catch (err) {
        throw err
    }
}

async function getByContactId(contactId) {
    try {
        const entity = await AgentMessage.findOne({ 'contact._id': contactId })
        return entity
    } catch (error) {
        throw error
    }
}

async function add(agentMessage) {
    try {
        const newAgentMessage = new AgentMessage(agentMessage)
        const savedEntity = await newAgentMessage.save()
        return savedEntity
    } catch (err) {
        throw err
    }
}

async function getUsersWithMessages() {
    try {
        const query = {
            agentMessages: { $exists: true, $not: { $size: 0 } }
        }
        const users = await User.find(query).exec();
        return users
    } catch (err) {
        throw err
    }
}

module.exports = {
    get,
    add,
    getByContactId,
    getUsersWithMessages,
}