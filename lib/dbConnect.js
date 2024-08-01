import pg from 'pg'
const { Client } = pg

async function dbConnect() {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 1337,
        database: 'db_name',
    })
    return await client
}

export default dbConnect