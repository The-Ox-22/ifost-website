<script lang="ts">
	import { formatPercent, formatPeriod } from '$lib/format';
	import type { Fetched, LeadingIndicators, Verdict } from '$lib/types/gasTracker';

	let { indicators }: { indicators: Fetched<LeadingIndicators> | undefined } = $props();

	const verdictCopy: Record<Verdict, { label: string; classes: string }> = {
		LikelyRising: { label: 'Likely rising', classes: 'bg-amber/10 text-amber border-amber/30' },
		LikelyFalling: {
			label: 'Likely falling',
			classes: 'bg-nominal/10 text-nominal border-nominal/30'
		},
		Mixed: { label: 'Mixed signals', classes: 'bg-panel-black text-ink-muted border-bezel' }
	};

	function changeClasses(delta: number): string {
		if (delta > 0) return 'text-amber';
		if (delta < 0) return 'text-nominal';
		return 'text-ink-muted';
	}
</script>

<div class="panel p-6">
	<p class="mb-4 font-mono text-xs tracking-widest text-amber uppercase">Leading indicators</p>

	{#if indicators?.data}
		{@const i = indicators.data}
		<div class="flex flex-wrap items-start justify-between gap-6">
			<div>
				<p class="mb-1 font-mono text-xs tracking-wide text-ink-muted uppercase">WTI crude</p>
				<p class="font-display text-2xl text-ink tabular-nums">${i.crude_price.toFixed(2)}</p>
				<p class="font-mono text-sm tabular-nums {changeClasses(i.crude_pct_change_14d)}">
					{formatPercent(i.crude_pct_change_14d)} / 14d
				</p>
				<p class="mt-1 font-mono text-xs text-ink-muted/70">as of {formatPeriod(i.crude_period)}</p>
			</div>

			<div>
				<p class="mb-1 font-mono text-xs tracking-wide text-ink-muted uppercase">Gasoline stocks</p>
				<p class="font-display text-2xl text-ink tabular-nums">
					{i.gasoline_stock.toLocaleString()} kb
				</p>
				<p class="font-mono text-sm tabular-nums {changeClasses(-i.gasoline_stock_change)}">
					{formatPercent(i.gasoline_stock_pct_change)} w/w
				</p>
				<p class="mt-1 font-mono text-xs text-ink-muted/70">
					as of {formatPeriod(i.gasoline_stock_period)}
				</p>
			</div>

			<div class="flex flex-col items-start gap-1">
				<p class="mb-1 font-mono text-xs tracking-wide text-ink-muted uppercase">
					Near-term verdict
				</p>
				<span
					class="rounded-full border px-3 py-1 font-mono text-sm font-medium {verdictCopy[i.verdict]
						.classes}"
				>
					{verdictCopy[i.verdict].label}
				</span>
			</div>
		</div>
	{:else}
		<p class="text-sm text-ink-muted">
			Indicators temporarily unavailable{indicators?.error ? ` (${indicators.error})` : ''}.
		</p>
	{/if}
</div>
