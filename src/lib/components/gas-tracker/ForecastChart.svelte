<script lang="ts">
	import { LineChart } from 'layerchart';
	import { formatPeriod } from '$lib/format';
	import type { Fetched, ForecastResponse } from '$lib/types/gasTracker';

	let { forecast }: { forecast: Fetched<ForecastResponse> | undefined } = $props();

	const chartData = $derived(
		forecast?.data
			? forecast.data.forecast.points.map((p) => ({
					label: formatPeriod(p.period),
					price: p.price
				}))
			: []
	);
</script>

<div class="panel p-6">
	<p class="mb-1 font-mono text-xs tracking-widest text-amber uppercase">18-month forecast</p>

	{#if forecast?.data}
		<p class="mb-4 font-mono text-sm text-ink-muted">
			EIA Short-Term Energy Outlook · {forecast.data.forecast.region_label}
		</p>
		<div class="h-56 text-ink-muted" style="--color-primary: var(--color-cyan);">
			<LineChart
				data={chartData}
				x="label"
				y="price"
				grid={false}
				props={{
					yAxis: { format: (v: number) => `$${v.toFixed(2)}` },
					xAxis: { ticks: 4 }
				}}
			/>
		</div>
	{:else}
		<p class="text-sm text-ink-muted">
			Forecast temporarily unavailable{forecast?.error ? ` (${forecast.error})` : ''}.
		</p>
	{/if}
</div>
