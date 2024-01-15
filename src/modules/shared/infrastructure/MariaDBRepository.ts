import {Client} from "https://deno.land/x/mysql@v2.12.1/mod.ts";

export default class MariaDBRepository {
  public constructor() {}

  public  async connect() {
    return await new Client().connect({
      hostname: "localhost",
      port: 3306,
      username: "root",
      password: "",
      db: "pregrade",
    });
  }
}
