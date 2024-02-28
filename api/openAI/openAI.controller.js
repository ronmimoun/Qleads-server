const { openai } = require("./openAi.service")


async function send(req, res) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": "How are you?" }],
            max_tokens: 100,
        })
        console.log('response', response)
    } catch (err) {
        console.log('err', err)
        res.status(500).json(err);
    }
}

module.exports = {
    send
};