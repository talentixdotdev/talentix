"use client";

import { motion } from "motion/react";

export function ContactMap() {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6 }}
			className="w-full h-[400px] rounded-xl overflow-hidden border border-border shadow-lg relative"
		>
			<div className="absolute inset-0 bg-tertiary flex items-center justify-center">
				<div className="w-full h-full relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-tertiary via-secondary/30 to-tertiary/80 z-10">
						<div className="w-full h-full grid grid-cols-12 grid-rows-10 opacity-20">
							{Array.from({ length: 120 }).map((_, i) => (
								<div key={i} className="border border-dashed border-fg/20" />
							))}
						</div>
					</div>

					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
						<div className="relative">
							<div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
								<div className="w-3 h-3 bg-white rounded-full" />
							</div>
							<div className="absolute -inset-4 bg-primary rounded-full animate-ping opacity-20" />
						</div>
					</div>

					<div className="absolute top-6 left-6 bg-bg/80 backdrop-blur-sm rounded-lg p-3 z-20 text-sm border border-border shadow-sm">
						<p className="font-medium">Talentix Headquarters</p>
						<p className="text-muted-fg text-xs">
							123 Innovation Street, Tech City
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
