import { BaseLayout } from "@/components/layouts/base-layout";
import { routing } from "@/lib/i18n/routing";

const GlobalNotFoundPage: React.FC = () => (
	<BaseLayout locale={routing.defaultLocale}>
		<main className={"flex flex-col items-center justify-center h-screen"}>
			Not Found
		</main>
	</BaseLayout>
);

export default GlobalNotFoundPage;
