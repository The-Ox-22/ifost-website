// Mirrors the serde structs in gas-tracker's src/*.rs and the response
// shapes assembled in src/server.rs. Kept dependency-free (no server-only
// imports) so both `+page.server.ts` and `+page.svelte` can import it.

export interface Location {
	city: string;
	state_name: string;
	state_abbr: string;
}

export interface RegionalAverage {
	region_label: string;
	price: number;
	period_date: string;
}

export interface CurrentResponse {
	location: Location;
	regional_average: RegionalAverage;
}

export interface ForecastPoint {
	period: string;
	price: number;
}

export interface Forecast {
	region_label: string;
	points: ForecastPoint[];
}

export interface ForecastResponse {
	location: Location;
	forecast: Forecast;
}

export interface SeasonalMonth {
	month: number;
	avg_price: number;
	sample_count: number;
}

export interface SeasonalityReport {
	region_label: string;
	curve: SeasonalMonth[];
	latest_period: string;
	latest_price: number;
	current_month: number;
	seasonal_norm: number;
}

export interface SeasonalityResponse {
	location: Location;
	seasonality: SeasonalityReport;
}

export type Verdict = 'LikelyRising' | 'LikelyFalling' | 'Mixed';

export interface LeadingIndicators {
	crude_price: number;
	crude_period: string;
	crude_pct_change_14d: number;
	gasoline_stock: number;
	gasoline_stock_period: string;
	gasoline_stock_change: number;
	gasoline_stock_pct_change: number;
	verdict: Verdict;
}

export type Fetched<T> = { data: T; error?: undefined } | { data?: undefined; error: string };
