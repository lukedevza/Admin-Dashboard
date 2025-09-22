/**
 * An array of routes that are used for auth
 * Routes will redirect logged in users to dashboard
 * @type {string[]}
 *
 * **/
export const authRoutes = ["/auth/login"];

/**
 * The Prefix for API Authentication routes
 * Routes that start with this prefix are used for API purposes
 * @type {string}
 *
 * **/
export const apiAuthPrefix = "/api/auth";

/**
 * The Default path after loggin in
 * @type {string}
 *
 * **/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
