import { Application } from "express";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";

import * as EventService from "../api/event/event.service";
import * as UserService from "../api/user/user.service";

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

                type User {
                  _id: ID!
                  email: String!
                  password: String!
                  username: String
                  createdAt: String!
                }

                input EventInput {
                  title: String!
                  description: String!
                  price: Float!
                }

                input UserInput {
                  email: String!
                  password: String!
                  username: String
                }

                type RootQuery {
                  events: [Event!]!
                  users: [User!]!
                }

                type RootMutation {
                  createEvent(eventInput: EventInput): ID
                  createUser(userInput: UserInput): ID
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
          async users() {
            return UserService.getUsers();
          },
          // RootMutation
          async createEvent(req) {
            return EventService.createEvent(req);
          },
          async createUser(req) {
            return UserService.createUser(req);
          }
        },
        graphiql: true
      })
    );

    return;
  }
}
