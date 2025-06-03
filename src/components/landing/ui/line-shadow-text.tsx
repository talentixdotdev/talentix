"use client";

import { cn } from "@/utils/classes";
import { motion, type MotionProps } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LineShadowTextProps
	extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
		MotionProps {
	as?: React.ElementType;
}

export function LineShadowText({
	children,
	className,
	as: Component = "span",
	...props
}: LineShadowTextProps) {
	const MotionComponent = motion.create(Component);
	const content = typeof children === "string" ? children : null;
	const [shadowColor, setShadowColor] = useState("transparent");
	
	const { resolvedTheme } = useTheme();
	
	useEffect(() => {
		setShadowColor(resolvedTheme === "dark" ? "white" : "black");
	}, [resolvedTheme]);

	if (!content) {
		throw new Error("LineShadowText only accepts string content");
	}

	return (
		<MotionComponent
			style={{ "--shadow-color": shadowColor } as React.CSSProperties}
			className={cn(
				"relative z-0 inline-flex",
				"after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]",
				"after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
				"after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
				"after:animate-line-shadow",
				className,
			)}
			data-text={content}
			{...props}
		>
			{content}
		</MotionComponent>
	);
}
