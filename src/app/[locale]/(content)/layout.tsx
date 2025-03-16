import { type BaseLayoutProps, ContentLayout } from "@/components/layouts";
import { routing } from "@/lib/i18n/routing";

const ContentPagesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <ContentLayout>{children}</ContentLayout>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default ContentPagesLayout;
