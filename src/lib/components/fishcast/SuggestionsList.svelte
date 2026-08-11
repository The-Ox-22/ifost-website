<script lang="ts">
	import type { Confidence, Suggestion } from '$lib/types/fishcast';

	let { suggestions }: { suggestions: Suggestion[] } = $props();

	const confidenceClasses: Record<Confidence, string> = {
		high: 'bg-nominal/10 text-nominal border-nominal/30',
		medium: 'bg-amber/10 text-amber border-amber/30',
		low: 'bg-panel-black text-ink-muted border-bezel'
	};
</script>

<div class="panel p-6">
	<p class="mb-4 font-mono text-xs tracking-widest text-amber uppercase">Suggested baits</p>
	{#if suggestions.length === 0}
		<p class="text-sm text-ink-muted">
			No strong signal from current conditions — try adjusting conditions.
		</p>
	{:else}
		<div class="grid gap-4 sm:grid-cols-2">
			{#each suggestions as s (s.bait_category)}
				<div class="rounded border border-bezel p-4">
					<div class="mb-2 flex items-center justify-between gap-2">
						<p class="font-display text-sm font-medium text-ink capitalize">
							{s.bait_category.replaceAll('_', ' ')}{s.variant ? ` (${s.variant})` : ''}
						</p>
						<span
							class="rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase {confidenceClasses[
								s.confidence
							]}"
						>
							{s.confidence}
						</span>
					</div>
					{#if s.rig}
						<p class="mb-1 font-mono text-xs text-ink-muted">Rig: {s.rig.replaceAll('_', ' ')}</p>
					{/if}
					<p class="mb-1 text-xs text-ink-muted">
						Colors: {s.colors.join(', ').replaceAll('_', ' ')}
					</p>
					<p class="mb-2 text-xs text-ink-muted">Retrieve: {s.retrieve}</p>
					<ul class="space-y-1">
						{#each s.why as reason (reason)}
							<li class="text-xs text-ink-muted/80">· {reason}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}
</div>
