import { Providers } from "@/components/providers";
import { cn } from "@/utils/classes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

interface BaseLayoutProps {
	children: React.ReactNode;
	locale: string;
}

const inter = Inter();

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
