import { Invoice } from "@/components/invoice";
import { DotPattern } from "@/components/landing/ui/dot-pattern";
import type { Feature } from "@/types/pricing";
import { cn } from "@/utils/classes";

const featuresPrices: Record<Feature, number> = {
	"content-web-page": 8500,
	"dedicated-support": 5000,
	"brand-design": 6500,
	"advanced-ui-ux": 5000,
	"social-networks-design": 0,
	maintenance: 0,
	"basic-support": 0,
	"everything-before": 0,
	"custom-web-design": 0,
	"ui-ux-improvement": 0,
	"seo-optimization": 0,
	"e-commerce-integration": 0,
	"hosting-and-domain": 0,
	"custom-software-development": 0,
	"mobile-app-development": 0,
	"cloud-integration": 0,
	"security-audit": 0
};


export default function InvoicePage() {
	const features: Set<Feature> = new Set([
		"content-web-page",
		"dedicated-support",
		"brand-design",
		"advanced-ui-ux",
	]);

	// Calculate subtotal by summing all feature prices
	const subtotal = Array.from(features).reduce(
		(sum, feature) => sum + featuresPrices[feature],
		0,
	);


	return (
		<main className="relative">
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] -z-10",
				)}
			/>
			<Invoice>
				<Invoice.Header />
				<Invoice.Title title="Factura" date="16/4/2025" />
				<Invoice.Body>
					{Array.from(features).map((feature) => (
						<Invoice.Item
							key={feature}
							feature={feature as Feature}
							price={featuresPrices[feature]}
						/>
					))}
					<Invoice.Subtotal amount={subtotal} />
					<Invoice.Total amount={25000} />
				</Invoice.Body>
				<Invoice.Footer />
			</Invoice>
		</main>
	);
}
