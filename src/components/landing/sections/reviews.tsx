import { cn } from "@/utils/classes";
import { Marquee } from "../ui/marquee";
import { AnimatedSection } from "../ui/animated-section";
import { useTranslations } from "next-intl";

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative h-full w-64 cursor-pointer overflow-hidden rounded-xl p-4",
				"border border-dashed border-muted bg-bg shadow-lg",
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<img className="rounded-full" width="32" height="32" alt="" src={img} />
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">{username}</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	);
};

export function Reviews() {
	const t = useTranslations("content.landing.sections.reviews");
	const reviewsKey = [
		"jack",
		"jill",
		"john",
		"jane",
		"jenny",
		"james",
	] as const;

	const firstRow = reviewsKey.slice(0, reviewsKey.length / 2);
	const secondRow = reviewsKey.slice(reviewsKey.length / 2);

	return (
		<AnimatedSection className="relative overflow-hidden py-0">
			<Marquee pauseOnHover className="[--duration:20s]">
				{firstRow.map((review) => (
					<ReviewCard
						key={review}
						name={t(`${review}.name`)}
						username={t(`${review}.username`)}
						body={t(`${review}.body`)}
						img={`https://avatar.vercel.sh/${review}`}
					/>
				))}
			</Marquee>
			<Marquee reverse pauseOnHover className="[--duration:20s]">
				{firstRow.map((review) => (
					<ReviewCard
						key={review}
						name={t(`${review}.name`)}
						username={t(`${review}.username`)}
						body={t(`${review}.body`)}
						img={`https://avatar.vercel.sh/${review}`}
					/>
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg" />
		</AnimatedSection>
	);
}
