import { Resource } from "sst";
import { Pool } from "pg";

export const dbPool = new Pool({
    user: Resource.MyDatabase.username,
    password: Resource.MyDatabase.password,
    database: Resource.MyDatabase.database,
    host: Resource.MyDatabase.host,
    port: Resource.MyDatabase.port,
});
await dbPool.connect();
