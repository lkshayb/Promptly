const {gemini_vid} = require('./models/gemini')

function image_generation(req,res){
    if(req.body.model == "gemini"){
        console.log("reached image_generation")
        return gemini_vid(req,res);
    }
}

module.exports = {image_generation}