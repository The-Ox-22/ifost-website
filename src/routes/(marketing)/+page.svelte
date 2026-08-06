<script lang="ts">
	const skills: Record<string, string[]> = {
		Languages: ['Rust', 'C++', 'Python', 'CUDA'],
		'Backend & Infra': [
			'Kubernetes',
			'Docker',
			'Helm',
			'PostgreSQL',
			'ClickHouse',
			'gRPC',
			'ZeroMQ'
		],
		'Embedded & Systems': [
			'ESP32',
			'Embedded Rust',
			'Yocto Linux',
			'Raspberry Pi',
			'Real-Time Systems'
		],
		'AI & Vision': ['NVIDIA Jetson Orin', 'Roboflow', 'GigE Vision', 'Object Detection']
	};

	const experience = [
		{
			years: '2025–2026',
			title: 'Platform Engineer',
			company: 'Etherflow',
			location: 'Broken Arrow, OK'
		},
		{
			years: '2020–2025',
			title: 'Specialist Software Engineer',
			company: 'L3Harris Aeromet',
			location: 'Tulsa, OK'
		},
		{
			years: '2019',
			title: 'Avionics Engineer',
			company: 'Textron Aviation',
			location: 'Wichita, KS'
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
	class="grid-bg relative flex min-h-screen flex-col justify-center overflow-hidden bg-zinc-950"
>
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"
		></div>
	</div>

	<div class="relative mx-auto max-w-5xl px-6 pt-24 pb-20">
		<p class="mb-5 font-mono text-xs tracking-widest text-amber-400 uppercase">
			Platform &amp; Systems Engineer
		</p>
		<h1 class="mb-6 text-6xl leading-none font-bold tracking-tight text-white md:text-8xl">
			Ian Foster
		</h1>
		<p class="mb-10 max-w-lg text-lg leading-relaxed text-zinc-400">
			Building distributed systems, IoT platforms, and cloud infrastructure — from embedded silicon
			to Kubernetes.
		</p>
		<div class="flex gap-3">
			<a
				href="/#about"
				class="rounded bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
			>
				About
			</a>
			<a
				href="/#tools"
				class="rounded border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
			>
				Tools
			</a>
		</div>
	</div>
</section>

<!-- About -->
<section id="about" class="bg-zinc-900 py-24">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-10 font-mono text-xs tracking-widest text-amber-400 uppercase">About</h2>
		<div class="grid gap-16 md:grid-cols-2">
			<div class="space-y-4 leading-relaxed text-zinc-400">
				<p>
					Systems-oriented software engineer with experience across the full stack — from ESP32
					firmware and custom Linux images to backend services, Kubernetes infrastructure, and
					frontend applications.
				</p>
				<p class="text-sm text-zinc-500">BS Computer Engineering · University of Oklahoma · 2019</p>
			</div>

			<div class="space-y-6">
				{#each experience as role}
					<div class="flex items-start gap-4">
						<span class="w-20 shrink-0 pt-1 font-mono text-xs text-amber-400">{role.years}</span>
						<div>
							<p class="font-medium text-white">{role.title}</p>
							<p class="text-sm text-zinc-500">{role.company} · {role.location}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Skills -->
<section id="skills" class="bg-zinc-950 py-24">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-10 font-mono text-xs tracking-widest text-amber-400 uppercase">Skills</h2>
		<div class="space-y-5">
			{#each Object.entries(skills) as [category, items]}
				<div class="flex flex-wrap items-baseline gap-y-3">
					<span class="w-40 shrink-0 text-sm text-zinc-600">{category}</span>
					<div class="flex flex-wrap gap-2">
						{#each items as skill}
							<span
								class="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-sm text-zinc-300"
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
<section id="tools" class="bg-zinc-900 py-24">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-2 font-mono text-xs tracking-widest text-amber-400 uppercase">Tools</h2>
		<p class="mb-10 text-sm text-zinc-600">
			Utilities and experiments, backed by Rust services. More coming.
		</p>
		<div class="grid gap-4 md:grid-cols-3">
			<a
				href="/gas-tracker"
				class="flex flex-col gap-3 rounded-lg border border-zinc-800 p-6 transition-colors hover:border-amber-400/50"
			>
				<div
					class="flex h-8 w-8 items-center justify-center rounded bg-amber-400/10 font-mono text-sm text-amber-400"
				>
					⛽
				</div>
				<p class="text-sm font-medium text-zinc-100">Gas Tracker</p>
				<p class="text-xs text-zinc-600">
					Regional prices, forecast, and seasonal trends by zip code.
				</p>
			</a>
			{#each [1, 2] as _}
				<div
					class="flex flex-col gap-3 rounded-lg border border-dashed border-zinc-800 p-6 transition-colors hover:border-zinc-700"
				>
					<div class="h-8 w-8 rounded bg-zinc-800"></div>
					<p class="font-mono text-sm text-zinc-600">in development</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-zinc-900 bg-zinc-950 py-8">
	<div class="mx-auto flex max-w-5xl items-center justify-between px-6 text-sm text-zinc-700">
		<span class="font-mono">ifost.dev</span>
		<span>Tulsa, OK</span>
	</div>
</footer>
