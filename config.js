require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = 'postgresql://qfdvdcqxzsyiql:841b4b524ee59694e981007fac92eff46183c42dd3fa7e3f12fae03485951f92@ec2-54-147-126-202.compute-1.amazonaws.com:5432/d7s1co5ivt82qu'

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = { pool }
