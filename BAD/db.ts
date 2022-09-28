import pg from 'pg'
import dotenv from 'dotenv'

// -------------------------------------------------------------------------------------------------------------------
// client setting
// -------------------------------------------------------------------------------------------------------------------
//DEAD CODE
dotenv.config()
export const client = new pg.Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	// host: process.env.DB_HOST,
})
//DEAD CODE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^