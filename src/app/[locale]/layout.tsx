import { BaseLayout } from "@/components/layouts/base-layout";
import { isValidLocale } from "@/utils/internalization";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });

  const bannerPath = `/images/opengraph/${locale}.png`;

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [bannerPath]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [bannerPath]
    },
    metadataBase: new URL("https://talentix.dev")
  };
}

const LocaleLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>
> = async ({ children, params }) => {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
};

export default LocaleLayout;