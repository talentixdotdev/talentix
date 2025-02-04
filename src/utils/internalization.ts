import { routing } from "@/lib/i18n/routing";

/**
 * Validates if a given locale string is supported by the application.
 *
 * @param locale - The locale string to validate (e.g., "en", "es", "pt")
 * @returns boolean - True if the locale exists in the supported locales array, false otherwise
 *
 * @example
 * isValidLocale("en") // returns true
 * isValidLocale("xx") // returns false
 */
export const isValidLocale = (locale?: string): boolean => {
	// biome-ignore lint/suspicious/noExplicitAny: routing.locales is typed as readonly string[] with specific values
	return !!locale && routing.locales.includes(locale as any);
};
