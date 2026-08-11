// Browser-only helpers for resolving the visitor's location for fishcast.
// Unlike gas-tracker (which only accepts a zip and needs a reverse-geocode
// step to get from browser coordinates to one), fishcast's API accepts
// lat/lon directly - geolocation here goes straight to the API's own
// location shape, no reverse-geocoding service needed.

import { getCurrentPosition } from './geolocation';

const STORAGE_KEY = 'fishcast:location';

export type FishcastLocation = { zip: string } | { lat: number; lon: number };

/** Resolves to the browser's lat/lon, or null if permission is denied or geolocation is unsupported. */
export async function getBrowserLatLon(): Promise<{ lat: number; lon: number } | null> {
	try {
		const position = await getCurrentPosition();
		return { lat: position.coords.latitude, lon: position.coords.longitude };
	} catch {
		return null;
	}
}

export function getStoredLocation(): FishcastLocation | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as FishcastLocation) : null;
	} catch {
		return null;
	}
}

export function setStoredLocation(location: FishcastLocation): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
	} catch {
		// localStorage unavailable (private browsing, disabled storage) - not fatal
	}
}

export function clearStoredLocation(): void {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// ignore
	}
}
