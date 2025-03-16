import { cn } from "@/utils/classes";
import { Button } from "./button";
import { useTranslations } from "next-intl";
import { Heading } from "./heading";
import { MinusSignCircleIcon, Tick02Icon } from "hugeicons-react";
import Link from "next/link";

export interface PricingTableProps
	extends React.HTMLAttributes<HTMLTableElement> {}

const PricingTable: React.FC<PricingTableProps> & {
	Header: typeof Head;
	Column: typeof Column;
	Row: typeof Row;
	Body: typeof Body;
	Cell: typeof CellText;
	CellBoolean: typeof CellBoolean;
} = ({ children, className, ...props }) => (
	<table className={cn("w-full border-collapse", className)} {...props}>
		{children}
	</table>
);

export interface PricingHeadProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}

const Head: React.FC<PricingHeadProps> = ({ children, ...props }) => {
	const t = useTranslations("content.pricing");

	return (
		<thead className="sticky top-0 lg:top-[3.4rem] bg-bg z-10" {...props}>
			<tr>
				<th className="p-6 min-w-[300px] border border-dashed text-fg/70 text-start">
					<div>
						<span className="text-xl text-fg">{t("feature")}</span>
					</div>
				</th>
				{children}
			</tr>
		</thead>
	);
};

export interface PricingColumnProps
	extends React.HTMLAttributes<HTMLTableCellElement> {
	intent: "primary" | "secondary";
	href: string;
}

const Column: React.FC<PricingColumnProps> = ({
	href,
	children,
	className,
	intent,
	...props
}) => {
	const t = useTranslations("content.pricing");

	return (
		<th className="min-w-[150px] p-6 border border-dashed" {...props}>
			<div className="flex lg:flex-row flex-col gap-3 items-center justify-between w-full">
				{children}
				<Link href={href}>
					<Button size="small" intent={intent} className="h-full max-h-12">
						{intent === "primary" ? t("contact-us") : t("start-now")}
					</Button>
				</Link>
			</div>
		</th>
	);
};

export interface PricingRowProps
	extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "title"> {
	title: React.ReactNode;
	description: React.ReactNode;
}

const Row: React.FC<PricingRowProps> = ({
	title,
	description,
	children,
	...props
}) => {
	return (
		<tr className="border border-dashed" {...props}>
			<td className="p-6">
				<Heading level={3}>{title}</Heading>
				<p className="text-muted-fg mt-1">{description}</p>
			</td>
			{children}
		</tr>
	);
};

const CellBoolean: React.FC<{
	active: boolean;
	intent: "primary" | "secondary";
}> = ({ active, intent }) => (
	<td className="p-6 text-center">
		<div className="flex justify-center">
			{active ? (
				<Tick02Icon
					className={intent === "primary" ? "text-primary" : "text-muted-fg"}
				/>
			) : (
				<MinusSignCircleIcon
					className={intent === "primary" ? "text-primary" : "text-muted-fg"}
				/>
			)}
		</div>
	</td>
);

const CellText: React.FC<{ text: string; intent: "primary" | "secondary" }> = ({
	text,
	intent,
}) => (
	<td
		className={cn(
			"p-6 text-center text-sm text-muted-fg",
			intent === "primary" && "text-primary",
		)}
	>
		{text}
	</td>
);

export interface PricingBodyProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}

const Body: React.FC<PricingBodyProps> = ({ children, ...props }) => {
	return <tbody {...props}>{children}</tbody>;
};

PricingTable.Body = Body;
PricingTable.Header = Head;
PricingTable.Column = Column;
PricingTable.Row = Row;
PricingTable.Cell = CellText;
PricingTable.CellBoolean = CellBoolean;

export { PricingTable };
