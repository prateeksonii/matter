import { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
} from "./constants.server";
import { db } from "./db.server";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL!,
    clientID: AUTH0_CLIENT_ID!,
    clientSecret: AUTH0_CLIENT_SECRET!,
    domain: AUTH0_DOMAIN!,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const { emails, displayName } = profile;

    const user = await db.user.upsert({
      where: {
        email: emails[0].value,
      },
      create: {
        email: emails[0].value,
        name: displayName,
      },
      update: {},
    });

    return user;
  }
);

authenticator.use(auth0Strategy);
