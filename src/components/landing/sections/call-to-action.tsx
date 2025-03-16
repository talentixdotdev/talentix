import { Button, Heading } from "ui";
import { DotPattern } from "@/components/landing/ui/dot-pattern";
import { LineShadowText } from "@/components/landing/ui/line-shadow-text";
import { cn } from "@/utils/classes";
import { useTranslations } from "next-intl";

export const CallToAction: React.FC = () => {
	const t = useTranslations("content.landing.sections.call-to-action");

	return (
		<section className="relative w-full px-6">
			<div className="group relative overflow-hidden flex flex-col items-center justify-center mx-auto sm:gap-y-10 gap-y-6 w-full max-w-screen-lg h-96 my-14 bg-primary rounded-lg">
				<DotPattern
					className={cn(
						"group-hover:scale-110 duration-300 transition-transform [mask-image:radial-gradient(550px_circle_at_center,transparent,white)] fill-white",
					)}
				/>
				<Heading
					level={2}
					className="sm:text-6xl text-4xl text-center text-primary-fg font-bold max-w-[20ch]"
				>
					{t.rich("heading", {
						effect: (chunks) => (
							<LineShadowText className="italic">
								{chunks?.toString()}
							</LineShadowText>
						),
					})}
				</Heading>
				<Button size="large">
					{t("button")} <kbd>P</kbd>
				</Button>
			</div>
		</section>
	);
};
