// Update with your config settings.

const sharedConfig = {
  client: 'pg', // this property tells knex which type of db we're using
  pool: {
    // this property configures how many db connections are open
    // at a time to do multiple queries at once
    min: 2,
    max: 10
  },
  migrations: {
    // this property configures the table used to keep track
    // of our migration files and the location of the files
    // in our project
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
};

module.exports = {
  development: {
    ...sharedConfig, // ... when used with objects will merge in all properties
    connection: {
      // this property tells knex where our db can be found
      // (e.g. username, password, ip, db name, etc)
      database: 'fotorol_dev'
    }
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'fotorol_staging'
    }
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'fotorol_production'
    }
  }
};
