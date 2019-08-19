import graphqlHttp from "express-graphql";
import AuthService from "../api/auth/auth.service";
import { Application } from "express";
import { graphqlSchema } from "../graphql/schema";
import { graphqlResolvers } from "../graphql/resolvers";

/** GraphQL server */
export default class Graphql {
  /** Initialize GraphQL server */
  static async graphqlInit(app: Application): Promise<any> {
    console.log(":: Setting auth middleware");
    app.use(AuthService.validateToken);

    console.log(":: Setting GraphQL");
    const endpoint = "/graphql";

    return app.use(
      endpoint,
      graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
      })
    );
  }
}
