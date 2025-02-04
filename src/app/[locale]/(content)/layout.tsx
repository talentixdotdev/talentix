import { type BaseLayoutProps, ContentLayout } from "@/components/layouts";

const ContentPagesLayout: React.FC<BaseLayoutProps> = ({ children }) => {
	return <ContentLayout>{children}</ContentLayout>;
};

export default ContentPagesLayout;
