import { makeZodI18nMap } from "@/lib/zod-errors-map";
import { useTranslations } from "next-intl";
import { z } from "zod";

/**
 * Custom hook to set up translated error messages for Zod.
 * Allows customizing Zod's error messages using translations obtained
 * with the `useTranslations` hook. Optionally, two different translation
 * functions can be passed: one for form messages (`tForm`) and another for custom messages (`tCustom`).
 *
 * @param {Object} options - Options to configure translations.
 * @param {Function} options.tForm - Translation function for form messages.
 * @param {Function} options.tCustom - Optional translation function for custom messages.
 */
export const useI18nZodErrors = ({
	tForm,
	tCustom,
}: {
	tForm: ReturnType<typeof useTranslations>;
	tCustom?: ReturnType<typeof useTranslations>;
}) => {
	const t = useTranslations("zod");

	z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
};
