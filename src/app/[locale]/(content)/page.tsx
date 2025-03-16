import { CallToAction } from "@/components/landing/sections/call-to-action";
import { Hero } from "@/components/landing/sections/hero";
import { PricingSection } from "@/components/landing/sections/pricing";
import { Projects } from "@/components/landing/sections/projects";
import { Reviews } from "@/components/landing/sections/reviews";
import { Services } from "@/components/landing/sections/services";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

const HomePage: React.FC<{
	params: Promise<{
		locale: string;
	}>
}> = ({ params }) => {
	const { locale } = use(params);
	setRequestLocale(locale)

	return (
		<main
			className={
				"flex flex-col items-center max-w-screen-lg w-full mx-auto min-h-screen sm:gap-y-20"
			}
		>
			<Hero />
			<Services />
			<Projects />
			<Reviews />
			<PricingSection />
			<CallToAction />
		</main>
	);
};

export default HomePage;
