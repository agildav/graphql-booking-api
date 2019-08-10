import { buildSchema } from "graphql";

export const graphqlSchema = buildSchema(`
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    createdAt: String!
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

  type Auth {
    userId: ID!
    token: String!
    tokenExpiration: String!
    lastChecked: String
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input UserInput {
    email: String!
    password: String!
    username: String
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings: [Booking!]!
    login(authInput: AuthInput): Auth!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    registerUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking
    cancelBooking(bookingId: ID!): Event
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
