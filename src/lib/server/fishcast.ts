import { env } from '$env/dynamic/private';
import type { Fetched, SuggestResponse } from '$lib/types/fishcast';

// ClusterIP service, per fishcast's Helm chart (charts/fishcast-chart/values.yaml):
// namespace "fishcast", service port 80. Override for local dev via
// `kubectl port-forward svc/fishcast 8080:80 -n fishcast` + FISHCAST_URL=http://localhost:8080.
const DEFAULT_BASE_URL = 'http://fishcast.fishcast.svc.cluster.local';

function baseUrl(): string {
	return env.FISHCAST_URL || DEFAULT_BASE_URL;
}

export type FishcastLocation = { zip: string } | { lat: number; lon: number };

export async function getSuggestion(
	fetchFn: typeof fetch,
	location: FishcastLocation
): Promise<Fetched<SuggestResponse>> {
	try {
		const response = await fetchFn(`${baseUrl()}/api/v1/suggest`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ location })
		});
		if (!response.ok) {
			const body = await response.json().catch(() => null);
			return { error: body?.error ?? `fishcast returned HTTP ${response.status}` };
		}
		return { data: (await response.json()) as SuggestResponse };
	} catch {
		return { error: 'fishcast service is unreachable' };
	}
}
