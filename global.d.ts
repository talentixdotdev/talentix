import type en from "@/messages/en.json";
import type zodMessages from "@/messages/zod/en.json";

/**
 * Type definition for internationalization (i18n) messages.
 * Combines base UI messages and Zod validation messages.
 * Uses the English messages as the base structure for type safety.
 *
 * This type is used for Next-Intl TypeScript integration, providing
 * type completion and validation when using translation keys.
 *
 * @example
 * // In your component with Next-Intl:
 * import { useTranslations } from 'next-intl';
 *
 * function MyComponent() {
 *   const t = useTranslations();
 *
 *   return (
 *   	<div>
 *       	{t("welcome")}
 *   	</div>
 *   )
 * }
 *
 */
type Messages = typeof en & typeof zodMessages;

declare global {
	/**
	 * Global type declaration for Next-Intl library TypeScript integration.
	 * Extends the base IntlMessages interface with our combined message structure.
	 *
	 * This type augmentation enables TypeScript to:
	 * - Provide autocomplete for translation keys
	 * - Type check translation keys usage
	 * - Show proper types in Next-Intl hooks and components
	 *
	 * @example
	 * // TypeScript will enforce type safety in Next-Intl hooks:
	 * const t = useTranslations();
	 * t('non.existent.key'); // TypeScript error
	 * t('welcome'); // OK
	 *
	 * // And in Next-Intl components:
	 * <Trans
	 *   key="buttons.submit" // TypeScript validates this key
	 *   values={{ count: 5 }}
	 * />
	 */
	interface IntlMessages extends Messages {}
}
