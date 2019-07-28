import { Application } from "express";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";

export function graphqlInit(app: Application) {
  console.log(":: Setting GraphQL");
  app.use(
    "/graphql",
    graphqlHttp({
      schema: buildSchema(`
        type RootQuery {
          events: [String!]!
        }

        type RootMutation {
          createEvent(name: String): String
        }

        schema {
          query: RootQuery
          mutation: RootMutation
        }
      `),
      rootValue: {
        events: () => {
          return ["Romantic Cooking", "Sailing"];
        },
        createEvent: args => {
          const eventName = args.name;
          return eventName;
        }
      },
      graphiql: true
    })
  );
}
