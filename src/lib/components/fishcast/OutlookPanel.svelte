<script lang="ts">
	import type { FishingOutlook, FishingQuality } from '$lib/types/fishcast';

	let { outlook }: { outlook: FishingOutlook } = $props();

	const qualityCopy: Record<FishingQuality, { label: string; classes: string }> = {
		excellent: { label: 'Excellent', classes: 'bg-nominal/10 text-nominal border-nominal/30' },
		good: { label: 'Good', classes: 'bg-cyan/10 text-cyan border-cyan/30' },
		fair: { label: 'Fair', classes: 'bg-amber/10 text-amber border-amber/30' },
		poor: { label: 'Poor', classes: 'bg-panel-black text-ink-muted border-bezel' }
	};
</script>

<div class="panel p-6">
	<p class="mb-4 font-mono text-xs tracking-widest text-amber uppercase">Fishing outlook</p>

	<div class="mb-6">
		<p class="mb-1 font-mono text-xs tracking-wide text-ink-muted uppercase">Right now</p>
		{#if outlook.now}
			<span
				class="inline-block rounded-full border px-3 py-1 font-mono text-sm font-medium {qualityCopy[
					outlook.now
				].classes}"
			>
				{qualityCopy[outlook.now].label}
			</span>
		{:else}
			<p class="text-sm text-ink-muted">Not enough signal to say.</p>
		{/if}
	</div>

	{#if outlook.next_48h.length > 0}
		<div>
			<p class="mb-2 font-mono text-xs tracking-wide text-ink-muted uppercase">Next 48 hours</p>
			<div class="flex flex-wrap gap-2">
				{#each outlook.next_48h as w (w.label + w.start)}
					<div class="flex flex-col items-center gap-1 rounded border border-bezel px-3 py-2">
						<span class="font-mono text-xs text-ink-muted">{w.label}</span>
						<span
							class="rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase {qualityCopy[
								w.quality
							].classes}"
						>
							{qualityCopy[w.quality].label}
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
