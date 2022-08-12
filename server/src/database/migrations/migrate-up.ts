import pg from 'pg'
import { pgConfig, dbConfig } from '../config'
import 'dotenv/config'

const createDbIfNotExists = async () => {
  const dbName = process.env.DB_NAME

  const client = new pg.Pool(pgConfig)

  console.log(process.env.DB_PORT)

  const dbs = await client.query('SELECT datname FROM pg_database;')

  if (dbs.rows.findIndex(db => db.datname === dbName.toLowerCase()) === -1) {
    console.log('creating new db')
    await client.query(`CREATE DATABASE ${dbName}`)
  }
  client.end()
}

const checkForTables = async () => {
  const client = new pg.Pool(dbConfig)
  try {
    const tables = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';`)
    if (tables.rows.findIndex(table => table.table_name === 'users' || table.table_name === 'contacts') === -1) {
      console.log('creating new tables')
      await client.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        email VARCHAR(100),
        password VARCHAR(100),
        nickname VARCHAR(30)
      );
      `)
      await client.query(`
      CREATE TABLE contacts (
        id SERIAL PRIMARY KEY,
        creator UUID,
        FOREIGN KEY (creator) REFERENCES users (id),
        name VARCHAR(40),
        phone VARCHAR(20)
      );
      `)
    }
  } catch (error) {
    console.log('error checking for tables ' + error)
  }
  client.end()
}

export const migrateUp = async () => {
  await createDbIfNotExists()
  await checkForTables()
}

migrateUp()