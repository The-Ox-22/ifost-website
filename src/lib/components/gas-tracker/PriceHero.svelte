<script lang="ts">
	import { formatPrice, formatPeriod } from '$lib/format';
	import type { CurrentResponse, Fetched } from '$lib/types/gasTracker';

	let { current }: { current: Fetched<CurrentResponse> | undefined } = $props();
</script>

<div class="rounded-lg border border-zinc-800 p-8">
	{#if current?.data}
		{@const { location, regional_average } = current.data}
		<p class="mb-2 font-mono text-xs tracking-widest text-amber-400 uppercase">
			{regional_average.region_label} average · {location.city}, {location.state_abbr}
		</p>
		<p class="text-5xl font-semibold text-zinc-100 tabular-nums">
			{formatPrice(regional_average.price)}
		</p>
		<p class="mt-2 text-sm text-zinc-500">
			per gallon, week of {formatPeriod(regional_average.period_date)}
		</p>
	{:else}
		<p class="text-sm text-zinc-600">
			Current price temporarily unavailable{current?.error ? ` (${current.error})` : ''}.
		</p>
	{/if}
</div>
