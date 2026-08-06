import { getCurrent, getForecast, getIndicators, getSeasonality } from '$lib/server/gasTracker';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const zip = url.searchParams.get('zip');

	const [indicators, current, forecast, seasonality] = await Promise.all([
		getIndicators(fetch),
		zip ? getCurrent(fetch, zip) : Promise.resolve(undefined),
		zip ? getForecast(fetch, zip) : Promise.resolve(undefined),
		zip ? getSeasonality(fetch, zip) : Promise.resolve(undefined)
	]);

	return { zip, indicators, current, forecast, seasonality };
};
