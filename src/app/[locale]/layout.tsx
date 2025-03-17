import { BaseLayout } from "@/components/layouts/base-layout";
import { isValidLocale } from "@/utils/internalization";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

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
  
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  const bannerUrl = `${protocol}://${host}/images/opengrahp/${locale}.png`;

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${protocol}://${host}/${locale}`,
      siteName: 'Taletix',
      images: [{
        url: bannerUrl,
        width: 1200,
        height: 630,
        alt: t('title')
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [bannerUrl],
      creator: '@taletix'
    },
    other: {
      'og:image': bannerUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:url': `${protocol}://${host}/${locale}`,
      'og:type': 'website',
      'og:site_name': 'Taletix'
    }
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