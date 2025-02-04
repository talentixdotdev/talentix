"use client";

import { cn } from "@/utils/classes";
import { type Variants, motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordPullUpProps {
	words: string;
	delayMultiple?: number;
	wrapperFramerProps?: Variants;
	framerProps?: Variants;
	className?: string;
	delay?: number;
	margin?: `${number}px`;
}

export function WordPullUp({
	words,
	delayMultiple = 0.2,
	wrapperFramerProps = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	},
	framerProps = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 },
	},
	margin = "0px",
	delay = 0,
	className,
}: WordPullUpProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: margin });

	return (
		<motion.span
			ref={ref}
			variants={wrapperFramerProps}
			initial="hidden"
			animate={isInView ? "show" : "hidden"}
			transition={{ delay }}
			className={cn("text-center tracking-[-0.02em] drop-shadow-sm", className)}
		>
			{words.split(" ").map((word, i) => (
				<motion.span
					// biome-ignore lint/suspicious/noArrayIndexKey : <explanation>
					key={i}
					variants={framerProps}
					transition={{
						delay: delay + i * delayMultiple,
					}}
					style={{ display: "inline-block", paddingRight: "0.4rem" }}
				>
					{word === "" ? <span>&nbsp;</span> : word}
				</motion.span>
			))}
		</motion.span>
	);
}
