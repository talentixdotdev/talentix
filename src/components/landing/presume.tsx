import { RevenueChart } from "@/components/landing/charts/revenue-charts";
import { AnimatedSection } from "@/components/landing/ui/animated-section";
import { JobSearchIcon } from "hugeicons-react";
import { Heading } from "ui";

export const Presume: React.FC = () => (
	<AnimatedSection className={"h-[80dvh]"}>
		<header className={"flex flex-col gap-y-5 mb-6"}>
			<div className={"inline-flex gap-x-4 items-center"}>
				<div
					className={
						"inline-flex gap-x-2 text-primary bg-primary/20 border border-primary px-3 h-[1.85rem] items-center text-sm font-medium border-dashed rounded-full"
					}
				>
					<JobSearchIcon strokeWidth={2} size={14} /> Search
				</div>
				<Heading level={1} className={"sm:text-4xl"}>
					Lorem ipsum dolor sit amet.
				</Heading>
			</div>
			<p className={"text-muted-fg max-w-[45ch] text-lg"}>
				<strong>Lorem Ipsum is simply dummy text</strong> of the printing and
				typesetting industry.
			</p>
		</header>
		<RevenueChart />
	</AnimatedSection>
);
