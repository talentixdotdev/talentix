"use client";

import { Button, Heading } from "ui";
import { AnimatedSection } from "@/components/landing/ui/animated-section";
import { Pricing } from "@/components/landing/ui/pricing";
import { useTranslations } from "next-intl";
import { plans, features, plansPrice, mainFeatures } from "@/config/pricing";
import type { Feature } from "@/types/pricing";
import Link from "next/link";

export const PricingCards: React.FC = () => {
	const t = useTranslations("content.pricing");

	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-self-center gap-6 mt-8">
			{plans.map((plan, index) => (
				<Pricing key={plan} isPrimary={index === plans.length - 1}>
					<Pricing.Header title={t(`plans.${plan}.name`)}>
						{t(`plans.${plan}.description`)}
					</Pricing.Header>
					<Pricing.Price
						minPrice={plansPrice[plan].min}
						maxPrice={plansPrice[plan].max}
					/>
					<Pricing.Features>
						{Object.keys(mainFeatures).map((feature) => (
							<Pricing.Feature
								key={feature}
								included={features[feature as Feature].includes(plan)}
							>
								{t(`features.${feature as Feature}.heading`)}
							</Pricing.Feature>
						))}
					</Pricing.Features>
					<Pricing.Footer>
						<Link href={`/start?plan=${plan}`}>
							<Button
								className="w-full"
								appearance="outline"
							>
								{plan === "big-star" ? t("contact-us") : t("start-now")}
							</Button>
						</Link>
					</Pricing.Footer>
				</Pricing>
			))}
		</div>
	);
};

export const PricingSection: React.FC = () => {
	const t = useTranslations("content.pricing");

	return (
		<AnimatedSection className="sm:mb-0 mb-0">
			<div className="flex flex-col items-center gap-y-4 mb-8">
				<Heading level={2} className="sm:text-4xl text-3xl">
					{t("heading")}
				</Heading>
				<p className="max-w-[50ch] text-center text-muted-fg">
					{t("description")}
				</p>
			</div>
			<PricingCards />
		</AnimatedSection>
	);
};
