import { Hero } from "@/components/landing/hero";
import { Presume } from "@/components/landing/presume";

export const dynamic = "force-static";

const HomePage: React.FC = () => {
	return (
		<div
			className={"flex flex-col items-center min-h-screen sm:gap-y-20 pb-20"}
		>
			<Hero />
			<Presume />
		</div>
	);
};

export default HomePage;
