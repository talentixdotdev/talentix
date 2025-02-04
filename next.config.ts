import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withIntl(nextConfig);
