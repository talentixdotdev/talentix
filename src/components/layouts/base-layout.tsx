import { Providers } from "@/components/providers";
import { cn } from "@/utils/classes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

interface BaseLayoutProps {
	children: React.ReactNode;
	locale: string;
}

const inter = Inter({ subsets: ["latin"] });

const BaseLayout: React.FC<BaseLayoutProps> = async ({ children, locale }) => {
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link
					rel="shortcut icon"
					href="/icons/favicon.ico"
					type="image/x-icon"
				/>
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-C14GR2CWJP"
				/>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: internal script for Google Analytics.
					dangerouslySetInnerHTML={{
						__html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-C14GR2CWJP');
                        `,
					}}
				/>
			</head>
			<body className={cn(inter.className, "bg-bg antialiased")}>
				<Providers>
					<NextIntlClientProvider messages={messages}>
						{children}
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
};

export { BaseLayout, type BaseLayoutProps };
