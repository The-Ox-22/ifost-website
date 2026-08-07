<script lang="ts">
	let {
		locating,
		locationError,
		onUseLocation,
		onSubmitZip
	}: {
		locating: boolean;
		locationError: string | null;
		onUseLocation: () => void;
		onSubmitZip: (zip: string) => void;
	} = $props();

	let zipInput = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		const zip = zipInput.trim();
		if (/^\d{5}$/.test(zip)) onSubmitZip(zip);
	}
</script>

<div class="panel flex flex-col items-center gap-4 p-8 text-center">
	<p class="max-w-sm text-sm text-ink-muted">
		Show gas prices for your area — allow location access, or enter a zip code.
	</p>

	<button
		onclick={onUseLocation}
		disabled={locating}
		class="rounded bg-amber px-4 py-2 text-sm font-medium text-panel-black transition-colors hover:bg-amber/85 disabled:opacity-50"
	>
		{locating ? 'Locating…' : 'Use my location'}
	</button>

	{#if locationError}
		<p class="font-mono text-xs text-ink-muted">{locationError}</p>
	{/if}

	<div class="flex w-full max-w-xs items-center gap-3 font-mono text-xs text-ink-muted/60">
		<div class="h-px flex-1 bg-bezel"></div>
		or
		<div class="h-px flex-1 bg-bezel"></div>
	</div>

	<form onsubmit={submit} class="flex gap-2">
		<input
			type="text"
			inputmode="numeric"
			pattern={'[0-9]{5}'}
			maxlength="5"
			placeholder="Zip code"
			bind:value={zipInput}
			class="w-28 rounded border border-bezel bg-panel-black px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50 focus:border-amber focus:outline-none"
		/>
		<button
			type="submit"
			class="rounded border border-bezel px-4 py-2 text-sm text-ink-muted transition-colors hover:border-cyan/50 hover:text-cyan"
		>
			Go
		</button>
	</form>
</div>
