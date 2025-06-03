"use client";

import { TalentixBrandIcon } from "@/components/icons";
import { cn } from "@/utils/classes";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Link, Navbar, Keyboard, Footer, Separator } from "ui";
import PromoTopBar from "../landing/promo-bar";

interface ContentLayoutProps extends React.ComponentProps<typeof Navbar> {}

const navbarItems = [
	{
		id: "talents",
		href: "/talents",
	},
	{
		id: "projects",
		href: "/#projects",
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

const footerItems = {
	company: [
		{
			id: "about",
			href: "/about",
		},
		{
			id: "contact",
			href: "/contact",
		},
		{
			id: "talents",
			href: "/talents",
		},
		{
			id: "blog",
			href: "/blog",
		},
	],
	legals: [
		{
			id: "privacy",
			href: "/privacy",
		},
		{
			id: "terms",
			href: "/terms",
		},
		{
			id: "cookies",
			href: "/cookies",
		},
	],
	resources: [
		{
			id: "faq",
			href: "/faq",
		},
		{
			id: "help",
			href: "/help",
		},
		{
			id: "pricing",
			href: "/pricing",
		},
		{
			id: "status",
			href: "/status",
		},
	],
} as const;

const ContentLayout: React.FC<ContentLayoutProps> = ({
	children,
	...props
}) => {
	const t = useTranslations("content.layout");
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		pathname && setIsOpen(false);
	}, [pathname]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key.toLowerCase() === "p" &&
				!e.ctrlKey &&
				!e.altKey &&
				!e.metaKey
			) {
				router.push("/start");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [router]);

	return (
		<div className={"flex flex-col min-h-screen"}>
			<Navbar isOpen={isOpen} onOpenChange={setIsOpen} isSticky {...props}>
				<Navbar.Nav
					id="navbar"
					className={cn(
						pathname.endsWith("/pricing")
							? "bg-bg"
							: "bg-bg/85 backdrop-blur-sm",
					)}
				>
					<div
						className={
							"flex lg:flex-row flex-col mx-auto max-w-screen-lg w-full"
						}
					>
						<Navbar.Logo href="/">
							<span className="inline-flex items-center justify-center whitespace-pre font-bold font-mono uppercase text-md">
								<TalentixBrandIcon className="mr-1" size={18} strokeWidth={2} />
								Talentix<span className="text-sm lowercase">.dev</span>
							</span>
						</Navbar.Logo>
						<Navbar.Section className="w-full justify-center gap-x-6">
							{navbarItems.map((item) => (
								<Navbar.Item
									key={item.id}
									href={item.href}
									isCurrent={pathname.endsWith(item.href)}
								>
									{t(`navbar.items.${item.id}`)}
								</Navbar.Item>
							))}
						</Navbar.Section>
						<Navbar.Section className="ml-auto hidden lg:flex min-w-fit">
							<div className="flex items-center gap-x-2">
								<Link href={"/start"}>
									<Button intent="primary" size="extra-small">
										{t("navbar.buttons.getting-start")}
										<Keyboard keys={"P"} />
									</Button>
								</Link>
								<Button size="extra-small">
									{t("navbar.buttons.book-call")}
								</Button>
							</div>
						</Navbar.Section>
					</div>
				</Navbar.Nav>
				<Navbar.Compact>
					<Navbar.Flex>
						<Navbar.Trigger className="-ml-2" />
						<Separator orientation="vertical" className="h-6 sm:mx-1" />
						<Navbar.Logo href="/">
							<TalentixBrandIcon className="size-5" />
						</Navbar.Logo>
					</Navbar.Flex>
					<Navbar.Flex>
						<Navbar.Flex>
							<Button
								intent="primary"
								size="extra-small"
								onPress={() => router.push("")}
							>
								{t("navbar.buttons.getting-start")}
							</Button>
							<Button size="extra-small">
								{t("navbar.buttons.book-call")}
							</Button>
						</Navbar.Flex>
					</Navbar.Flex>
				</Navbar.Compact>
				<PromoTopBar />
				<Navbar.Inset>
					{children}
					<Footer>
						<div className="flex flex-col sm:gap-y-4 mb-6">
							<Footer.Brand href="/" className="flex flex-col gap-y-4">
								<span className="inline-flex items-center justify-center gap-x-1 text-2xl whitespace-pre font-bold font-mono uppercase">
									<TalentixBrandIcon size={23} strokeWidth={"4"} />
									Talentix
								</span>
							</Footer.Brand>
							<Footer.Status status="working" />
						</div>
						<Footer.Content>
							{Object.entries(footerItems).map(([title, items]) => (
								<Footer.Section
									key={title}
									title={t(
										`footer.titles.${title as keyof typeof footerItems}`,
									)}
								>
									{items.map((item) => (
										<Footer.Item key={item.id} href={item.href}>
											{t(`footer.items.${item.id}`)}
										</Footer.Item>
									))}
								</Footer.Section>
							))}
						</Footer.Content>
					</Footer>
				</Navbar.Inset>
			</Navbar>
		</div>
	);
};

export { ContentLayout, type ContentLayoutProps };
