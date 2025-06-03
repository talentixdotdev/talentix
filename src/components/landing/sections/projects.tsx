import { Button, Heading } from "ui";
import { AnimatedSection } from "../ui/animated-section";
import { useTranslations } from "next-intl";

export const Projects: React.FC = () => {
	const t = useTranslations("content.landing.sections.projects");

	return (
		<AnimatedSection id="projects">
			<div className="flex flex-col items-center gap-y-4 mb-8">
				<Heading level={2} className="sm:text-4xl text-3xl">
					{t("heading")}
				</Heading>
				<p className="max-w-[50ch] text-center text-red-500-fg">
					{t("description")}
				</p>
			</div>
			<div className="relative grid grid-cols-1 grid-rows-5 sm:grid-cols-3 gap-4 max-w-5xl w-full mx-auto mt-8">
				<div className="absolute flex justify-center items-end size-full z-10 bg-gradient-to-t via-transparent from-bg to-transparent py-8">
					<div className="relative flex justify-center items-center w-full">
						<div className="absolute z-20 w-fit transform px-2">
							<Button
								appearance="outline"
								className="rounded-full border-2 h-8 min-h-8 border-dashed"
							>
								{t("see-all")}
							</Button>
						</div>
					</div>
				</div>

				<div
					style={{
						backgroundImage: "url(images/projects/grid/1.webp)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					className="bg-bg border border-dashed row-span-3 min-h-[500px] rounded-lg shadow-lg"
				/>
				<div
					style={{
						backgroundImage: "url(images/projects/grid/2.webp)",
					}}
					className="bg-cover bg-center bg-bg border border-dashed row-span-2 rounded-lg shadow-lg"
				/>
				<div
					style={{
						backgroundImage: "url(images/projects/grid/3.webp)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					className="bg-cover bg-center bg-bg border border-dashed row-span-3 rounded-lg shadow-lg"
				/>
				<div
					style={{
						backgroundImage: "url(images/projects/grid/4.webp)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					className="bg-cover bg-center bg-bg border border-dashed row-span-3 rounded-lg shadow-lg"
				/>
				<div
					style={{
						backgroundImage: "url(images/projects/grid/5.webp)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					className="bg-cover bg-center bg-bg border border-dashed row-span-2 rounded-lg shadow-lg"
				/>
				<div
					style={{
						backgroundImage: "url(images/projects/grid/6.webp)",
					}}
					className="bg-cover bg-center bg-bg border border-dashed row-span-2 rounded-lg shadow-lg"
				/>
			</div>
		</AnimatedSection>
	);
};
