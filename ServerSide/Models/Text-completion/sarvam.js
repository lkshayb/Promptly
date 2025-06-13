const { SarvamAIClient } = require("sarvamai")
require('dotenv').config();
const api_key = process.env.SARVAM_API_KEY;

async function sarvam_txt(req,res){
    const client = new SarvamAIClient({apiSubscriptionKey: api_key});
    const prompt = req.body.prompt
    const response = await client.chat.completions({
        messages : [
            {
                role : "user",
                content : prompt
            }
        ]
    })
    res.send(response)
    console.log("reached sarvam_txt")
    return response
}

module.exports = {sarvam_txt}