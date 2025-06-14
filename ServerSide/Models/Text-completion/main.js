const {sarvam_txt} = require('./models/sarvam')
const {gemini_txt} = require('./models/gemini')
const {claude_txt} = require('./models/claude')
const {openai_txt} = require('./models/openai')


function text_completion(req,res){
    if(req.body.model == "sarvam"){
        console.log("reached text_completion")
        return sarvam_txt(req,res);
    }
    if(req.body.model == "gemini"){
        console.log("reached text_completion")
        return gemini_txt(req,res);
    }
    if(req.body.model == "claude"){
        console.log("reached text_completion")
        return claude_txt(req,res);
    }
    if(req.body.model == "openai"){
        console.log("reached text_completion")
        return openai_txt(req,res);
    }
}

module.exports = {text_completion}