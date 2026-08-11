<script lang="ts">
	import { humanize } from '$lib/format';
	import type { ResolvedConditions } from '$lib/types/fishcast';

	let {
		conditions,
		seasonPhase
	}: { conditions: ResolvedConditions; seasonPhase: string | undefined } = $props();

	type Row = { label: string; value: string };

	const rows = $derived.by((): Row[] => {
		const r: Row[] = [];
		const c = conditions;
		if (c.water_temp_f)
			r.push({ label: 'Water temp', value: `${c.water_temp_f.value.toFixed(0)}°F` });
		if (c.air_temp_f) r.push({ label: 'Air temp', value: `${c.air_temp_f.value.toFixed(0)}°F` });
		if (c.water_clarity) r.push({ label: 'Clarity', value: humanize(c.water_clarity.value) });
		if (c.water_body_type)
			r.push({ label: 'Water body', value: humanize(c.water_body_type.value) });
		if (c.wind_mph) r.push({ label: 'Wind', value: `${c.wind_mph.value.toFixed(0)} mph` });
		if (c.sky) r.push({ label: 'Sky', value: humanize(c.sky.value) });
		if (c.time_of_day) r.push({ label: 'Time of day', value: humanize(c.time_of_day.value) });
		if (c.pressure_trend)
			r.push({ label: 'Pressure trend', value: humanize(c.pressure_trend.value) });
		if (c.temp_trend) r.push({ label: 'Temp trend', value: humanize(c.temp_trend.value) });
		if (c.water_level_trend)
			r.push({ label: 'Water level', value: humanize(c.water_level_trend.value) });
		if (c.solunar_period) r.push({ label: 'Solunar', value: humanize(c.solunar_period.value) });
		return r;
	});
</script>

<div class="panel p-6">
	<p class="mb-4 font-mono text-xs tracking-widest text-amber uppercase">Conditions</p>
	{#if seasonPhase}
		<p class="mb-4 font-display text-2xl font-semibold text-ink">{humanize(seasonPhase)}</p>
	{/if}
	<div class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
		{#each rows as row (row.label)}
			<div>
				<p class="font-mono text-xs tracking-wide text-ink-muted uppercase">{row.label}</p>
				<p class="text-sm text-ink">{row.value}</p>
			</div>
		{/each}
	</div>
</div>
