<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		clearStoredLocation,
		getBrowserLatLon,
		getStoredLocation,
		setStoredLocation,
		type FishcastLocation
	} from '$lib/fishcastLocation';
	import LocationPicker from '$lib/components/fishcast/LocationPicker.svelte';
	import ConditionsPanel from '$lib/components/fishcast/ConditionsPanel.svelte';
	import OutlookPanel from '$lib/components/fishcast/OutlookPanel.svelte';
	import SuggestionsList from '$lib/components/fishcast/SuggestionsList.svelte';
	import StructureList from '$lib/components/fishcast/StructureList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let locating = $state(false);
	let locationError = $state<string | null>(null);

	function navigateToLocation(location: FishcastLocation, opts: { replaceState?: boolean } = {}) {
		setStoredLocation(location);
		const params =
			'zip' in location
				? `zip=${encodeURIComponent(location.zip)}`
				: `lat=${location.lat}&lon=${location.lon}`;
		goto(`?${params}`, opts);
	}

	async function useMyLocation() {
		locating = true;
		locationError = null;
		const latLon = await getBrowserLatLon();
		locating = false;
		if (latLon) {
			navigateToLocation(latLon);
		} else {
			locationError = "Couldn't determine your location — enter a zip code instead.";
		}
	}

	function submitZip(zip: string) {
		navigateToLocation({ zip });
	}

	function changeLocation() {
		clearStoredLocation();
		goto('/fishcast');
	}

	$effect(() => {
		if (!data.hasLocation) {
			const stored = getStoredLocation();
			if (stored) navigateToLocation(stored, { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>Fishcast · ifost.dev</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-6 py-16">
	<header class="mb-10 flex items-baseline justify-between">
		<div>
			<p class="mb-2 font-mono text-xs tracking-widest text-amber uppercase">Tools</p>
			<h1 class="font-display text-2xl font-semibold text-ink">Fishcast</h1>
		</div>
		{#if data.hasLocation}
			<button
				onclick={changeLocation}
				class="font-mono text-sm text-ink-muted transition-colors hover:text-cyan"
			>
				Change location
			</button>
		{/if}
	</header>

	{#if !data.hasLocation}
		<LocationPicker
			{locating}
			{locationError}
			onUseLocation={useMyLocation}
			onSubmitZip={submitZip}
		/>
	{:else if data.suggestion?.data}
		{@const s = data.suggestion.data}
		<div class="grid gap-6">
			<p class="font-mono text-xs text-ink-muted">
				{s.location.resolved_name ?? `${s.location.lat.toFixed(2)}, ${s.location.lon.toFixed(2)}`}
			</p>
			<ConditionsPanel conditions={s.resolved_conditions} seasonPhase={s.season_phase} />
			<OutlookPanel outlook={s.fishing_outlook} />
			<SuggestionsList suggestions={s.suggestions} />
			<StructureList structure={s.target_structure} />
		</div>
	{:else}
		<div class="panel p-8 text-center">
			<p class="text-sm text-ink-muted">
				Couldn't get a suggestion{data.suggestion?.error ? ` (${data.suggestion.error})` : ''}.
			</p>
		</div>
	{/if}
</div>
