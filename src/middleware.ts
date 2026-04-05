
import { defineMiddleware } from "astro:middleware";

const MAINTENANCE = import.meta.env.MAINTENANCE === "true" ;

export const onRequest = defineMiddleware((context, next) => {
 if (MAINTENANCE && context.url.pathname !== "/maintenance") {
  return new Response(
    '<meta http-equiv="refresh" content="0; url=/maintenance" />',
    { status: 302, headers: { "Content-Type": "text/html" } }
  );
}

  return next();
});
