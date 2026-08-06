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

<div class="rounded-lg border border-zinc-800 p-6">
	<p class="mb-1 font-mono text-xs tracking-widest text-amber-400 uppercase">Seasonal pattern</p>

	{#if seasonality?.data}
		{@const s = seasonality.data.seasonality}
		<p class="mb-4 text-sm text-zinc-500">
			Currently
			<span class={normDelta >= 0 ? 'text-amber-400' : 'text-emerald-400'}
				>{formatPercent(normDelta)}</span
			>
			vs. the {formatMonth(s.current_month)} norm ({formatPrice(s.seasonal_norm)})
		</p>
		<div class="h-56 text-zinc-500" style="--color-primary: var(--color-amber-400);">
			<BarChart
				data={chartData}
				x="label"
				y="price"
				grid={false}
				props={{ yAxis: { format: (v: number) => `$${v.toFixed(2)}` } }}
			/>
		</div>
	{:else}
		<p class="text-sm text-zinc-600">
			Seasonality data temporarily unavailable{seasonality?.error ? ` (${seasonality.error})` : ''}.
		</p>
	{/if}
</div>
