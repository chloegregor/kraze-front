
import { defineMiddleware } from "astro:middleware";

const MAINTENANCE = import.meta.env.MAINTENANCE === "true" ;

export const onRequest = defineMiddleware((context, next) => {
  if ( MAINTENANCE && context.url.pathname !== "/maintenance") {
    return context.rewrite("/maintenance");
  }

  return next();
});
