import { Pool } from "pg";
import { Resource } from "sst";

export const dbPool = new Pool({
    user: Resource.MyDatabase.username,
    password: Resource.MyDatabase.password,
    database: Resource.MyDatabase.database,
    host: Resource.MyDatabase.host,
    port: Resource.MyDatabase.port,
});
