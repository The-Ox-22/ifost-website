<script lang="ts">
	const skillChannels: { category: string; accent: string; items: string[] }[] = [
		{ category: 'Languages', accent: 'bg-amber', items: ['Rust', 'C++', 'Python', 'CUDA'] },
		{
			category: 'Backend & Infra',
			accent: 'bg-cyan',
			items: ['Kubernetes', 'Docker', 'Helm', 'PostgreSQL', 'ClickHouse', 'gRPC', 'ZeroMQ']
		},
		{
			category: 'Embedded & Systems',
			accent: 'bg-nominal',
			items: ['ESP32', 'Embedded Rust', 'Yocto Linux', 'Raspberry Pi', 'Real-Time Systems']
		},
		{
			category: 'AI & Vision',
			accent: 'bg-ink-muted',
			items: ['NVIDIA Jetson Orin', 'Roboflow', 'GigE Vision', 'Object Detection']
		}
	];

	const experience = [
		{
			years: '2025–2026',
			title: 'Platform Engineer',
			company: 'Etherflow',
			location: 'Broken Arrow, OK',
			current: true
		},
		{
			years: '2020–2025',
			title: 'Specialist Software Engineer',
			company: 'L3Harris Aeromet',
			location: 'Tulsa, OK',
			current: false
		},
		{
			years: '2019',
			title: 'Avionics Engineer',
			company: 'Textron Aviation',
			location: 'Wichita, KS',
			current: false
		}
	];
</script>

<svelte:head>
	<title>Ian Foster — Platform & Systems Engineer</title>
	<meta
		name="description"
		content="Systems engineer building distributed systems, IoT platforms, and cloud infrastructure."
	/>
</svelte:head>

<!-- Hero -->
<section
	class="grid-bg relative flex min-h-screen flex-col justify-center overflow-hidden bg-panel-black"
>
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-1/3 left-1/4 h-[420px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/10 blur-3xl"
		></div>
		<div
			class="absolute top-2/3 left-3/4 h-[360px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl"
		></div>
	</div>

	<div class="relative mx-auto max-w-5xl px-6 pt-24 pb-20">
		<p class="mb-5 font-mono text-xs tracking-widest text-amber uppercase">
			Platform &amp; Systems Engineer
		</p>
		<h1
			class="mb-6 font-display text-6xl leading-none font-bold tracking-tight text-ink md:text-8xl"
		>
			Ian Foster
		</h1>
		<p class="mb-10 max-w-lg text-lg leading-relaxed text-ink-muted">
			Building distributed systems, IoT platforms, and cloud infrastructure — from embedded silicon
			to Kubernetes.
		</p>

		<div class="flex gap-3">
			<a
				href="/#about"
				class="rounded bg-amber px-5 py-2.5 text-sm font-semibold text-panel-black transition-colors hover:bg-amber/85"
			>
				About
			</a>
			<a
				href="/#tools"
				class="rounded border border-bezel px-5 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:border-cyan/50 hover:text-cyan"
			>
				Tools
			</a>
		</div>
	</div>
</section>

<!-- About -->
<section id="about" class="bg-panel-surface py-24">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-10 font-mono text-xs tracking-widest text-amber uppercase">About</h2>
		<div class="grid gap-16 md:grid-cols-2">
			<div class="space-y-4 leading-relaxed text-ink-muted">
				<p>
					Systems-oriented software engineer with experience across the full stack — from ESP32
					firmware and custom Linux images to backend services, Kubernetes infrastructure, and
					frontend applications.
				</p>
				<p class="font-mono text-xs text-ink-muted/70">
					BS COMPUTER ENGINEERING · UNIVERSITY OF OKLAHOMA · 2019
				</p>
			</div>

			<div class="space-y-1">
				{#each experience as role (role.company)}
					<div class="flex items-start gap-4 border-b border-bezel py-4 first:pt-0 last:border-0">
						<span class="relative mt-1.5 flex h-2 w-2 shrink-0">
							{#if role.current}
								<span
									class="absolute inline-flex h-full w-full animate-ping rounded-full bg-nominal opacity-75"
								></span>
								<span class="relative inline-flex h-2 w-2 rounded-full bg-nominal"></span>
							{:else}
								<span class="relative inline-flex h-2 w-2 rounded-full bg-bezel"></span>
							{/if}
						</span>
						<span class="w-24 shrink-0 pt-0.5 font-mono text-xs text-ink-muted tabular-nums">
							{role.years}
						</span>
						<div>
							<p class="font-display font-medium text-ink">{role.title}</p>
							<p class="font-mono text-xs text-ink-muted">{role.company} · {role.location}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Skills -->
<section id="skills" class="bg-panel-black py-24">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-10 font-mono text-xs tracking-widest text-amber uppercase">Skills</h2>
		<div class="space-y-6">
			{#each skillChannels as channel (channel.category)}
				<div class="flex flex-wrap items-baseline gap-x-4 gap-y-3">
					<span class="flex w-44 shrink-0 items-center gap-2 font-mono text-xs text-ink-muted">
						<span class="h-1.5 w-1.5 rounded-full {channel.accent}"></span>
						// {channel.category.toUpperCase()}
					</span>
					<div class="flex flex-wrap gap-2">
						{#each channel.items as skill (skill)}
							<span
								class="rounded-sm border border-bezel bg-panel-surface px-2.5 py-1 font-mono text-sm text-ink-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
							>
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Tools -->
<section id="tools" class="bg-panel-surface py-24">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-2 font-mono text-xs tracking-widest text-amber uppercase">Tools</h2>
		<p class="mb-10 text-sm text-ink-muted">
			Utilities and experiments, backed by Rust services. More coming.
		</p>
		<div class="grid gap-4 md:grid-cols-3">
			<a
				href="/gas-tracker"
				class="group panel flex flex-col gap-3 p-6 transition-colors hover:border-amber/50"
			>
				<div class="flex items-center justify-between">
					<div
						class="flex h-8 w-8 items-center justify-center rounded bg-amber/10 text-sm text-amber"
					>
						⛽
					</div>
					<span
						class="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-nominal"
					>
						<span class="relative flex h-1.5 w-1.5">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-nominal opacity-75"
							></span>
							<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-nominal"></span>
						</span>
						LIVE
					</span>
				</div>
				<p class="font-display text-sm font-medium text-ink">Gas Tracker</p>
				<p class="text-xs text-ink-muted">
					Regional prices, forecast, and seasonal trends by zip code.
				</p>
			</a>
			{#each [1, 2] as slot (slot)}
				<div class="panel flex flex-col gap-3 border-dashed p-6 opacity-60">
					<div class="flex items-center justify-between">
						<div class="h-8 w-8 rounded bg-bezel"></div>
						<span class="font-mono text-[10px] tracking-widest text-ink-muted">STANDBY</span>
					</div>
					<p class="font-mono text-sm text-ink-muted">awaiting deployment</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-bezel bg-panel-black py-8">
	<div class="mx-auto flex max-w-5xl items-center justify-between px-6">
		<span class="font-mono text-sm text-ink-muted">ifost.dev</span>
		<span class="font-mono text-xs text-ink-muted/60">Tulsa, OK · BUILD v0.2.0</span>
	</div>
</footer>
