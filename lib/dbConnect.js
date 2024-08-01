import pg from 'pg'
const { Client } = pg

async function dbConnect() {
    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'db_name',
        password: 'postgres',
        port: 5432,
    })
    return await client
}

export default dbConnect