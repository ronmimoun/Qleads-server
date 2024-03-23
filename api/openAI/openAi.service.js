const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function sendMessage(message) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": message }],
            max_tokens: 100,
        })
        const messageResponse = response.choices[0].message
        return messageResponse
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendMessage
};