const {sarvam_txt} = require('./sarvam')
// const {gemini_txt} = require('./gemini  ')

function text_completion(req,res){
    if(req.body.model == "sarvam"){
        console.log("reached text_completion")
        return sarvam_txt(req,res);
    }
    if(req.body.model == "gemini"){
        return gemini_txt();
    }
    if(req.body.model == "openai"){
        return openai_txt();
    }
}

module.exports = {text_completion}