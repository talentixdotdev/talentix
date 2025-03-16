"use client";

import { Heading } from "ui";
import { BentoGrid } from "@/components/landing/ui/bento-grid";
import { Safari } from "../ui/safari";
import { Iphone } from "../ui/iphone";
import { AnimatedSection } from "../ui/animated-section";
import { AnimatedBeamAI } from "../animated-beam-ai";
import { OrbitingCirclesDesign } from "../orbit-circles-design";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/classes";

export const Services: React.FC = () => {
	const t = useTranslations("content.landing.sections.services");

	const servicesKey = {
		"web-development": {
			children: (
				<Safari
					imageSrc="https://startup-template-sage.vercel.app/hero-dark.png"
					url="talentix.dev"
					className="absolute max-w-lg -top-44 opacity-65"
				/>
			),
			className: "sm:col-span-3 sm:row-span-3 sm:aspect-video sm:pt-12 sm:min-h-fit min-h-[400px]",
		},
		"integrations-and-social-networks": {
			children: <OrbitingCirclesDesign />,
			className: "sm:row-span-3 sm:col-start-4 sm:col-span-2 sm:min-h-fit min-h-[340px]",
		},
		"ai-integrations": {
			children: <AnimatedBeamAI />,
			className: "sm:row-span-2 sm:row-start-4 sm:col-span-2 sm:min-h-fit min-h-[340px]",
		},
		"mobile-development": {
			children: (
				<Iphone
					src="https://startup-template-sage.vercel.app/hero-dark.png"
					className="absolute sm:max-w-xs max-w-[17.5rem] -top-20 opacity-65"
				/>
			),
			className: "sm:col-span-3 sm:row-span-2 sm:row-start-4 sm:min-h-fit min-h-[500px]",
		},
	} as const;

	return (
		<AnimatedSection>
			<div className="flex flex-col gap-y-4 sm:mb-8 mb-4">
				<Heading level={2} className="sm:text-4xl text-3xl text-center">
					{t("heading")}
				</Heading>
				<p className="max-w-[50ch] text-center text-muted-fg">
					{t("description")}
				</p>
			</div>

			<BentoGrid className="max-w-5xl w-full mx-auto mt-8">
				{Object.entries(servicesKey).map(([key, value]) => (
					<BentoGrid.Item
						classNames={{
							innerWrapper: "flex flex-col items-center justify-center",
						}}
						className={cn(value.className)}
						key={key}
						title={t(`items.${key as keyof typeof servicesKey}.heading`)}
						description={t(
							`items.${key as keyof typeof servicesKey}.description`,
						)}
					>
						{value.children}
					</BentoGrid.Item>
				))}
			</BentoGrid>
		</AnimatedSection>
	);
};
