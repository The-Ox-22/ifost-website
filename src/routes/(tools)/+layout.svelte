<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	let { children } = $props();
</script>

<Nav />
<main class="pt-14 min-h-screen bg-zinc-950">
	{@render children()}
</main>
