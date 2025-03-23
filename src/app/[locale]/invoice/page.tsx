import { Invoice } from "@/components/invoice";
import { DotPattern } from "@/components/landing/ui/dot-pattern";
import type { Feature } from "@/types/pricing";
import { cn } from "@/utils/classes";

const featuresPrices: Record<Feature, number> = {
	"content-web-page": 150,
	"e-commerce-integration": 300,
	"dedicated-support": 450,
	"cloud-integration": 600,
	"social-networks-design": 50,
	"brand-design": 100,
	"advanced-ui-ux": 200,
	"custom-web-design": 250,
	"custom-software-development": 350,
	"ui-ux-improvement": 400,
	"mobile-app-development": 500,
	"seo-optimization": 150,
	"basic-support": 50,
	"security-audit": 200,
	"maintenance": 100,
	"everything-before": 799
};

export default function InvoicePage() {
	const features: Set<Feature> = new Set(["content-web-page"]);

	return (
		<main className="relative">
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] -z-10",
				)}
			/>
			<Invoice>
				<Invoice.Header />
				<Invoice.Title title="Factura" date="17/3/2025" />
				<Invoice.Body>
					{Array.from(features).map((feature) => (
						<Invoice.Item
							key={feature}
							feature={feature as Feature}
							price={featuresPrices[feature]}
						/>
					))}
					<Invoice.Subtotal amount={150} />
					<Invoice.Total amount={150} />
				</Invoice.Body>
				<Invoice.Footer />
			</Invoice>
		</main>
	);
}
