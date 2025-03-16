import { DotPattern } from "@/components/landing/ui/dot-pattern";
import { HeroVideoDialog } from "@/components/landing/ui/hero-video-dialog";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/utils/classes";
import { ArrowRight01Icon, Rocket01Icon } from "hugeicons-react";
import { useTranslations } from "next-intl";
import { Button, Heading } from "ui";

export const Hero: React.FC = () => {
	const t = useTranslations("content.landing.sections.hero");

	return (
		<section className={"relative w-full"}>
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] -top-40 -z-10",
				)}
			/>
			<div
				className={
					"relative flex flex-col gap-y-6 items-center justify-center sm:mt-20 mt-10 mb-16 text-center px-6 sm:px-8"
				}
			>
				<Link href="/pricing#launch_discount">
					<span
						className={
							"group transform-gpu transition-all inline-flex animate-in duration-500 slide-in-from-top-5 fade-in fill-mode-backwards items-center justify-center mb-2 border-[2px] border-dashed border-primary w-fit shadow-accent h-6 rounded-full px-4 py-3.5 sm:text-sm text-xs whitespace-pre"
						}
					>
						{t.rich("chips.launch_discount", {
							strong: (text) => <strong>{text}</strong>,
						})}
						<ArrowRight01Icon
							className="group-hover:ml-1 transition-all"
							strokeWidth={"2"}
							size={16}
						/>
					</span>
				</Link>
				<Heading
					className={"sm:text-6xl text-4xl max-w-[25ch] text-center animate-in delay-100 duration-500 slide-in-from-top-4 fade-in fill-mode-backwards"}
					level={1}
				>
					{t.rich("heading", {
						mark: (chunks) => (
							<mark className="bg-primary text-primary-fg text-nowrap">
								{chunks}
							</mark>
						),
					})}
				</Heading>
				<div
					className={
						"flex gap-x-6 w-full justify-center mt-6 delay-300 duration-500 animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards"
					}
				>
					<Button
						intent={"primary"}
						className={"items-center sm:text-sm text-xs h-8 sm:h-10"}
					>
						{t("buttons.getting-start")} <Rocket01Icon size={18} />{" "}
					</Button>
					<Button className={"items-center sm:text-sm text-xs h-8 sm:h-10"}>
						{t("buttons.book-call")}
					</Button>
				</div>
				<HeroVideoDialog
					className="mt-8 max-w-screen-xl aspect-video delay-500 duration-500 animate-in fade-in slide-in-from-bottom-24 fill-mode-backwards"
					animationStyle="from-center"
					videoSrc="/videos/hero-video.mp4"
					thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
					thumbnailAlt="Hero Video"
				/>
			</div>
		</section>
	);
};
