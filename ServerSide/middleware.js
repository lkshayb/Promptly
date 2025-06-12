require('dotenv').config();
const {Client} = require("pg");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

//Connecting Postgres Server
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_q1FlLsyQ5uCV@ep-dry-bar-a9srva4a-pooler.gwc.azure.neon.tech/neondb?sslmode=require"
})

async function Verify_username(username) {
    await client.connect()
    const run = await client.query(`SELECT username FROM users WHERE username = $1`,[username])
    const urdb = run.rows[0].username
    if(urdb == username){
        return true
    }else{
        return false
    }
}

async function jwtmiddleware(req,res){
    const token = req.body.JWT;
    if(!token){
        return false
    }

    try{
        const user = await new Promise((resolve,reject) => {
            jwt.verify(token,jwt_secret,(err,decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            })
        })

        const username = user.data.username
        const verifyuser = await Verify_username(username)
        return !!verifyuser;
    } catch(error){
        console.log("JWT Verification Failed:",error.message);
        return false
    }
}


module.exports = {jwtmiddleware}