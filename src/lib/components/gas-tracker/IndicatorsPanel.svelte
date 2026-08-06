<script lang="ts">
	import { formatPercent, formatPeriod } from '$lib/format';
	import type { Fetched, LeadingIndicators, Verdict } from '$lib/types/gasTracker';

	let { indicators }: { indicators: Fetched<LeadingIndicators> | undefined } = $props();

	const verdictCopy: Record<Verdict, { label: string; classes: string }> = {
		LikelyRising: {
			label: 'Likely rising',
			classes: 'bg-amber-400/10 text-amber-400 border-amber-400/30'
		},
		LikelyFalling: {
			label: 'Likely falling',
			classes: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30'
		},
		Mixed: { label: 'Mixed signals', classes: 'bg-zinc-800 text-zinc-400 border-zinc-700' }
	};

	function changeClasses(delta: number): string {
		if (delta > 0) return 'text-amber-400';
		if (delta < 0) return 'text-emerald-400';
		return 'text-zinc-500';
	}
</script>

<div class="rounded-lg border border-zinc-800 p-6">
	<p class="mb-4 font-mono text-xs tracking-widest text-amber-400 uppercase">Leading indicators</p>

	{#if indicators?.data}
		{@const i = indicators.data}
		<div class="flex flex-wrap items-start justify-between gap-6">
			<div>
				<p class="mb-1 text-xs tracking-wide text-zinc-500 uppercase">WTI crude</p>
				<p class="text-2xl text-zinc-100 tabular-nums">${i.crude_price.toFixed(2)}</p>
				<p class="text-sm tabular-nums {changeClasses(i.crude_pct_change_14d)}">
					{formatPercent(i.crude_pct_change_14d)} / 14d
				</p>
				<p class="mt-1 text-xs text-zinc-600">as of {formatPeriod(i.crude_period)}</p>
			</div>

			<div>
				<p class="mb-1 text-xs tracking-wide text-zinc-500 uppercase">Gasoline stocks</p>
				<p class="text-2xl text-zinc-100 tabular-nums">{i.gasoline_stock.toLocaleString()} kb</p>
				<p class="text-sm tabular-nums {changeClasses(-i.gasoline_stock_change)}">
					{formatPercent(i.gasoline_stock_pct_change)} w/w
				</p>
				<p class="mt-1 text-xs text-zinc-600">as of {formatPeriod(i.gasoline_stock_period)}</p>
			</div>

			<div class="flex flex-col items-start gap-1">
				<p class="mb-1 text-xs tracking-wide text-zinc-500 uppercase">Near-term verdict</p>
				<span
					class="rounded-full border px-3 py-1 text-sm font-medium {verdictCopy[i.verdict].classes}"
				>
					{verdictCopy[i.verdict].label}
				</span>
			</div>
		</div>
	{:else}
		<p class="text-sm text-zinc-600">
			Indicators temporarily unavailable{indicators?.error ? ` (${indicators.error})` : ''}.
		</p>
	{/if}
</div>
