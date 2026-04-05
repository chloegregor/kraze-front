import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const MAINTENANCE = import.meta.env.MAINTENANCE === "true";
  console.log("MAINTENANCE env:", import.meta.env.MAINTENANCE, typeof import.meta.env.MAINTENANCE);

  if (MAINTENANCE && context.url.pathname !== "/maintenance") {
    return Response.redirect(new URL("/maintenance", context.url), 302);
  }

  return next();
});
