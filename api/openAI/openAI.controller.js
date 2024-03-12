const openAIService = require("./openAi.service")


async function send(req, res) {
    try {
        const { message } = req.body
        if (!message) throw res.status(406).json({ status: 'error', message: 'Message is missing' })

        const chatResponse = await openAIService.sendMessage(message)
        res.status(200).json({ status: 'ok', content: chatResponse })
    } catch (err) {
        throw err
    }
}

module.exports = {
    send
};