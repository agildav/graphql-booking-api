import EventService from "../api/event/event.service";
import UserService from "../api/user/user.service";
import BookingService from "../api/booking/booking.service";
import AuthService from "../api/auth/auth.service";
import { IAuthMiddleware } from "../api/auth/auth.model";

export const graphqlResolvers = {
  // RootQuery
  events: async function events(args, req: IAuthMiddleware) {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    return EventService.getEvents();
  },
  users: async function users(args, req: IAuthMiddleware) {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    return UserService.getUsers();
  },
  bookings: async function bookings(args, req: IAuthMiddleware) {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    return BookingService.getBookings();
  },
  login: async function login(args: any, req) {
    return AuthService.login(args);
  },

  // ------------------------------------------------------------------------------------------------

  // RootMutation
  createEvent: async function createEvent(args: any, req: IAuthMiddleware) {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    return EventService.createEvent(args, req.userId);
  },
  registerUser: async function registerUser(args: any, req) {
    return UserService.registerUser(args);
  },
  bookEvent: async function bookEvent(args: any, req: IAuthMiddleware) {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    return BookingService.bookEvent(args, req.userId);
  },
  cancelBooking: async function cancelBooking(args: any, req: IAuthMiddleware) {
    if (!req.isAuth) {
      throw new Error("unauthenticated");
    }

    return BookingService.cancelBooking(args);
  }
};
