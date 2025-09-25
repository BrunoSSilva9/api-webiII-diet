import { knex as setupKnex, Knex } from "knex";
import config from "../knexfile";

export const knex: Knex = setupKnex(config.development);
