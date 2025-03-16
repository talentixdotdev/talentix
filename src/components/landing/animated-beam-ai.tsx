"use client";

import { useRef } from "react";

import { cn } from "@/utils/classes";
import { AnimatedBeam } from "@/components/landing/ui/animated-beam";
import { ChatGptIcon, Image01Icon, Message02Icon, UserGroupIcon, Video01Icon } from "hugeicons-react";
import { Circle } from "./ui/circle";



export function AnimatedBeamAI({
	className,
}: {
	className?: string;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null);
	const div4Ref = useRef<HTMLDivElement>(null);
	const div5Ref = useRef<HTMLDivElement>(null);

	return (
		<div className="absolute -top-5 w-full">
			<div
				className={cn(
					"relative flex w-full items-center justify-center overflow-hidden p-10",
					className,
				)}
				ref={containerRef}
			>
				<div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
					<div className="flex flex-col justify-center gap-2">
						<Circle ref={div1Ref}>
							<Video01Icon />
						</Circle>
						<Circle ref={div2Ref}>
							<Message02Icon />
						</Circle>
						<Circle ref={div3Ref}>
							<Image01Icon />
						</Circle>
					</div>
					<div className="flex flex-col justify-center">
						<Circle ref={div5Ref} className="size-16">
							<ChatGptIcon size={30} />
						</Circle>
					</div>
					<div className="flex flex-col justify-center">
						<Circle ref={div4Ref}>
							<UserGroupIcon />
						</Circle>
					</div>
				</div>

				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div1Ref}
					toRef={div5Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div2Ref}
					toRef={div5Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div3Ref}
					toRef={div5Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div4Ref}
					toRef={div5Ref}
				/>
			</div>
		</div>
	);
}

