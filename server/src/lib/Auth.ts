import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import {
  Strategy as GitHubStrategy,
  Profile as GitProfile,
} from "passport-github2";
import User from "../model/user";
import { URL } from "..";

// Serialze User
passport.serializeUser((user: any, cb: Function) => {
  if (user.googleId) {
    cb(null, { provider: "google", providerId: user.googleId });
  } else if (user.githubId) {
    cb(null, { provider: "github", providerId: user.githubId });
  } else {
    cb(new Error("Unknown provider"), null);
  }
});

// Deserialize User
passport.deserializeUser(
  async (
    id: { provider: "google" | "github"; providerId: string },
    cb: Function,
  ) => {
    try {
      const { provider, providerId } = id;
      const user = await User.findOne({ [`${provider}Id`]: providerId });
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
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      cb: Function,
    ) => {
      try {
        // Assuming User.findOrCreate is a method that accepts a googleId and returns a user or creates one
        const user = await User.findOrCreate({
          provider: "google",
          providerId: profile.id,
          email: profile.emails?.[0].value as string,
          name: profile.name?.givenName as string,
          avatar: profile.photos?.[0].value,
        });
        return cb(null, user);
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
      _accessToken: string,
      _refreshToken: string,
      profile: GitProfile,
      cb: Function,
    ) => {
      try {
        // Assuming User.findOrCreate is a method that accepts a githubId and returns a user or creates one
        const user = await User.findOrCreate({
          provider: "github",
          providerId: profile.id,
          email: profile.emails?.[0].value as string,
          name: profile.displayName as string,
          avatar: profile.photos?.[0].value,
        });
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    },
  ),
);
