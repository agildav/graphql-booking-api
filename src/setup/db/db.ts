import knex from "knex";

let pg: knex;

export default function init(): Promise<any> {
  return new Promise((resolve, reject) => {
    pg = knex({
      client: "pg",
      connection: process.env.DATABASE_URL,
      searchPath: ["knex", "public"]
    });

    testConnection(pg, resolve, reject);
  });
}

export const getDatabase = (): knex => {
  return pg;
};

const testConnection = (db: knex, resolve, reject) => {
  db.raw("select 1")
    .then(function(resp) {
      resolve(":: PostgreSQL, OK");
    })
    .catch(err => {
      console.log(err);

      reject(":: PostgreSQL, FAIL");
    });
};
