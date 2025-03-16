"use client";

import {
	Form,
	Heading,
	TextField,
	Select,
	Label,
	Button,
	Textarea,
} from "@/components/ui";
import { plans } from "@/config/pricing";
import {
	CustomerSupportIcon,
	PlusSignIcon,
	Rocket01Icon,
	SaleTag02Icon,
	SmartPhone01Icon,
	StartUp01Icon,
	Wrench01Icon,
} from "hugeicons-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import type { Plan } from "@/types/pricing";
import { ProjectPreview } from "./_components/project-preview";
import { useTranslations } from "next-intl";

const scheme = z.object({
	name: z.string(),
	plan: z.enum(plans),
	email: z.string().email(),
	phone: z.string().min(10),
	description: z.string(),
});

export default function StartPage() {
	const searchParams = useSearchParams();
	const planFromUrl = searchParams.get("plan") as Plan | null;
	const defaultPlan =
		planFromUrl && plans.includes(planFromUrl) ? planFromUrl : plans[0];
	const tPlans = useTranslations("common.plans");

	const { control, handleSubmit, watch } = useForm({
		resolver: zodResolver(scheme),
		defaultValues: {
			plan: defaultPlan,
		},
	});

	const watchedValues = watch();
	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<main
			className={
				"flex flex-col items-center max-w-screen-xl w-full mx-auto min-h-screen gap-y-12 pb-20"
			}
		>
			<section className="flex flex-col items-center justify-center w-full px-6 sm:px-8 mt-12">
				<Heading level={1} className="sm:text-5xl text-4xl">
					Start a{" "}
					<mark className="bg-primary text-primary-fg">new project</mark>!
				</Heading>
				<p className="text-lg text-muted-fg mt-3 max-w-[45ch] text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
			</section>

			<ProjectPreview
				name={watchedValues.name}
				description={watchedValues.description}
				plan={watchedValues.plan}
			/>

			<Form
				onSubmit={onSubmit}
				className="flex flex-col max-w-lg w-full gap-y-10"
			>
				<div className="flex flex-col gap-y-6">
					<div className="relative inline-flex items-center mb-4">
						<Label className="absolute text-md text-muted-fg bg-bg pr-3">
							Project info
						</Label>
						<hr className="shrink-0 inset-0 w-full border border-dashed" />
						<button
							type="button"
							className={"group absolute right-0 bg-bg focus:outline-none p-2"}
						>
							<PlusSignIcon
								className="group-hover:text-fg text-muted-fg"
								size={16}
							/>
						</button>
					</div>
					<Controller
						control={control}
						name="name"
						render={({ field }) => (
							<TextField
								{...field}
								label="Project name"
								placeholder="My project"
							/>
						)}
					/>
					<Controller
						control={control}
						name="plan"
						render={({ field }) => (
							<Select
								defaultSelectedKey={defaultPlan}
								onSelectionChange={(key) => {
									if (key) {
										field.onChange(key);
									}
								}}
								label="Plan"
								{...field}
								placeholder="Select a plan"
							>
								<Select.Trigger />
								<Select.List items={plans.map((plan) => ({ id: plan }))}>
									{(item) => (
										<Select.Option id={item.id} textValue={item.id}>
											{tPlans(item.id)}
										</Select.Option>
									)}
								</Select.List>
							</Select>
						)}
					/>
					<Controller
						control={control}
						name="description"
						render={({ field }) => (
							<Textarea
								className="min-h-[100px] max-h-[250px]"
								label="Description"
								placeholder="My awesome project"
								{...field}
							/>
						)}
					/>
				</div>
				<div className="flex flex-col gap-y-6">
					<div className="relative inline-flex items-center mb-4">
						<Label className="absolute text-md text-muted-fg bg-bg pr-3">
							Contact
						</Label>
						<hr className="shrink-0 inset-0 w-full border border-dashed" />
						<button
							type="button"
							className={"group absolute right-0 bg-bg focus:outline-none p-2"}
						>
							<PlusSignIcon
								className="group-hover:text-fg text-muted-fg"
								size={16}
							/>
						</button>
					</div>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<TextField
								label="Email"
								placeholder="example@talentix.dev"
								{...field}
							/>
						)}
					/>
					<Controller
						control={control}
						name="phone"
						render={({ field }) => (
							<TextField
								label="Phone"
								placeholder="+1 234 567 890"
								{...field}
							/>
						)}
					/>
				</div>
				<div className="inline-flex justify-between mx-auto">
					<Button intent="primary">
						<Rocket01Icon size={20} /> Start My Project!
					</Button>
				</div>
			</Form>
		</main>
	);
}
