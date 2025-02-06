import { DotPattern } from "@/components/landing/ui/dot-pattern";
import { HeroVideoDialog } from "@/components/landing/ui/hero-video-dialog";
import { cn } from "@/utils/classes";
import { Rocket01Icon } from "hugeicons-react";
import { Button, Heading } from "ui";

export const Hero: React.FC = () => {
	return (
		<section className={"relative sm:min-h-svh w-full"}>
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] -top-40 -z-10",
				)}
			/>
			<div
				className={
					"flex flex-col sm:gap-y-6 gap-y-4 items-center justify-center sm:pt-20 pt-10 text-center relative delay-100 duration-500 animate-in fade-in-50 slide-in-from-bottom-24 fill-mode-backwards"
				}
			>
				<span
					className={
						"inline-flex items-center justify-center  border border-dashed border-primary/60 w-fit shadow-accent h-6 rounded-full px-4 py-3.5 sm:text-sm text-xs whitespace-pre"
					}
				>
					🎉 Introducing <strong className={"italic mr-1"}>Nexar AI</strong>
					{"  "} the future of talent serach with AI
				</span>
				<Heading className={"sm:text-6xl text-5xl max-w-[20ch]"} level={1}>
					Find the <span className={""}>best talent</span> for your project
				</Heading>
				<div className={"flex gap-x-6 w-full justify-center mt-6 "}>
					<Button
						intent={"primary"}
						className={"items-center sm:text-sm text-xs h-8 sm:h-10"}
					>
						Start a project <Rocket01Icon size={18} />{" "}
					</Button>
					<Button className={"items-center sm:text-sm text-xs h-8 sm:h-10"}>
						Book a call
					</Button>
				</div>
				<HeroVideoDialog
					className="sm:mt-24 mt-8 max-w-screen-xl aspect-video"
					animationStyle="from-center"
					videoSrc="/videos/hero-video.mp4"
					thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
					thumbnailAlt="Hero Video"
				/>
			</div>
		</section>
	);
};
