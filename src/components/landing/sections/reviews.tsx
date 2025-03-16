import { cn } from "@/utils/classes";
import { Marquee } from "../ui/marquee";
import { AnimatedSection } from "../ui/animated-section";
import Image from "next/image";

interface Review {
	img: string;
	name: string;
	username: string;
	body: string;
}

const reviews: Review[] = [
	{
		img: "https://i.imgur.com/AW4ahz5.jpeg",
		name: "Juan Pujols",
		username: "@juanpujols",
		body: "Me hicieron una página personal y estoy muy feliz con el resultado. Excelente trabajo!",
	},
	{
		img: "https://avatar.vercel.sh/davidrosario",
		name: "David Rosario",
		username: "@skydreamrealty",
		body: "Quedé muy contento con la página que hicieron para Sky Dream Realty. 100% recomendado!",
	},
	{
		img: "https://i.imgur.com/tMY0tAy.png",
		name: "Idalenny Ramos",
		username: "@idalennyramos",
		body: "Gracias a la página ahora puedo vender ropa de Shein con mayor facilidad. Ha sido de gran ayuda!",
	},
	{
		img: "https://avatar.vercel.sh/josegonzalez",
		name: "José González",
		username: "@madrearafaelaybarra",
		body: "La página para el Politécnico Madre Rafaela Ybarra superó mis expectativas. Increíble trabajo!",
	},
];

const ReviewCard: React.FC<Review> = ({ img, name, username, body }) => {
	return (
		<figure
			className={cn(
				"relative h-full w-64 cursor-pointer overflow-hidden rounded-xl p-4",
				"border border-dashed border-muted bg-bg shadow-lg"
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<img className="rounded-full" width={32} height={32} alt={name} src={img} />
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

export const Reviews: React.FC = () => {
	return (
		<AnimatedSection className="relative overflow-hidden py-0">
			<Marquee pauseOnHover className="[--duration:20s]">
				{reviews.map((review, index) => (
					<ReviewCard key={index} {...review} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover className="[--duration:20s]">
				{reviews.map((review, index) => (
					<ReviewCard key={`reverse-${index}`} {...review} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg" />
		</AnimatedSection>
	);
};