import type { plans, features } from "@/config/pricing";

export type Plan = (typeof plans)[number];

export type Feature = keyof typeof features;
