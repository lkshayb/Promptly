// write a function to create a users table in your database.
const {Client} = require("pg");
 
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_q1FlLsyQ5uCV@ep-dry-bar-a9srva4a-pooler.gwc.azure.neon.tech/neondb?sslmode=require"
})

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
    console.log(result)
}

createUsersTable();