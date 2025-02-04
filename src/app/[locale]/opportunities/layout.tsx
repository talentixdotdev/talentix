import type { BaseLayoutProps } from "@/components/layouts";
import { OpportunitiesLayout } from "@/components/layouts/opportunities-layout";

const OpportunitiesPageLayout: React.FC<BaseLayoutProps> = ({ children }) => {
	return <OpportunitiesLayout>{children}</OpportunitiesLayout>;
};

export default OpportunitiesPageLayout;
