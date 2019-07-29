import { Application } from "express";
import graphqlHttp from "express-graphql";
import { buildSchema } from "graphql";

import { IEventInput, Event, IEvent } from "../api/event/event.model";

export default class Graphql {
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
          events: async (): Promise<IEvent[]> => {
            try {
              const events = await Event.find();
              return events;
            } catch (err) {
              console.log(err);
              throw err;
            }
          },
          createEvent: async (e: {
            eventInput: IEventInput;
          }): Promise<string> => {
            const newEvent = new Event({
              title: e.eventInput.title,
              description: e.eventInput.description,
              price: e.eventInput.price,
              date: new Date().toISOString()
            });

            try {
              const r = await newEvent.save();
              return r._id;
            } catch (err) {
              console.log(err);
              throw err;
            }
          }
        },
        graphiql: true
      })
    );
  }
}
