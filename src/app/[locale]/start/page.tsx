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
import { useState, useEffect } from "react";

const scheme = z.object({
	name: z.string(),
	plan: z.enum(plans),
	email: z.string().email(),
	phone: z.string().min(10),
	description: z.string(),
});

export default function StartPage() {
	const t = useTranslations("content.start");
	const searchParams = useSearchParams();
	const planFromUrl = searchParams.get("plan") as Plan | null;
	const defaultPlan =
		planFromUrl && plans.includes(planFromUrl) ? planFromUrl : plans[0];
	const tPlans = useTranslations("common.plans");

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const { control, handleSubmit, watch, reset } = useForm({
		resolver: zodResolver(scheme),
		defaultValues: {
			plan: defaultPlan,
		},
	});

	const watchedValues = watch();

	// Limpiar mensajes al editar
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setSuccess(null);
		setError(null);
	}, [
		watchedValues.name,
		watchedValues.plan,
		watchedValues.email,
		watchedValues.phone,
		watchedValues.description,
	]);

	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);
		setSuccess(null);
		setError(null);
		try {
			const res = await fetch("/api/start-project", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error("Error al enviar el formulario");
			setSuccess("¡Proyecto enviado con éxito!");
			reset({ plan: defaultPlan });
		} catch (err) {
			setError("Hubo un error. Intenta de nuevo.");
		} finally {
			setLoading(false);
		}
	});

	return (
		<main
			className={
				"flex flex-col items-center max-w-screen-xl w-full mx-auto min-h-screen gap-y-12 pb-20"
			}
		>
			<section className="flex flex-col items-center justify-center w-full px-6 sm:px-8 mt-12">
				<Heading level={1} className="sm:text-5xl text-4xl">
					{t.rich("heading", {
						mark: (chunks) => (
							<mark className="bg-primary text-primary-fg">{chunks}</mark>
						),
					})}
				</Heading>
				<p className="text-lg text-muted-fg mt-3 max-w-[45ch] text-center">
					{t("description")}
				</p>
			</section>

			<ProjectPreview
				name={watchedValues.name}
				description={watchedValues.description}
				plan={watchedValues.plan}
			/>

			{/* Mensajes de feedback */}
			{success && (
				<div className="w-full max-w-lg mx-auto bg-success/20 text-success rounded-lg p-3 text-center border-2 border-success border-dashed">
					{success}
				</div>
			)}
			{error && (
				<div className="w-full max-w-lg mx-auto bg-danger/20 text-danger rounded-lg p-3 text-center border-2 border-danger border-dashed">
					{error}
				</div>
			)}

			<Form
				onSubmit={onSubmit}
				className="flex flex-col max-w-lg w-full gap-y-10"
			>
				<div className="flex flex-col gap-y-6">
					<div className="relative inline-flex items-center mb-4">
						<Label className="absolute text-md text-muted-fg bg-bg pr-3">
							{t("form.project-info")}
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
								label={t("form.name")}
								placeholder={t("placeholders.name")}
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
								label={t("form.plan")}
								{...field}
								placeholder={t("placeholders.plan")}
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
								label={t("form.description")}
								placeholder={t("placeholders.description")}
								{...field}
							/>
						)}
					/>
				</div>
				<div className="flex flex-col gap-y-6">
					<div className="relative inline-flex items-center mb-4">
						<Label className="absolute text-md text-muted-fg bg-bg pr-3">
							{t("form.contact")}
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
								label={t("form.email")}
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
								label={t("form.phone")}
								placeholder="+1 234 567 890"
								{...field}
							/>
						)}
					/>
				</div>
				<div className="inline-flex justify-between mx-auto">
					<Button intent="primary" type="submit" isDisabled={loading}>
						{loading ? (
							<>Enviando...</>
						) : (
							<>
								<Rocket01Icon size={20} /> {t("form.submit")}
							</>
						)}
					</Button>
				</div>
			</Form>
		</main>
	);
}
