export interface OpenGraphConfig {
	type: 'website' | 'article';
	title: string;
	description: string;
	url?: string;
	image?: string;
	siteName?: string;
}

export interface TwitterCardConfig {
	card: 'summary' | 'summary_large_image' | 'app' | 'player';
	title: string;
	description: string;
	site?: string;
	creator?: string;
	image?: string;
}

export interface SEOConfig {
	title: string;
	description: string;
	author?: string;
	robots?: string;
	canonical?: string;
	openGraph?: OpenGraphConfig;
	twitter?: TwitterCardConfig;
}
