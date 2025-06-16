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
    if(!token) return false
    async function checkrevoke(token) {
        const runit = await client.query(`SELECT * FROM revoked_tokens WHERE token = $1`,[token])
        if(runit.rows.length > 0){
            return false
        }
    } 
    try{
        const revoke = await checkrevoke(token);
        const user = await new Promise((resolve,reject) => {
            jwt.verify(token,jwt_secret,(err,decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            })
        })

        const verifyuser = await Verify_username(user.data.username)
        return !!verifyuser;
    } catch(error){
        console.log("JWT Verification Failed:",error.message);
        return false
    }
}

async function JWT_revoke(token){
    await client.connect()
    const decoded = jwt.decode(token)
    const expires_at = new Date(decoded.exp * 1000);
    const run = await client.query(`INSERT INTO revoked_tokens(token,expires_at) VALUES ($1,$2) ON CONFLICT DO NOTHING`,[token,expires_at])
    return("TOKEN REVOKED SUCCESSFULLY")
}


module.exports = {jwtmiddleware,JWT_revoke}