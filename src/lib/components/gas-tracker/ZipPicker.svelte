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

<div class="flex flex-col items-center gap-4 rounded-lg border border-zinc-800 p-8 text-center">
	<p class="max-w-sm text-sm text-zinc-400">
		Show gas prices for your area — allow location access, or enter a zip code.
	</p>

	<button
		onclick={onUseLocation}
		disabled={locating}
		class="rounded bg-amber-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 disabled:opacity-50"
	>
		{locating ? 'Locating…' : 'Use my location'}
	</button>

	{#if locationError}
		<p class="text-xs text-zinc-500">{locationError}</p>
	{/if}

	<div class="flex w-full max-w-xs items-center gap-3 text-xs text-zinc-700">
		<div class="h-px flex-1 bg-zinc-800"></div>
		or
		<div class="h-px flex-1 bg-zinc-800"></div>
	</div>

	<form onsubmit={submit} class="flex gap-2">
		<input
			type="text"
			inputmode="numeric"
			pattern="[0-9]{5}"
			maxlength="5"
			placeholder="Zip code"
			bind:value={zipInput}
			class="w-28 rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
		/>
		<button
			type="submit"
			class="rounded border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500"
		>
			Go
		</button>
	</form>
</div>
