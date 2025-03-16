import { Heading } from "@/components/ui";
import { plansFreeMaintenancesMonths, plansPrice } from "@/config/pricing";
import { useCurrency } from "@/hooks/use-currency";
import type { Feature, Plan } from "@/types/pricing";
import {
	ArtboardToolIcon,
	CustomerSupportIcon,
	SaleTag02Icon,
	ShoppingCart02Icon,
	SmartPhone01Icon,
	StartUp01Icon,
	Wrench01Icon,
} from "hugeicons-react";
import { useFormatter, useTranslations } from "next-intl";

const mainFeatures: Record<Plan, Feature[]> = {
	star: ["free-maintenance", "basic-support"],
	"star-plus": ["free-maintenance", "e-commerce-integration", "brand-design"],
	"big-star": ["free-maintenance", "dedicated-support", "mobile-app-development"],
};

const featuresIcon: Record<string, React.ReactNode> = {
	"free-maintenance": <Wrench01Icon size={14} />,
	"dedicated-support": <CustomerSupportIcon size={14} />,
	"basic-support": <CustomerSupportIcon size={14} />,
	"brand-design": <ArtboardToolIcon size={14} />,
	"e-commerce-integration": <ShoppingCart02Icon size={14} />,
	"mobile-app-development": <SmartPhone01Icon size={14} />,
};

export function ProjectPreview({
	name,
	description,
	plan,
}: {
	name: string;
	description: string;
	plan: Plan;
}) {
	const t = useTranslations("content.start.project-preview");
	const tPlans = useTranslations("common.plans");
	const tFeatures = useTranslations("content.pricing.features");

	const formatter = useFormatter();
	const currency = useCurrency();

	return (
		<div className="relative flex flex-col max-w-lg p-3 w-full border border-dashed rounded-lg">
			<div className="absolute inline-flex items-center px-1.5 h-5 min-h-5  gap-x-1 -top-2.5 ring-2 ring-bg left-4 bg-primary text-[.7rem] text-primary-fg rounded-full z-10">
				<SaleTag02Icon size={14} /> Free <strong>Domain and Hosting!</strong>
			</div>
			<div className="inline-flex gap-x-5 justify-between">
				<div className="flex flex-col">
					<Heading level={3} className="sm:text-md">
						{name || t("name")}
					</Heading>
					<p className="text-muted-fg text-xs mt-2 line-clamp-2">
						{description || t("description")}
					</p>
				</div>
				<div className="flex flex-col min-w-fit text-nowrap">
					<span className="inline-flex items-center justify-end gap-x-2 text-sm text-muted-fg font-medium">
						<StartUp01Icon size={18} />
						{tPlans(plan)}
					</span>
					<span className="text-xs text-muted-fg mt-2">
						{formatter.number(plansPrice[plan].min, {
							style: "currency",
							currency,
						})}{" "}
						-{" "}
						{formatter.number(plansPrice[plan].max, {
							style: "currency",
							currency,
						})}{" "}
						<span className="text-[0.5rem] text-muted-fg">{currency}</span>
					</span>
				</div>
			</div>
			<div className="inline-flex items-center gap-x-3 mt-4 truncate">
				{mainFeatures[plan].map((feature) => {
					return (
						<span
							key={feature}
							className="inline-flex gap-x-1 items-center text-xs text-muted-fg"
						>
							{featuresIcon[feature]}
							<span className="max-w-[25ch] truncate">
								{tFeatures(`${feature}.heading`, {
									months: plansFreeMaintenancesMonths[plan],
								})}
							</span>
						</span>
					);
				})}
			</div>
		</div>
	);
}
