import { ArrowRight01Icon, Cancel01Icon, HotPriceIcon } from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PromoTopBar = () => {
    const t = useTranslations("content.landing.promotion_bar");

	const [isVisible, setIsVisible] = useState(true);
	const [navbarHeight, setNavbarHeight] = useState(0);
	const barRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const navbar = document.getElementById("navbar");
		if (navbar) {
			setNavbarHeight(navbar.offsetHeight);
		}
	}, []);

	if (!isVisible) return null;

	return (
		<div
			ref={barRef}
			className="sticky z-50 bg-black/85 backdrop-blur-sm border-b border-border"
			style={{ top: navbarHeight }}
		>
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div className="flex items-center gap-4 text-white text-sm md:text-base">
						<div className="hidden sm:flex items-center gap-2 rounded-md py-1 px-2 bg-orange-500 overflow-hidden relative animate-shine">
							<span className="inline-flex items-center gap-1 text-white font-medium text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] relative z-10">
								<HotPriceIcon className="size-4" strokeWidth={2} />
                                {t.rich("badge")}
							</span>
							<div className="shine-effect absolute inset-0"/>
						</div>
						<span className="text-muted-fg">
							{t.rich("description", {
                                strong: (chunks) => <strong>{chunks}</strong>,
                            })}
						</span>
					</div>

					<div className="flex items-center gap-3">
						<Link href="/promo">
							<Button
								className="flex items-center gap-2 group text-sm"
								appearance="plain"
							>
								{t("view_details")}								
                                <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
							</Button>
						</Link>

						<Button
							appearance="plain"
							onPress={() => setIsVisible(false)}
							aria-label={t("close")}
						>
							<Cancel01Icon className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromoTopBar;
