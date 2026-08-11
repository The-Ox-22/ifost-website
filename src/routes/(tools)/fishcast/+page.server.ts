import { getSuggestion } from '$lib/server/fishcast';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const zip = url.searchParams.get('zip');
	const lat = Number(url.searchParams.get('lat'));
	const lon = Number(url.searchParams.get('lon'));
	const hasLatLon =
		url.searchParams.has('lat') &&
		url.searchParams.has('lon') &&
		Number.isFinite(lat) &&
		Number.isFinite(lon);

	const location = zip ? { zip } : hasLatLon ? { lat, lon } : null;
	const hasLocation = location !== null;

	const suggestion = location ? await getSuggestion(fetch, location) : undefined;

	return { hasLocation, suggestion };
};
