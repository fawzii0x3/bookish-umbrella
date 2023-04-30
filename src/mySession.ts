import session from "express-session";
import { redisStore } from "./Cache/redis";

export default {
  name: process.env.COOKIE_NAME,
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: "keyboard cat",
  cookie: {
    httpOnly: true,
    sameSite:"lax",
    secure:false,// ! in prod set it to true
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  },
} as session.SessionOptions;
