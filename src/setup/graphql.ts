import graphqlHttp from "express-graphql";
import AuthService from "../api/auth/auth.service";
import { Application } from "express";
import { graphqlSchema } from "../graphql/schema";
import { graphqlResolvers } from "../graphql/resolvers";

/** Initialize GraphQL server */
export default class Graphql {
  static async graphqlInit(app: Application): Promise<void> {
    console.log(":: Setting auth middleware");
    app.use(AuthService.validateToken);

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
