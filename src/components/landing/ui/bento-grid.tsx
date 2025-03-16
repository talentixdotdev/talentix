import { Heading } from "ui";
import { cn } from "@/utils/classes";
import { motion, AnimatePresence } from "motion/react";
import { useHover } from "react-aria";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {}

interface BentoGridItemProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	title: React.ReactNode;
	description: React.ReactNode;
	classNames?: Partial<{
		mainWrapper: string;
		innerWrapper: string;
		endContent: string;
	}>;
}

export const BentoGrid: React.FC<BentoGridProps> & {
	Item: React.FC<BentoGridItemProps>;
} = ({ children, className, ...props }) => {
	return (
		<div
			className={cn(
				"grid md:grid-cols-5 md:grid-rows-5 gap-4 grid-cols-1",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

BentoGrid.Item = ({
	children,
	title,
	description,
	className,
	classNames,
	...props
}) => {
	const contentVariants = {
		notHovered: {
			transform: "translateY(30%)",
			transition: { duration: 0.4, ease: "easeOut" },
		},
		hovered: {
			transform: "translateY(0%)",
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const descriptionVariants = {
		initial: { 
			height: 0,
			opacity: 0,
		},
		animate: { 
			height: "auto",
			opacity: 1,
			transition: { duration: 0.2, ease: "easeOut" },
		},
		exit: { 
			height: 0,
			opacity: 0,
			transition: { duration: 0.2, ease: "easeIn" },
		}
	};

	const { isHovered, hoverProps } = useHover({});

	return (
		<div
			className={cn(
				"group relative overflow-hidden flex flex-col bg-bg rounded-lg border border-muted border-dashed shadow-lg",
				className,
				classNames?.mainWrapper,
			)}
			{...hoverProps}
			{...props}
		>
			<div className={cn("flex-grow p-4", classNames?.innerWrapper)}>
				{children}
			</div>

			<div className="z-10 bg-gradient-to-t from-bg/85 to-transparent inset-0 py-4">
				<motion.div
					className={cn(
						"inline-flex relative h-fit w-full px-4",
						classNames?.endContent,
					)}
					variants={contentVariants}
					animate={isHovered ? "hovered" : "notHovered"}
					style={{ willChange: "transform" }}
				>
					<div className="flex flex-col">
						<Heading level={3} className="sm:text-xl">
							{title}
						</Heading>
						
						<AnimatePresence>
							{isHovered && (
								<motion.p 
									className="text-muted-fg overflow-hidden"
									variants={descriptionVariants}
									initial="initial"
									animate="animate"
									exit="exit"
								>
									{description}
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
