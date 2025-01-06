import { Router } from "express";
import passport from "passport";
const router = Router();

// Route : /api/auth/google
// Authenticate using Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
);

// Callback URL for google
router.get(
  "/callback/google",
  passport.authenticate("google", { failureRedirect: "/not-authenticated" }),
  (_req, res) => {
    res.redirect(process.env.FRONT_URL as string);
  },
);

// Route : /api/auth/github
// Authenticate using Github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

// Callback URL Github
router.get(
  "/callback/github",
  passport.authenticate("github", { failureRedirect: "/not-authenticated" }),
  (_req, res) => {
    res.redirect(process.env.FRONT_URL as string);
  },
);

// Route to check session data
router.get("/getsession", (req, res) => {
  console.log(req.cookies);
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export default router;
