import { env } from '$env/dynamic/private';
import type {
	CurrentResponse,
	Fetched,
	ForecastResponse,
	LeadingIndicators,
	SeasonalityResponse
} from '$lib/types/gasTracker';

// ClusterIP service, per gas-tracker's Helm chart (charts/gas-tracker-chart/values.yaml):
// namespace "gas-tracker", service port 80. Override for local dev via
// `kubectl port-forward svc/gas-tracker 8080:80 -n gas-tracker` + GAS_TRACKER_URL=http://localhost:8080.
const DEFAULT_BASE_URL = 'http://gas-tracker.gas-tracker.svc.cluster.local';

function baseUrl(): string {
	return env.GAS_TRACKER_URL || DEFAULT_BASE_URL;
}

async function fetchJson<T>(fetchFn: typeof fetch, path: string): Promise<Fetched<T>> {
	try {
		const response = await fetchFn(`${baseUrl()}${path}`);
		if (!response.ok) {
			const body = await response.json().catch(() => null);
			return { error: body?.error ?? `gas-tracker returned HTTP ${response.status}` };
		}
		return { data: (await response.json()) as T };
	} catch {
		return { error: 'gas-tracker service is unreachable' };
	}
}

export function getCurrent(fetchFn: typeof fetch, zip: string): Promise<Fetched<CurrentResponse>> {
	return fetchJson<CurrentResponse>(fetchFn, `/api/current?zip=${encodeURIComponent(zip)}`);
}

export function getForecast(
	fetchFn: typeof fetch,
	zip: string
): Promise<Fetched<ForecastResponse>> {
	return fetchJson<ForecastResponse>(fetchFn, `/api/forecast?zip=${encodeURIComponent(zip)}`);
}

export function getSeasonality(
	fetchFn: typeof fetch,
	zip: string
): Promise<Fetched<SeasonalityResponse>> {
	return fetchJson<SeasonalityResponse>(fetchFn, `/api/seasonality?zip=${encodeURIComponent(zip)}`);
}

export function getIndicators(fetchFn: typeof fetch): Promise<Fetched<LeadingIndicators>> {
	return fetchJson<LeadingIndicators>(fetchFn, '/api/indicators');
}
