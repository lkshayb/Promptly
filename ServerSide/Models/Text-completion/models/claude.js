const {Anthropic} = require('@anthropic-ai/sdk');
require('dotenv').config();
const api_key = process.env.CLAUDE_API_KEY;

async function claude_txt(req,res){
    const client = new Anthropic({apiKey: api_key});
    const prompt = req.body.prompt
    const response = client.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt}],
    });
    res.send(response)
    console.log("reached claude_txt")
    return response
}

module.exports = {claude_txt}