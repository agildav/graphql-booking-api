import { Application } from "express";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";

// Receive these props from user
interface EventInput {
  title: string;
  description: string;
  price: number;
}

// Auto generate these props
interface Event extends EventInput {
  _id: string;
  date: string;
}

export default class Graphql {
  private events: [Event];

  constructor() {
    this.events = [
      {
        _id: Math.random().toString(),
        title: "title one",
        description: "description one",
        price: Math.random(),
        date: new Date().toISOString()
      }
    ];
  }

  graphqlInit(app: Application) {
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
          events: (): [Event] => {
            return this.events;
          },
          createEvent: (e: { eventInput: EventInput }): string => {
            const newEvent = {
              _id: Math.random().toString(),
              title: e.eventInput.title,
              description: e.eventInput.description,
              price: e.eventInput.price,
              date: new Date().toISOString()
            };

            this.events.push(newEvent);
            return newEvent._id;
          }
        },
        graphiql: true
      })
    );
  }
}
