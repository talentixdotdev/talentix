import { UserAdd02Icon } from "hugeicons-react";
import { useTranslations } from "next-intl";
import { Heading, Button } from "ui";

const members = [
	"daniel",
	"katia",
	"enmanuel",
	"joshua",
	"jarel",
	"kendry",
] as const;

const TalentsPage: React.FC = () => {
	const t = useTranslations("content.talents");

	return (
		<main
			className={
				"flex flex-col items-center max-w-screen-xl w-full mx-auto min-h-screen sm:gap-y-12 pb-20"
			}
		>
			<section className="flex flex-col items-center justify-center w-full py-8 px-6 sm:px-8 mt-12">
				<Heading
					className={"sm:text-6xl text-5xl max-w-[20ch] text-nowrap"}
					level={1}
				>
					{t.rich("sections.hero.heading", {
						mark: (chunks) => (
							<mark className="bg-primary text-primary-fg text-nowrap">
								{chunks}
							</mark>
						),
					})}
				</Heading>
				<p className="text-center max-w-[65ch] text-muted-fg mt-8">
					{t("sections.hero.description")}
				</p>
			</section>
			<div className="flex flex-col items-center justify-center w-full">
				<div className="grid grid-cols-2 sm:grid-cols-4 place-self-center">
					{members.map((member) => (
						<div
							key={member}
							className="flex flex-col items-center gap-y-4 p-8 border border-dashed min-w-[250px]"
						>
							<span
								style={{
									backgroundImage: `url(/images/members/${member}.jpg)`,
								}}
								className="bg-muted size-40 aspect-square rounded-full bg-cover bg-center outline-2 outline-dashed outline-offset-2 outline-primary"
							/>
							<div className="flex flex-col items-center gap-y-2">
								<h3 className="sm:text-2xl text-xl font-medium">
									{t(`sections.members.${member}.name`)}
								</h3>
								<p className="inline-flex items-center gap-x-2 text-muted-fg">
									{t(`sections.members.${member}.role`)}
								</p>
							</div>
						</div>
					))}
					<div className="flex flex-col items-center justify-center gap-y-3 col-span-2 p-8  border border-dashed">
						<Heading level={2} className="sm:text-3xl text-xl">
							{t.rich("sections.join.heading", {
								mark: (chunks) => (
									<mark className="bg-primary text-primary-fg text-nowrap">
										{chunks}
									</mark>
								),
							})}
						</Heading>
						<p className="text-muted-fg text-center max-w-[35ch]">
							{t("sections.join.description")}
						</p>
						<Button appearance="solid" className={"mt-3"}>
							<UserAdd02Icon size={20} /> {t("sections.join.button")}
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default TalentsPage;
