<script lang="ts">
	import { formatPrice, formatPeriod } from '$lib/format';
	import type { CurrentResponse, Fetched } from '$lib/types/gasTracker';

	let { current }: { current: Fetched<CurrentResponse> | undefined } = $props();
</script>

<div class="panel p-8">
	{#if current?.data}
		{@const { location, regional_average } = current.data}
		<p class="mb-2 font-mono text-xs tracking-widest text-amber uppercase">
			{regional_average.region_label} average · {location.city}, {location.state_abbr}
		</p>
		<p class="font-display text-5xl font-semibold text-ink tabular-nums">
			{formatPrice(regional_average.price)}
		</p>
		<p class="mt-2 font-mono text-sm text-ink-muted">
			per gallon, week of {formatPeriod(regional_average.period_date)}
		</p>
	{:else}
		<p class="text-sm text-ink-muted">
			Current price temporarily unavailable{current?.error ? ` (${current.error})` : ''}.
		</p>
	{/if}
</div>
