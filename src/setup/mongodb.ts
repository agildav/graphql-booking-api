import { connect } from "mongoose";

export default class MongoDB {
  private static DB_USER = process.env.DB_USER;
  private static DB_PASSWORD = process.env.DB_PASSWORD;
  private static DB_CLUSTER = process.env.DB_CLUSTER;
  private static DB_NAME = process.env.DB_NAME;
  private static DB_OPTS = "retryWrites=true&w=majority";

  private static dbURL = `mongodb+srv://${MongoDB.DB_USER}:${MongoDB.DB_PASSWORD}@${MongoDB.DB_CLUSTER}/${MongoDB.DB_NAME}?${MongoDB.DB_OPTS}`;

  static async mongoDbInit(): Promise<any> {
    console.log(":: MongoDB, starting");

    return connect(
      MongoDB.dbURL,
      { useNewUrlParser: true }
    );
  }
}
