import pkg from 'pg';
import { dbConfig } from './config'
const { Pool } = pkg;
const pool = new Pool(dbConfig)

const connectDB = async () => {
  try {
    await pool.connect()
  } catch (error) {
    console.log('error connecting to db ' + error)
  }
  console.log('connected to db')
}

export { pool, connectDB }