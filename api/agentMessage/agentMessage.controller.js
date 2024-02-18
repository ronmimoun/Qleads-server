const agentMessageService = require("./agentMessage.service")
const contactService = require("../contact/contact.service")
const userService = require("../user/user.service")
const AgentMessage = require("./agentMessage.model")

//GET ALL CATEGORIES
async function get(req, res) {
    try {
        const entities = await agentMessageService.get()
        res.status(200).json({ status: 'ok', content: entities })
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getByContactId(req, res) {
    try {
        const { id } = req.params
        const entity = await agentMessageService.getByContactId(id)
        res.status(200).json({ status: 'ok', content: entity })
    } catch (error) {
        res.status(500).json(error)
    }
}

//CREATE
async function create(req, res) {
    try {
        const { user, body } = req

        // Checks if there is a userId
        if (!user._id) return res.status(410).json({ status: 'error', message: 'User id is missing' })

        // Checks if the contact has agent
        const contact = await contactService.getById(body.contactId)

        if (!contact.agent) return res.status(410).json({ status: 'error', message: "Contact doesn't have an agent" })

        const { _id: agentId } = contact.agent
        if (!agentId) return res.status(410).json({ status: 'error', message: "Contact doesn't have an agent" })

        // Getting the user info
        const userToUpdate = await userService.getById(user._id)

        const content = {
            ...body,
            userId: userToUpdate._id,
            username: userToUpdate.username,
            agentId,
            contact
        }

        // Update the user agentMessages
        const agentMessage = new AgentMessage(content)
        userToUpdate.agentMessages.unshift(agentMessage)
        const savedUser = await userService.update(userToUpdate)

        // Save the entity on the agent message collection in DB
        const savedEntity = await agentMessageService.add(content)
        res.status(200).json({ status: 'ok', content: { agentMessage: savedEntity, savedUser } })
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get users with agent messages
async function getUsersWithMessages(_, res) {
    try {
        const users = await agentMessageService.getUsersWithMessages()
        res.status(200).json({ status: 'ok', content: users })
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = {
    get,
    create,
    getByContactId,
    getUsersWithMessages,
}