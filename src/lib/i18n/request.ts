import { isValidLocale } from "@/utils/internalization";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Configuration generator for Next-Intl internationalization.
 * Loads and merges locale messages from multiple sources based on the requested locale.
 *
 * @param {Object} params - Parameters provided by Next-Intl
 * @param {Promise<string>} params.requestLocale - The locale requested for the current page
 *
 * @returns {Promise<{
 *   locale: string,
 *   messages: Record<string, unknown>
 * }>} Configuration object containing:
 *   - locale: The resolved locale (falls back to default if invalid)
 *   - messages: Merged messages from main translations and Zod validation messages
 *
 * @example
 * // For a valid locale 'en':
 * // {
 * //   locale: 'en',
 * //   messages: {
 * //     // Combined messages from:
 * //     // - /messages/en.json
 * //     // - /messages/zod/en.json
 * //   }
 * // }
 */
export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!isValidLocale(locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: {
			// Load and merge main translation messages
			...(await import(`@/messages/${locale}.json`)).default,
			// Load and merge Zod validation messages
			...(await import(`@/messages/zod/${locale}.json`)).default,
		},
	};
});
