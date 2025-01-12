import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import {
  Strategy as GitHubStrategy,
  Profile as GitProfile,
} from "passport-github2";
import { URL } from "..";
import { findOrCreateUserWithOauth, findUserByproviderId} from "./prisma";

// Serialze User
passport.serializeUser(({id,provider}: any, cb: Function) => {
  cb(null,id={provider,providerId:id})
});

// Deserialize User
passport.deserializeUser(
  async (
    id: { provider: "google" | "github"; providerId: string },
    cb: Function,
  ) => {
    try {
      const { provider, providerId } = id;
      const user = await findUserByproviderId(provider,providerId)
      if (!user) {
        return cb(new Error("User not found"), null);
      }
      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  },
);
// GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${URL}/api/auth/callback/google`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: Function,
    ) => {
      try {
        // Assuming User.findOrCreate is a method that accepts a googleId and returns a user or creates one

        const user = await findOrCreateUserWithOauth('google',profile.id,accessToken,refreshToken,profile.name?.givenName as string, profile.photos?.[0].value as string,profile.emails?.[0].value )
        return cb(null, {id:profile.id,provider:'google'});
      } catch (err) {
        return cb(err, null);
      }
    },
  ),
);

//GitHubStratergy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${URL}/api/auth/callback/github`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GitProfile,
      cb: Function,
    ) => {
      try {
        const user = await findOrCreateUserWithOauth('github',profile.id,accessToken,refreshToken,profile.displayName as string,profile.photos?.[0].value as string,profile.emails?.[0].value)
        return cb(null, {id:profile.id,provider:'github'});
      } catch (err) {
        return cb(err, null);
      }
    },
  ),
);
