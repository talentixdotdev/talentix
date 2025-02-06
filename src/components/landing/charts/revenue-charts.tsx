"use client";

import {
	Chart,
	type ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/utils/classes";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
	{ month: "January", talentix: 186, competitor: 80 },
	{ month: "February", talentix: 305, competitor: 200 },
	{ month: "March", talentix: 237, competitor: 120 },
	{ month: "April", talentix: 190, competitor: 73 },
	{ month: "May", talentix: 209, competitor: 130 },
	{ month: "June", talentix: 214, competitor: 140 },
];

const chartConfig = {
	talentix: {
		label: "Talentix",
		color: "hsl(var(--primary))",
	},
	competitor: {
		label: "Competitor",
		color: "#494949",
	},
} satisfies ChartConfig;

export function RevenueChart({ className }: { className?: string }) {
	return (
		<Chart
			className={cn("min-h-[200px] w-full focus:outline-none", className)}
			config={chartConfig}
		>
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Line
					dataKey="talentix"
					type="natural"
					stroke="var(--color-talentix)"
					strokeWidth={2}
					dot={{
						fill: "var(--color-talentix)",
					}}
					activeDot={{
						r: 6,
					}}
				/>
				<Line
					dataKey="competitor"
					type="natural"
					stroke="var(--color-competitor)"
					strokeWidth={2}
					dot={{
						fill: "var(--color-competitor)",
					}}
					activeDot={{
						r: 6,
					}}
				/>
			</LineChart>
		</Chart>
	);
}
