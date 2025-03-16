"use client";

import { createContext, use, useContext } from "react";
import { Tick02Icon, CheckUnread03Icon } from "hugeicons-react";
import { cn } from "@/utils/classes";
import { useFormatter } from "next-intl";
import { useCurrency } from "@/hooks/use-currency";

type PricingContextType = {
	isPrimary?: boolean;
};

const PricingContext = createContext<PricingContextType>({
	isPrimary: false,
});

interface PricingProps {
	children: React.ReactNode;
	isPrimary?: boolean;
	className?: string;
}

export const Pricing = ({
	children,
	isPrimary = false,
	className,
}: PricingProps) => {
	return (
		<PricingContext.Provider value={{ isPrimary }}>
			<div
				className={cn(
					"flex flex-col flex-wrap gap-y-5 border border-dashed rounded-lg shadow-lg p-6",
					isPrimary
						? "bg-primary border-bg text-white sm:w-[350px]"
						: "bg-bg border-muted w-[320px]",
					isPrimary && "z-10",
					className,
				)}
			>
				{children}
			</div>
		</PricingContext.Provider>
	);
};

// Pricing Header Component
interface HeaderProps {
	title: string;
	children?: React.ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
	const { isPrimary } = useContext(PricingContext);

	return (
		<header className="flex flex-col gap-y-2">
			<h3 className={cn(isPrimary ? "text-2xl" : "text-xl", "font-bold")}>
				{title}
			</h3>
			{children && (
				<p
					className={cn("text-sm", isPrimary ? "opacity-80" : "text-muted-fg")}
				>
					{children}
				</p>
			)}
		</header>
	);
};

interface PriceProps {
	minPrice: number | `${number}`;
	maxPrice?: number | `${number}`;
	currency?: string;
}

const Price = ({ minPrice, maxPrice }: PriceProps) => {
	const formatter = useFormatter();
	const currency = useCurrency();

	const { isPrimary } = useContext(PricingContext);

	return (
		<div
			className={cn(
				"flex gap-x-3 items-center justify-center py-5",
				isPrimary && "scale-110",
			)}
		>
			<span className="text-4xl font-bold">
				{formatter.number(Number(minPrice), {
					style: "currency",
					currency,
					currencyDisplay: "narrowSymbol",
					notation: "compact",
				})}
			</span>
			{maxPrice && (
				<>
					<span>/</span>
					<div className="flex gap-x-1 items-end">
						<span className="text-4xl font-bold">
							{" "}
							{formatter.number(Number(maxPrice), {
								style: "currency",
								currency,
								currencyDisplay: "narrowSymbol",
								notation: "compact",
							})}
						</span>
						<span
							className={cn(
								isPrimary ? "opacity-80" : "text-muted-fg",
								"self-end text-xs uppercase",
							)}
						>
							{currency}
						</span>
					</div>
				</>
			)}
		</div>
	);
};

interface FeaturesProps {
	children: React.ReactNode;
}

const Features = ({ children }: FeaturesProps) => {
	const { isPrimary } = useContext(PricingContext);

	return (
		<ul
			className={cn(
				"flex flex-col gap-y-4 text-sm",
				isPrimary ? "opacity-80" : "text-muted-fg",
			)}
		>
			{children}
		</ul>
	);
};

interface FeatureProps {
	included?: boolean;
	children: React.ReactNode;
}

const Feature = ({ included = false, children }: FeatureProps) => {
	const { isPrimary } = useContext(PricingContext);

	return (
		<li className="inline-flex gap-x-2">
			{included ? (
				<Tick02Icon size={18} className={isPrimary ? "" : "text-success"} />
			) : (
				<CheckUnread03Icon size={18} />
			)}
			<span>{children}</span>
		</li>
	);
};

interface FooterProps {
	children: React.ReactNode;
	description?: string;
}

const Footer = ({ children, description }: FooterProps) => {
	const { isPrimary } = useContext(PricingContext);

	return (
		<footer className="flex flex-col gap-y-2 mt-auto">
			{description && (
				<p
					className={cn("text-xs", isPrimary ? "opacity-80" : "text-muted-fg")}
				>
					{description}
				</p>
			)}
			{children}
		</footer>
	);
};

Pricing.Header = Header;
Pricing.Price = Price;
Pricing.Features = Features;
Pricing.Feature = Feature;
Pricing.Footer = Footer;
