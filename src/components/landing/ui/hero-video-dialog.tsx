"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/utils/classes";
import { Cancel01Icon, PlayIcon } from "hugeicons-react";

type AnimationStyle =
	| "from-bottom"
	| "from-center"
	| "from-top"
	| "from-left"
	| "from-right"
	| "fade"
	| "top-in-bottom-out"
	| "left-in-right-out";

interface HeroVideoProps {
	animationStyle?: AnimationStyle;
	videoSrc: string;
	thumbnailSrc: string;
	thumbnailAlt?: string;
	className?: string;
}

const animationVariants = {
	"from-bottom": {
		initial: { y: "100%", opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: "100%", opacity: 0 },
	},
	"from-center": {
		initial: { scale: 0.5, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		exit: { scale: 0.5, opacity: 0 },
	},
	"from-top": {
		initial: { y: "-100%", opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: "-100%", opacity: 0 },
	},
	"from-left": {
		initial: { x: "-100%", opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: "-100%", opacity: 0 },
	},
	"from-right": {
		initial: { x: "100%", opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: "100%", opacity: 0 },
	},
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	"top-in-bottom-out": {
		initial: { y: "-100%", opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: "100%", opacity: 0 },
	},
	"left-in-right-out": {
		initial: { x: "-100%", opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: "100%", opacity: 0 },
	},
};

export function HeroVideoDialog({
	animationStyle = "from-center",
	videoSrc,
	thumbnailSrc,
	thumbnailAlt = "Video thumbnail",
	className,
}: HeroVideoProps) {
	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const selectedAnimation = animationVariants[animationStyle];

	return (
		<div className={cn("relative mb-20", className)}>
			<div
				className="relative cursor-pointer group"
				onClick={() => setIsVideoOpen(true)}
				onKeyUp={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setIsVideoOpen(true);
					}
				}}
				tabIndex={0}
				role="button"
			>
				<img
					src={thumbnailSrc}
					alt={thumbnailAlt}
					width={1920}
					height={1080}
					className="transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
				/>

				<div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-all duration-200 ease-out rounded-2xl">
					<div className="flex size-28 items-center justify-center rounded-full bg-primary/80">
						<div
							className={
								"relative flex size-24 scale-100 items-center justify-center rounded-full bg-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
							}
						>
							<PlayIcon className="size-10 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out" />
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{isVideoOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						onClick={() => setIsVideoOpen(false)}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
					>
						<motion.div
							{...selectedAnimation}
							transition={{ type: "spring", damping: 30, stiffness: 300 }}
							className="relative w-full max-w-6xl aspect-video mx-4 md:mx-0"
						>
							<motion.button className="absolute -top-16 right-0 text-fg text-xl bg-bg ring-1 backdrop-blur-md rounded-full p-2">
								<Cancel01Icon className="size-5" />
							</motion.button>
							<div className="size-full border-2 border-muted rounded-2xl overflow-hidden isolate z-[1] relative">
								<iframe
									src={videoSrc}
									className="size-full rounded-2xl"
									allowFullScreen
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								/>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
