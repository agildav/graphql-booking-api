import * as EventService from "../../api/event/event.service";
import * as UserService from "../../api/user/user.service";
import * as BookingService from "../../api/booking/booking.service";

export const graphqlResolvers = {
  // RootQuery
  events: async function events() {
    return EventService.getEvents();
  },
  users: async function users() {
    return UserService.getUsers();
  },
  bookings: async function bookings() {
    return BookingService.getBookings();
  },
  // RootMutation
  createEvent: async function createEvent(req) {
    return EventService.createEvent(req);
  },
  createUser: async function createUser(req) {
    return UserService.createUser(req);
  },
  bookEvent: async function bookEvent(req) {
    return BookingService.bookEvent(req);
  },
  cancelBooking: async function cancelBooking(req) {
    return BookingService.cancelBooking(req);
  }
};
