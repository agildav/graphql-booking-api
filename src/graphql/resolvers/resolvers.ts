import * as EventService from "../../api/event/event.service";
import * as UserService from "../../api/user/user.service";

export const graphqlResolvers = {
  // RootQuery
  events: async function events() {
    return EventService.getEvents();
  },
  users: async function users() {
    return UserService.getUsers();
  },
  // RootMutation
  createEvent: async function createEvent(req) {
    return EventService.createEvent(req);
  },
  createUser: async function createUser(req) {
    return UserService.createUser(req);
  }
};
