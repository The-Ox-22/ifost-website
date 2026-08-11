<script lang="ts">
	import type { StructureSuggestion } from '$lib/types/fishcast';

	let { structure }: { structure: StructureSuggestion[] } = $props();
</script>

<div class="panel p-6">
	<p class="mb-4 font-mono text-xs tracking-widest text-amber uppercase">Where to target</p>
	{#if structure.length === 0}
		<p class="text-sm text-ink-muted">No structure recommendation from current conditions.</p>
	{:else}
		<ul class="space-y-3">
			{#each structure as s (s.feature)}
				<li>
					<p class="text-sm text-ink capitalize">{s.feature}</p>
					<p class="text-xs text-ink-muted">{s.why.join(' ')}</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>
