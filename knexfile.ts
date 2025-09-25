import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/app.db", // <-- CORRIGIDO: O banco agora fica dentro da pasta 'db'
    },
    useNullAsDefault: true,
    migrations: {
      extension: "ts",
      directory: "./db/migrations", // <-- CORRETO: As migrations já estavam aqui
    },
  },
};

export default config;