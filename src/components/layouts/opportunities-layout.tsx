"use client";

import { TalentixBrandIcon } from "@/components/icons";
import { DocumentValidationIcon, JobSearchIcon } from "hugeicons-react";
import {
	IconChevronLgDown,
	IconCirclePerson,
	IconLogout,
	IconSettings,
} from "justd-icons";
import { Avatar, Badge, Button, Link, Menu, Sidebar } from "ui";

interface ProjectsLayoutProps extends React.ComponentProps<typeof Sidebar> {}

const OpportunitiesLayout: React.FC<ProjectsLayoutProps> = ({
	children,
	...props
}) => {
	return (
		<Sidebar.Provider className={"dark:has-[[data-intent=inset]]:bg-tertiary"}>
			<Sidebar intent={"inset"} className={"bg-tertiary"} {...props}>
				<Sidebar.Header className={"mb-0 pb-2"}>
					<Link
						href={"/projects"}
						className="inline-flex items-center justify-start whitespace-pre font-bold font-mono uppercase text-md"
					>
						<TalentixBrandIcon size={18} />
						<strong>Talentix</strong>
					</Link>
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Section
						title={"Personal"}
						classNames={{ itemsWrapper: "gap-y-2" }}
					>
						<Sidebar.Item icon={JobSearchIcon} badge={11}>
							Opportunities
						</Sidebar.Item>
						<Sidebar.Item isCurrent icon={DocumentValidationIcon} badge={2}>
							Application
						</Sidebar.Item>
					</Sidebar.Section>
					<Sidebar.Section className={"mt-0"} title={"Activity"}>
						<Sidebar.Item
							classNames={{
								value: "flex flex-col gap-y-2",
							}}
							className={"h-fit flex flex-col items-start"}
						>
							<div
								className={
									"flex-col flex text-wrap line-clamp-2 w-full max-w-full"
								}
							>
								<strong>Senior React Developer At G3deon, Inc</strong>
								<p className={"text-[0.65rem]"}>
									US, San Francisco, w 41 Street
								</p>
							</div>
							<div className={"inline-flex items-center gap-2"}>
								<Badge>React</Badge>
								<Badge>JavaScript</Badge>
								<span className={"text-xs"}>+7</span>
							</div>
						</Sidebar.Item>
						<Sidebar.Item
							classNames={{
								value: "flex flex-col gap-y-2",
							}}
							className={"h-fit flex flex-col items-start"}
						>
							<div
								className={
									"flex-col flex text-wrap line-clamp-2 w-full max-w-full"
								}
							>
								<strong>Senior React Developer At G3deon, Inc</strong>
								<p className={"text-[0.65rem]"}>
									US, San Francisco, w 41 Street
								</p>
							</div>
							<div className={"inline-flex items-center gap-2"}>
								<Badge>React</Badge>
								<Badge>JavaScript</Badge>
								<span className={"text-xs"}>+7</span>
							</div>
						</Sidebar.Item>
						<Sidebar.Item
							classNames={{
								value: "flex flex-col gap-y-2",
							}}
							className={"h-fit flex flex-col items-start"}
						>
							<div
								className={
									"flex-col flex text-wrap line-clamp-2 w-full max-w-full"
								}
							>
								<strong>Senior React Developer At G3deon, Inc</strong>
								<p className={"text-[0.65rem]"}>
									US, San Francisco, w 41 Street
								</p>
							</div>
							<div className={"inline-flex items-center gap-2"}>
								<Badge>React</Badge>
								<Badge>JavaScript</Badge>
								<span className={"text-xs"}>+7</span>
							</div>
						</Sidebar.Item>
					</Sidebar.Section>
				</Sidebar.Content>
				<Sidebar.Footer>
					<Menu>
						<Button
							appearance="plain"
							aria-label="Profile"
							slot="menu-trigger"
							className="group"
						>
							<Avatar shape="circle" status={"online"} initials={"IR"} />
							<span className="group-data-[collapsible=dock]:hidden flex items-center justify-center">
								Saul Hudson
								<IconChevronLgDown className="right-3 size-4 absolute group-pressed:rotate-180 transition-transform" />
							</span>
						</Button>
						<Menu.Content className="min-w-[--trigger-width]">
							<Menu.Item href="#">
								<IconCirclePerson />
								Profile
							</Menu.Item>
							<Menu.Item href="#">
								<IconSettings />
								Settings
							</Menu.Item>
							<Menu.Separator />
							<Menu.Item href="#" className="hover:bg-danger">
								<IconLogout />
								Log out
							</Menu.Item>
						</Menu.Content>
					</Menu>
				</Sidebar.Footer>
			</Sidebar>
			<Sidebar.Inset
				className={"md:peer-data-[intent=inset]:bg-bg border-none"}
			>
				{children}
			</Sidebar.Inset>
		</Sidebar.Provider>
	);
};

export { OpportunitiesLayout, type ProjectsLayoutProps };
