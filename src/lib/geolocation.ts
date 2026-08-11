// Browser-only helpers for resolving the visitor's zip code. gas-tracker's
// own geocoding (src/geocode.rs) only goes zip -> place, so the lat/lng ->
// zip step happens here against a free, no-key, CORS-friendly reverse-geocode
// API meant for exactly this client-side use case.

const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const STORAGE_KEY = 'gas-tracker:zip';

export function getCurrentPosition(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('geolocation unsupported'));
			return;
		}
		navigator.geolocation.getCurrentPosition(resolve, reject, {
			timeout: 10_000,
			enableHighAccuracy: true
		});
	});
}

/** Resolves to a zip code from the browser's geolocation, or null if permission is denied, geolocation is unsupported, or the reverse-geocode lookup fails. */
export async function getBrowserZip(): Promise<string | null> {
	try {
		const position = await getCurrentPosition();
		const url = new URL(REVERSE_GEOCODE_URL);
		url.searchParams.set('latitude', String(position.coords.latitude));
		url.searchParams.set('longitude', String(position.coords.longitude));
		url.searchParams.set('localityLanguage', 'en');

		const response = await fetch(url);
		if (!response.ok) return null;

		const body = await response.json();
		const postcode = typeof body.postcode === 'string' ? body.postcode.trim() : '';
		return postcode || null;
	} catch {
		return null;
	}
}

export function getStoredZip(): string | null {
	try {
		return localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
}

export function setStoredZip(zip: string): void {
	try {
		localStorage.setItem(STORAGE_KEY, zip);
	} catch {
		// localStorage unavailable (private browsing, disabled storage) - not fatal
	}
}

export function clearStoredZip(): void {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// ignore
	}
}
