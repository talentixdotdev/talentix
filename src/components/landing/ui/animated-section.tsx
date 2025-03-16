"use client";

import { cn } from "@/utils/classes";
import { useMediaQuery } from "@/utils/use-media-query";
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
	const withMargin = useMediaQuery("(min-width: 640px)");
	const variants = {
		hidden: { opacity: 0, transform: "translateY(50px)" },
		visible: {
			opacity: 1,
			transform: "translateY(0)",
			transition: { duration: 0.5 },
		},
		...motionProps?.variants,
	};

	return (
		// @ts-ignore
		<motion.section
			initial="hidden"
			whileInView="visible"
			viewport={{
				once: true,
				amount: 0.2,
				margin: withMargin ? "-200px" : "0px",
			}} // Adjusted margin for mobile responsiveness
			variants={variants}
			className={cn(
				"flex flex-col items-center justify-center w-full py-8 px-6 sm:px-8 sm:mb-0 mb-16",
				className,
			)}
			{...motionProps}
			{...props}
		>
			{children}
		</motion.section>
	);
};
