"use client";

import type React from "react";
import {
	Calendar01Icon,
	Calendar02Icon,
	File01Icon,
	File02Icon,
	ZapIcon,
} from "hugeicons-react";
import { AnimatedSection } from "@/components/landing/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/landing/ui/dot-pattern";
import { cn } from "@/utils/classes";
import Image from "next/image";
import { TalentixBrandIcon } from "@/components/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PromotionPage: React.FC = () => {
	const t = useTranslations("content.promo");
	
	const benefits = [
		{
			icon: ZapIcon,
			text: t("benefits.items.responsive"),
		},
		{
			icon: Calendar01Icon,
			text: t("benefits.items.seo"),
		},
		{
			icon: File01Icon,
			text: t("benefits.items.social"),
		},
		{
			icon: ZapIcon,
			text: t("benefits.items.analytics"),
		},
		{
			icon: Calendar02Icon,
			text: t("benefits.items.maintenance"),
		},
		{
			icon: File02Icon,
			text: t("benefits.items.training"),
		},
	];

	return (
		<main className="min-h-screen overflow-hidden relative">
			<div className="container mx-auto px-4 max-w-6xl relative z-10">
				<AnimatedSection className="relative text-center">
					<DotPattern
						className={cn(
							"[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] top-20 -z-10",
						)}
					/>
					<Badge
						shape="circle"
						className="gap-x-1 mb-8 px-3 py-1.5 text-sm border border-dashed border-primary dark:text-primary-fg"
					>
						<ZapIcon
							className="size-5 min-w-5 min-h-5 text-primary"
							data-slot="icon"
						/>
						{t("badge")}
					</Badge>

					<h1 className="text-3xl md:text-6xl font-bold text-fg mb-6 md:mb-8 leading-8">
						{t("title.main")}
						<span className="block text-primary-fg bg-primary">{t("title.highlight")}</span>
					</h1>

					<p className="text-xl text-muted-fg mb-4 max-w-4xl mx-auto leading-relaxed">
						{t("description")}
					</p>
				</AnimatedSection>

				<AnimatedSection
					className="mb-8"
					motionProps={{
						variants: {
							visible: { transition: { duration: 0.6 } },
						},
					}}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{/* Card 1: Main Feature - Precio */}
						<div className="h-full bg-gradient-to-br from-primary to-accent rounded-3xl p-8 relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
							<div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-fg/5 to-primary-fg/10 rounded-3xl" />

							{/* Logo watermark */}
							<div className="absolute -bottom-8 -right-5 opacity-55 rotate-12 size-60 pointer-events-none">
								<TalentixBrandIcon className="w-full h-full text-primary-fg/45" />
							</div>

							<div className="relative z-10">
								<div className="mb-6">
									<p className="text-primary-fg/80 text-sm font-medium mb-2">
										{t("pricing.full_value")}
									</p>
									<p className="text-primary-fg/70 line-through text-2xl mb-4">
										{t("pricing.original_price")}
									</p>
									<div className="flex items-baseline gap-2">
										<span className="text-5xl font-bold text-primary-fg relative group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-300">
											{t("pricing.discounted_price")}
										</span>
										<span className="text-primary-fg/80 text-lg">{t("pricing.discount")}</span>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary-fg rounded-full" />
										<span className="text-primary-fg/90">
											{t("features.website")}
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary-fg rounded-full" />
										<span className="text-primary-fg/90">
											{t("features.hosting")}
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary-fg rounded-full" />
										<span className="text-primary-fg/90">
											{t("features.support")}
										</span>
									</div>
								</div>
							</div>
							<div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary-fg/10 rounded-full blur-xl group-hover:w-40 group-hover:h-40 transition-all duration-700" />
						</div>

						{/* Card 2: CTA Principal + Benefits */}
						<div className="h-full bg-overlay/5 backdrop-blur-sm border border-overlay-fg/10 rounded-3xl p-8 relative group hover:bg-overlay/10 transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col">
							<div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							{/* CTA Header */}
							<div className="relative z-10 mb-8">
								<h3 className="text-2xl font-bold text-fg mb-4">
									{t("cta.main")}
								</h3>
								<p className="text-muted-fg mb-6 leading-relaxed">
									{t("cta.description")}
								</p>
								<Link href="https://cal.com/talentix/reunion-de-1-hora-promocion-junio">
									<Button
										intent="primary"
										size="large"
										className="flex items-center gap-3 group w-full justify-center"
									>
										<Calendar01Icon
											className="w-5 h-5 !text-primary-fg"
											strokeWidth={1.5}
											data-slot="icon"
										/>
										{t("cta.button")}
										<span className="w-0 group-hover:w-4 transition-all duration-200 overflow-hidden">
											→
										</span>
									</Button>
								</Link>
							</div>

							{/* Benefits section */}
							<div className="relative z-10 flex-grow">
								<h4 className="text-lg font-semibold text-fg mb-4">
									{t("benefits.title")}
								</h4>
								<div className="grid grid-cols-1 gap-3">
									{benefits.slice(0, 4).map((benefit, index) => {
										const Icon = benefit.icon;
										return (
											<div
												key={index}
												className="flex items-center gap-3 group"
											>
												<div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors duration-300 group-hover:scale-110">
													<Icon className="w-4 h-4 text-accent" />
												</div>
												<span className="text-sm text-muted-fg group-hover:text-fg transition-colors duration-300">
													{benefit.text}
												</span>
											</div>
										);
									})}
								</div>
							</div>
							<Link href="/#projects">
								<Button
									appearance="outline"
									intent="primary"
									size="large"
									className="w-full flex items-center justify-center gap-3 group mt-6"
								>
									<File01Icon className="w-5 h-5" data-slot="icon" />
									{t("showcase")}
								</Button>
							</Link>
						</div>
					</div>
				</AnimatedSection>
			</div>
		</main>
	);
};

export default PromotionPage;
