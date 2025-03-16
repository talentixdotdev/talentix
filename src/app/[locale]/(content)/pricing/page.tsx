"use client";

import { PricingCards } from "@/components/landing/sections/pricing";
import { PricingTable } from "@/components/ui/pricing-table";

import {
	plans,
	features,
	plansFreeMaintenancesMonths,
	maintenancesPrice,
} from "@/config/pricing";
import { useCurrency } from "@/hooks/use-currency";

import type { Feature } from "@/types/pricing";
import { useFormatter, useTranslations } from "next-intl";
import { Heading } from "ui";

export default function PricingPage() {
	const t = useTranslations("content.pricing");
	const formatter = useFormatter();
	const currency = useCurrency();

	return (
		<main
			className={
				"flex flex-col items-center max-w-screen-xl sm:px-10 px-6 w-full mx-auto min-h-screen gap-y-12 py-20"
			}
		>
			<section className="w-full flex flex-col justify-center items-center gap-y-6 text-center">
				<Heading level={1} className={"sm:text-6xl text-5xl"}>
					{t("heading")}
				</Heading>
				<p className="text-lg text-muted-fg max-w-[45ch]">{t("description")}</p>
			</section>

			<PricingCards />

			<section className="flex flex-col items-center w-full gap-y-12 mt-16">
				<div className="flex flex-col gap-y-3 text-center mb-8">
					<Heading level={2} className="sm:text-4xl text-3xl">
						{t("features.heading")}
					</Heading>
					<p className="text-muted-fg max-w-[50ch] text-lg">
						{t("features.description")}
					</p>
				</div>

				<PricingTable>
					<PricingTable.Header>
						{plans.map((plan) => (
							<PricingTable.Column
								href={`/start?plan=${plan}`}
								key={plan}
								intent={plan === "big-star" ? "primary" : "secondary"}
							>
								<Heading level={2}>{t(`plans.${plan}.name`)}</Heading>
							</PricingTable.Column>
						))}
					</PricingTable.Header>
					<PricingTable.Body>
						{Object.keys(features).map((feature) => (
							<PricingTable.Row
								key={feature}
								title={t(`features.${feature as Feature}.heading`)}
								description={t(`features.${feature as Feature}.description`)}
							>
								{plans.map((plan) =>
									feature === "maintenance" ? (
										<PricingTable.Cell
											key={plan}
											intent={plan === "big-star" ? "primary" : "secondary"}
											text={t("values.free-maintenance", {
												months: plansFreeMaintenancesMonths[plan],
												price: formatter.number(maintenancesPrice[plan], {
													style: "currency",
													currency: currency,
													currencyDisplay: "symbol",
													notation: "compact",
												}),
											})}
										/>
									) : (
										<PricingTable.CellBoolean
											key={plan}
											active={features[feature as Feature].includes(plan)}
											intent={plan === "big-star" ? "primary" : "secondary"}
										/>
									),
								)}
							</PricingTable.Row>
						))}
					</PricingTable.Body>
				</PricingTable>
			</section>
		</main>
	);
}
