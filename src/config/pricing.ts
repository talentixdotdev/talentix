export const plans = ["star", "star-plus", "big-star"] as const;

export const features = {
	"brand-design": ["star", "big-star", "star-plus"],
	"content-web-page": ["star", "big-star", "star-plus"],
	"social-networks-design": ["star", "big-star", "star-plus"],
	maintenance: ["star", "star-plus", "big-star"],
	"basic-support": ["star", "big-star", "star-plus"],
	"everything-before": ["star-plus", "big-star"],
	"custom-web-design": ["star-plus", "big-star"],
	"ui-ux-improvement": ["star-plus", "big-star"],
	"seo-optimization": ["star-plus", "big-star"],
	"e-commerce-integration": ["star-plus", "big-star"],
	"dedicated-support": ["star-plus", "big-star"],
	"custom-software-development": ["big-star"],
	"advanced-ui-ux": ["big-star"],
	"mobile-app-development": ["big-star"],
	"cloud-integration": ["big-star"],
	"security-audit": ["big-star"],
};

export const mainFeatures = {
	"brand-design": ["star", "big-star", "star-plus"],
	"content-web-page": ["star", "big-star", "star-plus"],
	"social-networks-design": ["star", "big-star", "star-plus"],
	maintenance: ["star", "star-plus", "big-star"],
	"basic-support": ["star", "big-star", "star-plus"],
	"e-commerce-integration": ["star-plus", "big-star"],
	"dedicated-support": ["star-plus", "big-star"],
	"cloud-integration": ["big-star"],
	"mobile-app-development": ["big-star"],
	"security-audit": ["big-star"],

};

export const plansPrice = {
	star: {
		min: 99,
		max: 299,
	},
	"star-plus": {
		min: 300,
		max: 699,
	},
	"big-star": {
		min: 700,
		max: 1999,
	},
} as const;

export const maintenancesPrice = {
	star: 10,
	"star-plus": 25,
	"big-star": 50,
};

export const plansFreeMaintenancesMonths = {
	star: 3,
	"star-plus": 6,
	"big-star": 12,
};
