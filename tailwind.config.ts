import { withTV } from "tailwind-variants/transformer";

const config = withTV({
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				light: "hsl(var(--light))",
				dark: "hsl(var(--dark))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				toggle: "hsl(var(--toggle))",
				bg: "hsl(var(--bg))",
				fg: "hsl(var(--fg))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					fg: "hsl(var(--primary-fg))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					fg: "hsl(var(--secondary-fg))",
				},
				tertiary: {
					DEFAULT: "hsl(var(--tertiary))",
					fg: "hsl(var(--tertiary-fg))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					fg: "hsl(var(--accent-fg))",
					subtle: "hsl(var(--accent-subtle))",
					"subtle-fg": "hsl(var(--accent-subtle-fg))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					fg: "hsl(var(--success-fg))",
				},
				info: {
					DEFAULT: "hsl(var(--info))",
					fg: "hsl(var(--info-fg))",
				},
				danger: {
					DEFAULT: "hsl(var(--danger))",
					fg: "hsl(var(--danger-fg))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					fg: "hsl(var(--warning-fg))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					fg: "hsl(var(--muted-fg))",
				},
				overlay: {
					DEFAULT: "hsl(var(--overlay))",
					fg: "hsl(var(--overlay-fg))",
				},
			},
			borderRadius: {
				"3xl": "calc(var(--radius) + 7.5px)",
				"2xl": "calc(var(--radius) + 5px)",
				xl: "calc(var(--radius) + 2.5px)",
				lg: "calc(var(--radius))",
				md: "calc(var(--radius) - 2.5px)",
				sm: "calc(var(--radius) - 5px)",
			},
			animation: {
				orbit: "orbit calc(var(--duration)*1s) linear infinite",
				shine: "shine var(--duration) infinite linear",
			},
			keyframes: {
				orbit: {
					"0%": {
						transform:
							"rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
					},
					"100%": {
						transform:
							"rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
					},
				},
				shine: {
					"0%": {
						"background-position": "0% 0%",
					},
					"50%": {
						"background-position": "100% 100%",
					},
					to: {
						"background-position": "0% 0%",
					},
				},
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwindcss-react-aria-components"),
	],
});

export default config;
