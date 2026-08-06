<script lang="ts">
	import { goto } from '$app/navigation';
	import { clearStoredZip, getBrowserZip, getStoredZip, setStoredZip } from '$lib/geolocation';
	import PriceHero from '$lib/components/gas-tracker/PriceHero.svelte';
	import IndicatorsPanel from '$lib/components/gas-tracker/IndicatorsPanel.svelte';
	import SeasonalityChart from '$lib/components/gas-tracker/SeasonalityChart.svelte';
	import ForecastChart from '$lib/components/gas-tracker/ForecastChart.svelte';
	import ZipPicker from '$lib/components/gas-tracker/ZipPicker.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let locating = $state(false);
	let locationError = $state<string | null>(null);

	function navigateToZip(zip: string, opts: { replaceState?: boolean } = {}) {
		setStoredZip(zip);
		goto(`?zip=${encodeURIComponent(zip)}`, opts);
	}

	async function useMyLocation() {
		locating = true;
		locationError = null;
		const zip = await getBrowserZip();
		locating = false;
		if (zip) {
			navigateToZip(zip);
		} else {
			locationError = "Couldn't determine your location — enter a zip code instead.";
		}
	}

	function changeZip() {
		clearStoredZip();
		goto('/gas-tracker');
	}

	$effect(() => {
		if (!data.zip) {
			const stored = getStoredZip();
			if (stored) navigateToZip(stored, { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>Gas Tracker · ifost.dev</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-6 py-16">
	<header class="mb-10 flex items-baseline justify-between">
		<div>
			<p class="mb-2 font-mono text-xs tracking-widest text-amber-400 uppercase">Tools</p>
			<h1 class="text-2xl font-semibold text-zinc-100">Gas Tracker</h1>
		</div>
		{#if data.zip}
			<button
				onclick={changeZip}
				class="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
			>
				Change zip ({data.zip})
			</button>
		{/if}
	</header>

	{#if !data.zip}
		<ZipPicker
			{locating}
			{locationError}
			onUseLocation={useMyLocation}
			onSubmitZip={navigateToZip}
		/>
	{:else}
		<div class="grid gap-6">
			<PriceHero current={data.current} />
			<div class="grid gap-6 md:grid-cols-2">
				<SeasonalityChart seasonality={data.seasonality} />
				<ForecastChart forecast={data.forecast} />
			</div>
			<IndicatorsPanel indicators={data.indicators} />
		</div>
	{/if}
</div>
