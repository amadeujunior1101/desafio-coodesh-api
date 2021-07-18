import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary;

    /*  table.enum("gender", ["male", "female"]),
      table.string("title"),
      table.string("first"),
      table.string("last"),
      table.string("street"),
      table.string("city"),
      table.string("state"),
      table.string("postcode"),
      table.string("latitude"),
      table.string("longitude");

    table.string("offset"),
      table.string("description"),
      table.string("email"),
      table.string("uuid"),
      table.string("username"),
      table.string("password"),
      table.string("salt"),
      table.string("md5"),
      table.string("sha1"),
      table.string("sha256"),
      table.string("date"),
      table.integer("age"),
      table.string("date"),
      table.string("age"),
      table.string("phone"),
      table.string("cell"),
      table.string("name"),
      table.string("value"),
      table.string("large"),
      table.string("medium"),
      table.string("thumbnail"),
      table.string("nat");*/

    table.json("json_user");
  });
}
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable("users");
}
