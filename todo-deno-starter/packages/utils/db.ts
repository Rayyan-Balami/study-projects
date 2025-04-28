import { Client } from 'jsr:@db/postgres';

const client = new Client({
  user: 'root',
  password: '1234',
  database: 'study',
  hostname: 'localhost',
  port: 5432,
});
await client.connect();

//export const db = client;
export const db = client;