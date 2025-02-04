"use client";

import { TalentixBrandIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Keyboard } from "react-aria-components";
import { Button, Link, Navbar } from "ui";

interface ContentLayoutProps extends React.ComponentProps<typeof Navbar> {}

const navbarItems = [
	{
		id: "talents",
		href: "/talents",
	},
	{
		id: "companies",
		href: "/",
	},
	{
		id: "freelancers",
		href: "/freelancers",
	},
	{
		id: "blog",
		href: "/blog",
	},
	{
		id: "pricing",
		href: "/pricing",
	},
	{
		id: "support",
		href: "/help",
	},
] as const;

const ContentLayout: React.FC<ContentLayoutProps> = ({
	children,
	...props
}) => {
	const t = useTranslations("content.navbar");

	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		pathname && setIsOpen(false);
	}, [pathname]);

	return (
		<div className="flex flex-col min-h-screen delay-100 duration-500 animate-in fade-in-50 slide-in-from-top-12 fill-mode-backwards">
			<Navbar isOpen={isOpen} onOpenChange={setIsOpen} isSticky {...props}>
				<Navbar.Nav className="bg-bg/60 backdrop-blur-sm border-none">
					<div className={"flex mx-auto max-w-screen-lg w-full"}>
						<Navbar.Logo href="/">
							<span className="inline-flex items-center justify-center whitespace-pre font-bold font-mono uppercase text-md">
								<TalentixBrandIcon size={18} />
								Talentix
							</span>
						</Navbar.Logo>
						<Navbar.Section className="w-full justify-center gap-x-6">
							{navbarItems
								.filter((item) =>
									item.id === "talents" || item.id === "companies"
										? pathname !== item.href
										: true,
								)
								.map((item) => (
									<Navbar.Item
										key={item.id}
										href={item.href}
										isCurrent={pathname.endsWith(item.href)}
									>
										{t(`items.${item.id}`)}
									</Navbar.Item>
								))}
						</Navbar.Section>
						<Navbar.Section className="ml-auto hidden lg:flex min-w-fit">
							<div className="flex items-center gap-x-2">
								<Link href={"/login"}>
									<Button intent="primary" size="extra-small">
										{t("buttons.getting-start")}
										<Keyboard
											className={
												"bg-secondary text-xs text-secondary-fg px-1.5 py-0.5 rounded-md border border-muted"
											}
										>
											P
										</Keyboard>
									</Button>
								</Link>
								<Button size="extra-small">{t("buttons.book-call")}</Button>
							</div>
						</Navbar.Section>
					</div>
				</Navbar.Nav>
				<Navbar.Compact>
					<Navbar.Flex>
						<Navbar.Trigger className="-ml-2" />
						<span className="font-bold font-mono uppercase text-sm">
							Talentix
						</span>
					</Navbar.Flex>
					<Navbar.Flex>
						<Navbar.Flex>
							<Button intent="primary" size="extra-small">
								{t("buttons.getting-start")}
							</Button>
							<Button size="extra-small">{t("buttons.book-call")}</Button>
						</Navbar.Flex>
					</Navbar.Flex>
				</Navbar.Compact>
				<Navbar.Inset>{children}</Navbar.Inset>
			</Navbar>
		</div>
	);
};

export { ContentLayout, type ContentLayoutProps };
