import pg from 'pg'
const { Pool } = pg

async function dbConnect() {
    const client = new Pool({
        user: process.env.POSTGRES_USER,
        host: '127.0.0.1',
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
    })
    return await client
}

export default dbConnect