import { buildSchema } from "graphql";

export const graphqlSchema = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    username: String
    createdAt: String!
    createdEvents: [Event!]!
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
`);
