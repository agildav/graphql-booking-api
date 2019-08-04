import { Application } from "express";
import graphqlHttp from "express-graphql";
import { graphqlSchema } from "../graphql/schema/schema";
import { graphqlResolvers } from "../graphql/resolvers/resolvers";

export default class Graphql {
  async graphqlInit(app: Application): Promise<void> {
    console.log(":: Setting GraphQL");
    const endpoint = "/graphql";

    app.use(
      endpoint,
      graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
      })
    );

    return;
  }
}
