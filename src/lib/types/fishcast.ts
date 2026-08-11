// Mirrors the serde structs in fishcast's src/*.rs (ResolvedConditions,
// Suggestion, StructureSuggestion) and the response shape assembled in
// src/report.rs. Kept dependency-free so both +page.server.ts and
// +page.svelte can import it.

export type Source = 'fetched' | 'provided' | 'derived';

export interface Resolved<T> {
	value: T;
	source: Source;
}

/** Field is omitted from the JSON entirely when unknown - a plain optional property. */
export type Field<T> = Resolved<T> | undefined;

export type Sky = 'clear' | 'partly_cloudy' | 'overcast';
export type PrecipRecent = 'none' | 'light' | 'heavy';
export type PressureTrend = 'falling' | 'rising' | 'stable';
export type TempTrend =
	'stable' | 'warming' | 'cooling' | 'cold_front_recent' | 'recovering_from_front';
export type WaterLevelTrend = 'rising' | 'falling' | 'stable';
export type SolunarPeriod = 'major' | 'minor' | 'neutral';
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
export type SeasonPhase = 'winter' | 'pre_spawn' | 'spawn' | 'post_spawn' | 'summer' | 'fall';
export type WaterClarity = 'clear' | 'stained' | 'muddy';
export type WaterBodyType = 'pond' | 'natural_lake' | 'reservoir' | 'river';
export type Cover = 'vegetation' | 'laydowns' | 'riprap' | 'docks' | 'timber' | 'none_known';

export interface ResolvedConditions {
	air_temp_f?: Field<number>;
	sky?: Field<Sky>;
	wind_mph?: Field<number>;
	wind_direction_deg?: Field<number>;
	pressure_mb?: Field<number>;
	precip_recent?: Field<PrecipRecent>;
	pressure_trend?: Field<PressureTrend>;
	temp_trend?: Field<TempTrend>;
	water_temp_f?: Field<number>;
	water_level_trend?: Field<WaterLevelTrend>;
	flow_cfs?: Field<number>;
	solunar_period?: Field<SolunarPeriod>;
	time_of_day?: Field<TimeOfDay>;
	season_phase?: Field<SeasonPhase>;
	water_clarity?: Field<WaterClarity>;
	water_body_type?: Field<WaterBodyType>;
	cover?: Field<Cover[]>;
}

export type Confidence = 'high' | 'medium' | 'low';

export interface Suggestion {
	bait_category: string;
	rig?: string;
	variant?: string;
	colors: string[];
	retrieve: string;
	confidence: Confidence;
	why: string[];
}

export interface StructureSuggestion {
	feature: string;
	why: string[];
}

export interface ResolvedLocation {
	lat: number;
	lon: number;
	resolved_name?: string;
}

/** General conditions favorability, independent of bait choice. */
export type FishingQuality = 'poor' | 'fair' | 'good' | 'excellent';

export interface OutlookWindow {
	label: string;
	start: string;
	end: string;
	quality: FishingQuality;
}

export interface FishingOutlook {
	now?: FishingQuality;
	next_48h: OutlookWindow[];
}

export interface SuggestResponse {
	location: ResolvedLocation;
	resolved_conditions: ResolvedConditions;
	season_phase?: SeasonPhase;
	suggestions: Suggestion[];
	target_structure: StructureSuggestion[];
	fishing_outlook: FishingOutlook;
}

export type Fetched<T> = { data: T; error?: undefined } | { data?: undefined; error: string };
