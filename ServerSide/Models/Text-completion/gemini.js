require('dotenv').config();
const { GoogleGenAI } = require("@google/genai")


async function gemini_txt(req,res){
    const api_key = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: api_key });
    const prompt = req.body.prompt;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents : prompt
    });
    console.log("reached gemini_txt")
    res.send(response)
}

module.exports = {gemini_txt}