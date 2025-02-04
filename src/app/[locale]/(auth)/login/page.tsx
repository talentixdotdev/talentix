"use client";

import { TalentixBrandIcon } from "@/components/icons";
import { DotPattern } from "@/components/landing/ui/dot-pattern";
import { AnimatedContainer } from "@/components/ui/animatied-container";
import { useRouter } from "@/lib/i18n/routing";
import { cn } from "@/utils/classes";
import { Github01Icon, GoogleIcon, Mail01Icon } from "hugeicons-react";
import { Button, Form, Heading, Link, TextField } from "ui";

export const dynamic = "force-static";

const LoginPage: React.FC = () => {
	const router = useRouter();

	return (
		<AnimatedContainer align={"center"}>
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] -z-10",
				)}
			/>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					router.push("/opportunities");
				}}
				className="w-[320px]"
			>
				<header
					className={"flex flex-col justify-center items-center gap-y-8 pb-6"}
				>
					<TalentixBrandIcon size={60} />
					<Heading level={1} className={"uppercase sm:text-2xl font-mono"}>
						Login to Talentix
					</Heading>
				</header>
				<TextField
					prefix={<Mail01Icon size={16} />}
					label="Email"
					inputMode={"email"}
					isRequired
					className="mb-2"
					description={
						<span className={"text-xs bg-bg/90"}>
							Dont have a account?{" "}
							<Link intent={"primary"} href={"/register"}>
								Register
							</Link>
							.
						</span>
					}
				/>
				<div className="flex flex-col gap-y-4">
					<Button intent="primary" type="submit">
						Continue with Email
					</Button>
					<Button className={"dark:bg-[#0D652D]"}>
						Continue with Google <GoogleIcon />
					</Button>
					<Button className={"dark:bg-[#24292e]"}>
						Continue with Github <Github01Icon />
					</Button>
				</div>
			</Form>
		</AnimatedContainer>
	);
};

export default LoginPage;
