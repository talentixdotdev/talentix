"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
	SmartPhone01Icon,
	Mail01Icon,
	PinLocation01Icon,
	Clock01Icon,
} from "hugeicons-react";

type ContactCardProps = {
	icon: React.ReactNode;
	title: string;
	content: React.ReactNode;
	delay: number;
};

function ContactCard({ icon, title, content, delay }: ContactCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay }}
			className="flex gap-4 p-5 rounded-lg border border-dashed border-muted bg-tertiary"
		>
			<div className="flex-shrink-0 mt-1">
				<div className="p-3 bg-bg rounded-md text-muted-fg">{icon}</div>
			</div>
			<div>
				<h3 className="font-medium mb-1">{title}</h3>
				<div className="text-muted-fg">{content}</div>
			</div>
		</motion.div>
	);
}

export function ContactInfo() {
	const t = useTranslations("content.contact.info");

	return (
		<div className="space-y-6 pt-4">
			<ContactCard
				icon={<SmartPhone01Icon size={24} />}
				title={t("phone.title")}
				content={
					<div className="space-y-1">
						<p>{t("phone.main")}</p>
						<p>{t("phone.support")}</p>
					</div>
				}
				delay={0.1}
			/>

			<ContactCard
				icon={<Mail01Icon size={24} />}
				title={t("email.title")}
				content={
					<div className="space-y-1">
						<p>{t("email.main")}</p>
						<p>{t("email.support")}</p>
					</div>
				}
				delay={0.2}
			/>

			{/*  <ContactCard
        icon={<PinLocation01Icon size={24} />}
        title={t("address.title")}
        content={
          <address className="not-italic">
            {t("address.street")}<br />
            {t("address.city")}<br />
            {t("address.country")}
          </address>
        }
        delay={0.3}
      /> */}

			<ContactCard
				icon={<Clock01Icon size={24} />}
				title={t("hours.title")}
				content={
					<div className="space-y-1">
						<p>{t("hours.weekdays")}</p>
						<p>{t("hours.weekend")}</p>
					</div>
				}
				delay={0.4}
			/>
		</div>
	);
}
