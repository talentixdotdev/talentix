"use client";

import { cn } from "@/utils/classes";
import { type HTMLMotionProps, motion } from "motion/react";

export interface AnimatedSectionProps extends React.ComponentProps<"section"> {
	motionProps?: HTMLMotionProps<"section">;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
	children,
	className,
	motionProps,
	...props
}) => {
	const variants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
		...motionProps?.variants,
	};

	return (
		// @ts-ignore
		<motion.section
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2, margin: "-200px" }}
			variants={variants}
			className={cn(
				"flex flex-col gap-y-8 h-fit w-full max-w-screen-xl",
				className,
			)}
			{...motionProps}
			{...props}
		>
			{children}
		</motion.section>
	);
};
