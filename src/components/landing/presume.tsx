import { RevenueChart } from "@/components/landing/charts/revenue-charts";
import { AnimatedSection } from "@/components/landing/ui/animated-section";
import { MagicCard } from "@/components/landing/ui/magic-card";
import { JobSearchIcon } from "hugeicons-react";
import { Avatar, Button, Heading, Input, TextField } from "ui";

export const Presume: React.FC = () => (
	<AnimatedSection className={"h-[80dvh]"}>
		<header className={"flex flex-col gap-y-5 mb-6"}>
			<div className={"inline-flex gap-x-4 items-center"}>
				<div
					className={
						"inline-flex gap-x-2 text-primary bg-primary/20 border border-primary px-3 h-[1.85rem] items-center text-sm font-medium border-dashed rounded-full"
					}
				>
					<JobSearchIcon strokeWidth={2} size={14} /> Search
				</div>
				<Heading level={1} className={"sm:text-2xl"}>
					Lorem ipsum dolor sit amet.
				</Heading>
			</div>
			<p className={"text-muted-fg max-w-[45ch] text-md"}>
				<strong>Lorem Ipsum is simply dummy text</strong> of the printing and
				typesetting industry.
			</p>
		</header>
		<div className={"grid grid-cols-3 grid-rows-1 w-full h-[500px] gap-x-6"}>
			<MagicCard gradientSize={300} className="flex-col shadow-2xl">
				<div className={"flex flex-col gap-y-8 p-5"}>
					<header className={"flex flex-col gap-y-2 p-2"}>
						<Heading level={2}>Lorem ipsum dolor sit amet.</Heading>
						<p className={"text-sm"}>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy eirmod tempor{" "}
							<strong className={"text-success italic"}>+55%</strong> invidunt
							ut labore.
						</p>
					</header>
					<RevenueChart />
					<footer className={"flex flex-col gap-y-2 p-2"}>
						<p className={"text-sm text-muted-fg"}>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{" "}
							<strong>+3,000</strong> tempor invidunt ut labore et dolore magna.
						</p>
					</footer>
				</div>
			</MagicCard>
			<MagicCard gradientSize={300} className="flex-col shadow-2xl">
				<div className={"flex flex-col gap-y-4 p-5"}>
					<header className={"flex flex-col gap-y-2 p-2"}>
						<Heading level={2}>Lorem ipsum dolor sit amet.</Heading>
						<p className={"text-sm"}>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
							nonumy <strong className={"text-primary"}>eirmod tempor</strong>{" "}
							invidunt ut labore.
						</p>
					</header>
					<div className={"flex flex-col gap-y-2"}>
						<div
							className={
								"w-fit p-2 text-sm bg-primary text-fg rounded-lg self-end"
							}
						>
							Can we negotiate a raise?
						</div>
						<div className={"flex gap-x-2 self-start max-w-[70%]"}>
							<Avatar size={"medium"} src={"https://i.pravatar.cc/300?img=4"} />
							<div className={"flex flex-col gap-y-2"}>
								<div
									className={
										"p-2 text-sm bg-muted text-secondary-fg rounded-lg w-fit self-start"
									}
								>
									Of course!
								</div>
								<div
									className={
										"p-2 text-sm bg-muted text-secondary-fg self-end rounded-lg"
									}
								>
									How much would we be talking about?
								</div>
							</div>
						</div>
						<div
							className={
								"w-fit p-2 text-sm bg-primary text-fg rounded-lg self-end"
							}
						>
							How much can you offer me?
						</div>
						<div className={"inline-flex items-center w-full gap-x-2 mt-2"}>
							<TextField
								className={"w-full"}
								placeholder={"Send a message to Khloe"}
							/>
							<Button size={"small"} intent={"primary"}>
								Send
							</Button>
						</div>
					</div>
					<footer className={"flex flex-col gap-y-2 p-2"}>
						<p className={"text-sm text-muted-fg"}>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{" "}
							<strong>+3,000</strong> tempor invidunt ut labore et dolore magna.
						</p>
					</footer>
				</div>
			</MagicCard>
			<MagicCard gradientSize={300} className="flex-col shadow-2xl">
				<div className={"flex flex-col gap-y-4 p-5"}>
					<header className={"flex flex-col gap-y-2 p-2"}>
						<Heading level={2}>Talent Opportunities</Heading>
						<p className={"text-sm"}>
							Discover exciting projects and advance your career with Talentix's curated opportunities.
						</p>
					</header>
					<div className={"flex flex-col gap-y-4"}>
						<div className={"p-4 border border-muted rounded-lg"}>
							<h3 className={"text-primary font-semibold mb-2"}>Featured Project</h3>
							<p className={"text-sm mb-3"}>Senior Full-Stack Developer needed for innovative fintech platform</p>
							<div className={"flex justify-between items-center"}>
								<span className={"text-success font-medium"}>$8k - $12k</span>
								<Button size={"small"} intent={"secondary"}>
									Apply Now
								</Button>
							</div>
						</div>
						<div className={"grid grid-cols-2 gap-3"}>
							<div className={"p-3 border border-muted rounded-lg"}>
								<div className={"flex items-center gap-x-2 mb-1"}>
									<JobSearchIcon size={16} className={"text-primary"} />
									<p className={"text-sm font-medium"}>Active Projects</p>
								</div>
								<p className={"text-2xl font-bold text-primary"}>24</p>
							</div>
							<div className={"p-3 border border-muted rounded-lg"}>
								<div className={"flex items-center gap-x-2 mb-1"}>
									<JobSearchIcon size={16} className={"text-success"} />
									<p className={"text-sm font-medium"}>Success Rate</p>
								</div>
								<p className={"text-2xl font-bold text-success"}>98%</p>
							</div>
						</div>
					</div>
					<footer className={"flex flex-col gap-y-2 p-2"}>
						<p className={"text-sm text-muted-fg"}>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{" "}
							<strong>+3,000</strong> tempor invidunt ut labore et dolore magna.
						</p>
					</footer>
				</div>
			</MagicCard>
		</div>
	</AnimatedSection>
);
