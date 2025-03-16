import { type HTMLMotionProps, motion } from "motion/react";
import { forwardRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const animatedContainer = tv({
	base: "flex h-screen w-screen",
	variants: {
		size: {
			small: "max-w-2xl",
			medium: "max-w-4xl",
			large: "container",
		},
		align: {
			center: "items-center justify-center",
			start: "items-start justify-center",
		},
		autoFit: {
			true: "h-auto",
		},
		isCentered: {
			true: "mx-auto",
		},
	},
});

interface AnimatedContainerProps
	extends Omit<React.ComponentProps<"div">, "size">,
		VariantProps<typeof animatedContainer> {
	disableAnimation?: boolean;
	motionProps?: HTMLMotionProps<"div">;
}

const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
	(
		{
			children,
			className = "",

			size,
			align,

			motionProps,
			disableAnimation = false,
			...props
		},
		ref,
	) => {
		const defaultMotionProps: HTMLMotionProps<"div"> = {
			initial: { opacity: 0.6, scale: 0.95 },
			animate: { opacity: 1, scale: 1 },
			transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
		};

		return (
			// @ts-ignore
			<motion.div
				ref={ref}
				className={animatedContainer({ size, align, className })}
				{...(disableAnimation ? {} : defaultMotionProps)}
				{...motionProps}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);

AnimatedContainer.displayName = "AnimatedContainer";

export { animatedContainer, AnimatedContainer, type AnimatedContainerProps };
