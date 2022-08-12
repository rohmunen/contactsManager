import 'dotenv/config'
import pkg from 'pg';
import { dbConfig } from '../config'
const { Pool } = pkg;
const pool = new Pool(dbConfig)

pool.query(`DROP TABLE IF EXISTS contacts; DROP TABLE IF EXISTS users;`)

pool.end()