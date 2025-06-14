const {GoogleGenAI , Modality} = require("@google/genai");
const fs = require("fs")
require('dotenv').config();


async function gemini_vid(req,res){
    console.log("reached gemini_vid")
    const api_key = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: api_key });

    const prompt = req.body.prompt;

    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) console.log(part.text)
    else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      res.send("Image saved as gemini-native-image.png");
    }
  }
}

module.exports = {gemini_vid}