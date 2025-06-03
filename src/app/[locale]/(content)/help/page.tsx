"use client";

import { Button, Heading } from "ui";
import { AnimatedSection } from "@/components/landing/ui/animated-section";
import { DotPattern } from "@/components/landing/ui/dot-pattern";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactSocial } from "@/components/contact/contact-social";
import { cn } from "@/utils/classes";
import { motion } from "motion/react";
import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";

export default function ContactPage() {
	const t = useTranslations("content.contact");

	return (
		<div className="relative flex flex-col items-center w-full">
			{/* Hero Section */}
			<section className="relative w-full max-w-5xl px-4 py-10 sm:py-16">
				<DotPattern
					className={cn(
						"[mask-image:radial-gradient(250px_circle_at_center,white,transparent)] -z-10",
					)}
				/>
				<div className="text-center space-y-4">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Heading level={1} className="sm:text-5xl text-4xl mb-4">
							{t("title")}
						</Heading>
					</motion.div>
					<motion.p
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-muted-fg max-w-2xl mx-auto text-lg"
					>
						{t("description")}
					</motion.p>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: 0.4 }}
						className="flex justify-center mt-8"
					>
						<Link href="https://cal.com/talentix/inciar-un-proyecto-con-talentix">
							<Button intent="primary" className="items-center gap-2 px-6">
								{t("cta.book-call")}
								<ArrowRight01Icon />
							</Button>
						</Link>
					</motion.div>
				</div>
			</section>

			<AnimatedSection className="px-4 max-w-5xl">
				<div className="grid lg:grid-cols-2 gap-12 w-full">
					<ContactForm />
					<ContactInfo />
				</div>
			</AnimatedSection>

			<AnimatedSection className="w-full max-w-screen-lg px-4 py-10 mb-16">
				<div className="text-center mb-10">
					<Heading level={2} className="mb-4">
						{t("social.title")}
					</Heading>
					<p className="text-muted-fg max-w-2xl mx-auto">
						{t("social.description")}
					</p>
				</div>
				<ContactSocial />
			</AnimatedSection>
		</div>
	);
}
