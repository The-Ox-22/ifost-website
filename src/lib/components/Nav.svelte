<script lang="ts">
	const links = [
		{ href: '/#about', label: 'ABOUT' },
		{ href: '/#skills', label: 'SKILLS' },
		{ href: '/#tools', label: 'TOOLS' }
	];
</script>

<nav class="fixed top-0 z-50 w-full border-b border-bezel bg-panel-black/90 backdrop-blur-md">
	<div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
		<a
			href="/"
			class="font-mono text-sm font-semibold tracking-[0.15em] text-amber transition-colors hover:text-amber/80"
		>
			IFOST.DEV
		</a>
		<div class="flex items-center gap-1 font-mono text-xs tracking-wide text-ink-muted">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="group flex items-center gap-2 rounded px-3 py-2 transition-colors hover:text-ink"
				>
					<span class="h-1 w-1 rounded-full bg-bezel transition-colors group-hover:bg-amber"></span>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</nav>
