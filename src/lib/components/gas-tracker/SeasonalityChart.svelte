<script lang="ts">
	import { BarChart } from 'layerchart';
	import { formatMonth, formatPercent, formatPrice } from '$lib/format';
	import type { Fetched, SeasonalityResponse } from '$lib/types/gasTracker';

	let { seasonality }: { seasonality: Fetched<SeasonalityResponse> | undefined } = $props();

	const chartData = $derived(
		seasonality?.data
			? seasonality.data.seasonality.curve.map((m) => ({
					label: formatMonth(m.month),
					price: m.avg_price
				}))
			: []
	);

	const normDelta = $derived.by(() => {
		if (!seasonality?.data) return 0;
		const { latest_price, seasonal_norm } = seasonality.data.seasonality;
		return ((latest_price - seasonal_norm) / seasonal_norm) * 100;
	});
</script>

<div class="panel p-6">
	<p class="mb-1 font-mono text-xs tracking-widest text-amber uppercase">Seasonal pattern</p>

	{#if seasonality?.data}
		{@const s = seasonality.data.seasonality}
		<p class="mb-4 font-mono text-sm text-ink-muted">
			Currently
			<span class={normDelta >= 0 ? 'text-amber' : 'text-nominal'}>{formatPercent(normDelta)}</span>
			vs. the {formatMonth(s.current_month)} norm ({formatPrice(s.seasonal_norm)})
		</p>
		<div class="h-56 text-ink-muted" style="--color-primary: var(--color-amber);">
			<BarChart
				data={chartData}
				x="label"
				y="price"
				grid={false}
				props={{ yAxis: { format: (v: number) => `$${v.toFixed(2)}` } }}
			/>
		</div>
	{:else}
		<p class="text-sm text-ink-muted">
			Seasonality data temporarily unavailable{seasonality?.error ? ` (${seasonality.error})` : ''}.
		</p>
	{/if}
</div>
