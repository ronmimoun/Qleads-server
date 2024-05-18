const { genericError } = require("../../models/errors/genericError")
const openAIService = require("./llm.service")


async function send(req, res, next) {
    try {
        const { message } = req.body
        if (!message) throw res.status(406).json({ status: 'error', message: 'Message is missing' })

        const chatResponse = await openAIService.sendMessage(message)
        res.status(200).json({ status: 'ok', content: chatResponse })
    } catch (err) {
        next(err)
    }
}

async function getContactLLMInfoSearch(req, res, next) {
    try {
        const { name, lastName, jobTitle, company } = req.body
        if (!name || !lastName || !jobTitle || !company) throw genericError(res, 422);

        const prompt = `information on ${name} ${lastName} ${jobTitle} at ${company} on linkedin`
        const response = await openAIService.sendMessage(prompt);
        res.status(200).json({ status: 'ok', content: response.content })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    send,
    getContactLLMInfoSearch,
};