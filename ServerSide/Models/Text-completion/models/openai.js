const { OpenAI } = require("openai")
require('dotenv').config();
const api_key = process.env.OPENAI_API_KEY;

async function openai_txt(req,res){
    const client = new OpenAI({apiKey : api_key});
    const prompt = req.body.prompt
    const response = await client.chat.completions.create({
        model : "gpt-4.1",
        messages : [
            {
                role : "user",
                content : prompt
            }
        ]
    })
    res.send(response.choices[0].message.content)
    console.log("reached openai_txt")
    return response
}

module.exports = {openai_txt}