import { cn } from "@/utils/classes";
import { useTranslations } from "next-intl";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	className?: string;
}

interface ContentProps {
	children: React.ReactNode;
	className?: string;
}

interface BrandProps {
	children?: React.ReactNode;
	href?: string;
	className?: string;
}

interface SectionProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
}

interface ItemProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

interface StatusProps {
	status?: "working" | "vacations" | "offline"; // TODO: move this to /types
	className?: string;
}

export const Footer: React.FC<FooterProps> & {
	Brand: React.FC<BrandProps>;
	Content: React.FC<ContentProps>;
	Section: React.FC<SectionProps>;
	Item: React.FC<ItemProps>;
	Status: React.FC<StatusProps>;
} = ({ children, className = "" }) => {
	return (
		<footer className={cn("bg-bg", className)}>
			<div className="sm:p-4 p-6 mx-auto w-full max-w-screen-lg lg:py-8">
				<div className="md:flex md:justify-between">{children}</div>
			</div>
		</footer>
	);
};

Footer.Brand = ({ children, href = "#", className = "" }) => {
	return (
		<div className={cn("mb-6 md:mb-0", className)}>
			<a href={href} className="flex items-center">
				{children}
			</a>
		</div>
	);
};

Footer.Content = ({ children, className }) => {
	return (
		<div
			className={cn("md:flex md:justify-between w-full max-w-lg", className)}
		>
			{children}
		</div>
	);
};

Footer.Section = ({ title, children, className = "" }) => {
	return (
		<div className={className}>
			{title && (
				<h2 className="mb-6 text-sm font-semibold text-fg uppercase">
					{title}
				</h2>
			)}
			<ul className="text-fg/70 font-medium">{children}</ul>
		</div>
	);
};

Footer.Item = ({ href, children, className = "" }) => {
	return (
		<li className={cn("font-normal text-sm mb-4", className)}>
			<a href={href} className="hover:text-fg transition-colors">
				{children}
			</a>
		</li>
	);
};

Footer.Status = ({ status = "offline", className = "" }) => {
	const t = useTranslations("common.status");

	const statusColors = {
		working: "success",
		vacations: "warning",
		offline: "danger",
	} as const;

	return (
		<div
			className={cn(
				"flex items-center w-fit px-3 gap-x-2 h-7 border-[2px] border-dashed rounded-full",
				className,
			)}
			style={{ borderColor: `hsl(var(--${statusColors[status]}))` }}
		>
			<span className="relative flex size-2">
				<span
					className={cn(
						"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
						`bg-${statusColors[status]}`,
					)}
				/>
				<span
					className={cn(
						"relative inline-flex size-2 rounded-full",
						`bg-${statusColors[status]}`,
					)}
				/>
			</span>
			<span className="text-sm font-normal">{t(status)}</span>
		</div>
	);
};
