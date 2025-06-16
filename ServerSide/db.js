require('dotenv').config();
const {Client} = require("pg");
const jwt = require("jsonwebtoken");
const { JWT_revoke } = require('./middleware');
const jwt_secret = process.env.JWT_SECRET;


//Connecting Postgres Server
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_q1FlLsyQ5uCV@ep-dry-bar-a9srva4a-pooler.gwc.azure.neon.tech/neondb?sslmode=require"
})

//Login Handler Function
async function LoginParams(username,password) {
    let token ;
    const result = await client.query(`SELECT username FROM users where username = $1`,[username]);

    if(result.rows.length>0){
        token = jwt.sign(
            {data: {
                    username : username,
                    password : password
                }
            }, jwt_secret, { expiresIn: '24h'}
        )
    } 

    if(!token){
        console.log("USER_NOT_FOUND")
    }

    if(token){
        const add_token = await client.query(`UPDATE users SET token = $1 WHERE username = $2`,[token,username])
        console.log("USER_FOUND, TOKEN:",token)
    }

    return token
    

}

//SignUp Handler Function
async function SignUpParams(username,password,email) {
    const cnt = await client.connect();
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

//Logout Handler Function
async function Logout(username,password,token) {
    const cnt = await client.connect()
    const command = await client.query(`SELECT * FROM users WHERE username = $1 `,[username]);
    if(command.rows.length > 0){
        const user = await new Promise((resolve,reject) => {
            jwt.verify(token,jwt_secret,(err,decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            })
        })
        console.log(user.data)
        if(user.data.username == username && user.data.password == password){
            console.log(await JWT_revoke(token))
        }
        
        return "LOGOUT SUCCESSFUL"
    }
}




async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL, 
            token VARCHAR UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
}
async function DropTable() {
    await client.connect()
    const result = await client.query(`
        DROP TABLE users
    `)
}

module.exports = {createUsersTable,LoginParams,SignUpParams,Logout}
