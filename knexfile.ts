export = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/config/database/db.sqlite",
    },
    migrations: {
      directory: "./src/config/database/migrations",
    },
    useNullAsDefault: true,
  },
};
