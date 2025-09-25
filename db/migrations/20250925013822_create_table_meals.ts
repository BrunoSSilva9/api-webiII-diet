import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary();
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.boolean('is_on_diet').notNullable();
    table.timestamp('date_and_time').notNullable();
    table.uuid('user_id').references('id').inTable('users').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}