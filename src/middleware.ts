import { routing } from "@/lib/i18n/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

/**
 * Next.js Middleware Configuration
 * Defines which paths the middleware should be executed for.
 *
 * @property {string[]} matcher - Array of path patterns to match against
 *
 * The regex pattern "/((?!api|_next|.*\\..*).*)":
 * - Matches all paths EXCEPT:
 *   - /api/* routes
 *   - /_next/* (Next.js internal routes)
 *   - Any path containing a file extension (e.g., .jpg, .css)
 *
 * Regex breakdown:
 * / - Starts with a forward slash
 * (             - Start capturing group
 *   (?!         - Negative lookahead (don't match if following pattern matches)
 *     api|      - "api" OR
 *     _next|    - "_next" OR
 *     .*\\..*   - Any file with extension (e.g., "image.jpg")
 *   )
 *   .*          - Match any remaining characters
 * )             - End capturing group
 *
 * @example
 * // Will execute middleware:
 * /
 * /about
 * /products/123
 * /en/about
 *
 * // Will NOT execute middleware:
 * /api/auth
 * /_next/static/chunks/...
 * /images/logo.png
 * /styles.css
 */
export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
