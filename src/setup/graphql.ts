import { Application } from "express";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";

import * as EventService from "../api/event/event.service";

export default class Graphql {
  async graphqlInit(app: Application): Promise<void> {
    console.log(":: Setting GraphQL");

    app.use(
      "/graphql",
      graphqlHttp({
        schema: buildSchema(`
                type Event {
                  _id: ID!
                  title: String!
                  description: String!
                  price: Float!
                  date: String!
                }

                input EventInput {
                  title: String!
                  description: String!
                  price: Float!
                }

                type RootQuery {
                  events: [Event!]!
                }

                type RootMutation {
                  createEvent(eventInput: EventInput): ID
                }

                schema {
                  query: RootQuery
                  mutation: RootMutation
                }
              `),
        rootValue: {
          // RootQuery
          async events() {
            return EventService.getEvents();
          },
          // RootMutation
          async createEvent(req) {
            return EventService.createEvent(req);
          }
        },
        graphiql: true
      })
    );

    return;
  }
}
