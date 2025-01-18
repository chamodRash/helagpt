/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are accessible to the private (authenticated) users
 * These routes do not require authentication
 * @types {string[]}
 */
export const privateRoutes = [
  "/dashboard",
  "/account",
  "/billing",
  "/upgrade",
  "/notifications",
];

/**
 * An array of routes that are accessible to the public
 * These routes will redirect logged in users to /settings
 * @types {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

/**
 * An array of routes that are accessible to the admins
 * These routes will redirect logged in users to /
 * @types {string[]}
 */
export const adminRoutes = ["/admin"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used foe API authentication purposes
 * @types {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @types {string}
 */
export const USER_LOGIN_REDIRECT = "/";
export const ADMIN_LOGIN_REDIRECT = "/admin";
