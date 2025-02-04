import type { MetadataRoute } from "next";

const manifest: () => MetadataRoute.Manifest = () => {
	return {
		name: "Taletix - Find the best freelancer talent.",
		short_name: "Talentix",
		description: "Generated by create next app",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#ffffff",
		icons: [
			{
				src: "/icons/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icons/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icons/favicon.ico",
				type: "image/x-icon",
			},
		],
	};
};

export default manifest;
