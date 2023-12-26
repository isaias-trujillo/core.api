import {Client} from "mysql";

export default class MySqlRepository {
  public constructor() {}

  public  async connect() {
    return await new Client().connect({
      hostname: Deno.env.get("MYSQL_HOST") ?? "localhost",
      port: parseInt(Deno.env.get("MYSQL_PORT") ?? "3306"),
      username: Deno.env.get("MYSQL_USER") ?? "root",
      password: Deno.env.get("MYSQL_PASSWORD") ?? "",
      db: Deno.env.get("MYSQL_DB") ?? "surveys",
    });
  }
}
