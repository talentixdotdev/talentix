"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/utils/classes";
import { Cancel01Icon, PlayIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";

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
		exit: { x: "-100%", opacity: 0 },
	},
};

export function HeroVideoDialog({
	animationStyle = "from-center",
	thumbnailSrc,
	thumbnailAlt = "Video thumbnail",
	className,
}: HeroVideoProps) {
	const router = useRouter();

	return (
		<div className={cn("relative overflow-hidden", className)}>
			<div
				className="relative cursor-pointer group"
				onKeyUp={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						router.push("/start");
					}
				}}
				onClick={() => router.push("/start")}
				tabIndex={0}
				role="button"
			>
				<img
					src={thumbnailSrc}
					alt={thumbnailAlt}
					width={1920}
					height={1080}
					className="text-center text-muted-fg bg-black transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border-2"
				/>

				<div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-all duration-200 ease-out rounded-2xl">
					<div className="flex size-[7.5rem] items-center justify-center rounded-full bg-primary/60 backdrop-blur-lg">
						<div
							className={
								"relative flex size-[5.6rem] scale-100 items-center justify-center rounded-full bg-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.35]"
							}
						>
							<PlayIcon className="size-10 text-white fill-white group-hover:scale-115 scale-100 transition-transform duration-200 ease-out" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
