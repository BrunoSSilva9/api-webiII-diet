import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/app.db",
    },
    useNullAsDefault: true,
    migrations: {
      extension: "ts",
      directory: "./db/migrations",
    },
  },
};

export default config;
