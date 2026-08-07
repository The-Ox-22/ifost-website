<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	let { children } = $props();
</script>

<Nav />
<main class="min-h-screen bg-panel-black pt-16">
	{@render children()}
</main>
