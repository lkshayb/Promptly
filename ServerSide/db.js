require('dotenv').config();
const {Client} = require("pg");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

//Connecting Postgres Server
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_q1FlLsyQ5uCV@ep-dry-bar-a9srva4a-pooler.gwc.azure.neon.tech/neondb?sslmode=require"
})

//Login Handler Function
async function LoginParams(username,password) {
    let token ;
    await client.connect();
    const result = await client.query(`SELECT username FROM users where username = $1`,[username]);

    if(result.rows.length>0){
        token = jwt.sign(
            {data: {
                    username : username,
                    password : password
                }
            }, jwt_secret, { expiresIn: '1h'}
        )
    } 

    if(!token){
        console.log("USER_NOT_FOUND")
    }

    if(token){
        console.log("USER_FOUND, TOKEN:",token)
    }

    return token
    

}

//SignUp Handler Function
async function SignUpParams(username,password,email) {
    await client.connect();
    const exists = await client.query(`SELECT username FROM users where username = $1 OR email = $2`,[username,email]);
    if (exists.rows.length > 0){
        return  "USER_ALREADY_EXIST"
    }else{
        const add = await client.query(`INSERT INTO users(username,email,password) VALUES ($1,$2,$3)`,[username,email,password])
        if(add){
            return "USER CREATED SUCCESSFULLY , PROCEED TO LOGIN PAGE"
        }
    }
}


async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
}
 
module.exports = {createUsersTable,LoginParams,SignUpParams}
