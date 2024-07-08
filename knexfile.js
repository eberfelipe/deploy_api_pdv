require('dotenv').config();

const { DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: DATABASE_URL,
      //ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: DATABASE_URL,
      //ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
