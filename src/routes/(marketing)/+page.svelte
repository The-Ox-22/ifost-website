<script lang="ts">
	const skills: Record<string, string[]> = {
		Languages: ['Rust', 'C++', 'Python', 'CUDA'],
		'Backend & Infra': ['Kubernetes', 'Docker', 'Helm', 'PostgreSQL', 'ClickHouse', 'gRPC', 'ZeroMQ'],
		'Embedded & Systems': ['ESP32', 'Embedded Rust', 'Yocto Linux', 'Raspberry Pi', 'Real-Time Systems'],
		'AI & Vision': ['NVIDIA Jetson Orin', 'Roboflow', 'GigE Vision', 'Object Detection']
	};

	const experience = [
		{ years: '2025–2026', title: 'Platform Engineer', company: 'Etherflow', location: 'Broken Arrow, OK' },
		{ years: '2020–2025', title: 'Specialist Software Engineer', company: 'L3Harris Aeromet', location: 'Tulsa, OK' },
		{ years: '2019', title: 'Avionics Engineer', company: 'Textron Aviation', location: 'Wichita, KS' }
	];
</script>

<svelte:head>
	<title>Ian Foster — Platform & Systems Engineer</title>
	<meta name="description" content="Systems engineer building distributed systems, IoT platforms, and cloud infrastructure." />
</svelte:head>

<!-- Hero -->
<section class="relative min-h-screen flex flex-col justify-center bg-zinc-950 overflow-hidden grid-bg">
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"></div>
	</div>

	<div class="relative max-w-5xl mx-auto px-6 pt-24 pb-20">
		<p class="font-mono text-amber-400 text-xs tracking-widest uppercase mb-5">
			Platform &amp; Systems Engineer
		</p>
		<h1 class="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
			Ian Foster
		</h1>
		<p class="text-lg text-zinc-400 max-w-lg leading-relaxed mb-10">
			Building distributed systems, IoT platforms, and cloud infrastructure —
			from embedded silicon to Kubernetes.
		</p>
		<div class="flex gap-3">
			<a
				href="/#about"
				class="px-5 py-2.5 bg-amber-400 text-zinc-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors"
			>
				About
			</a>
			<a
				href="/#tools"
				class="px-5 py-2.5 border border-zinc-700 text-zinc-300 text-sm font-semibold rounded hover:border-zinc-500 hover:text-white transition-colors"
			>
				Tools
			</a>
		</div>
	</div>
</section>

<!-- About -->
<section id="about" class="bg-zinc-900 py-24">
	<div class="max-w-5xl mx-auto px-6">
		<h2 class="font-mono text-amber-400 text-xs tracking-widest uppercase mb-10">About</h2>
		<div class="grid md:grid-cols-2 gap-16">
			<div class="space-y-4 text-zinc-400 leading-relaxed">
				<p>
					Systems-oriented software engineer with experience across the full stack — from ESP32
					firmware and custom Linux images to backend services, Kubernetes infrastructure, and
					frontend applications.
				</p>
				<p class="text-zinc-500 text-sm">
					BS Computer Engineering · University of Oklahoma · 2019
				</p>
			</div>

			<div class="space-y-6">
				{#each experience as role}
					<div class="flex items-start gap-4">
						<span class="font-mono text-amber-400 text-xs pt-1 w-20 shrink-0">{role.years}</span>
						<div>
							<p class="text-white font-medium">{role.title}</p>
							<p class="text-zinc-500 text-sm">{role.company} · {role.location}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Skills -->
<section id="skills" class="bg-zinc-950 py-24">
	<div class="max-w-5xl mx-auto px-6">
		<h2 class="font-mono text-amber-400 text-xs tracking-widest uppercase mb-10">Skills</h2>
		<div class="space-y-5">
			{#each Object.entries(skills) as [category, items]}
				<div class="flex flex-wrap items-baseline gap-y-3">
					<span class="text-zinc-600 text-sm w-40 shrink-0">{category}</span>
					<div class="flex flex-wrap gap-2">
						{#each items as skill}
							<span class="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded font-mono">
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
	<div class="max-w-5xl mx-auto px-6">
		<h2 class="font-mono text-amber-400 text-xs tracking-widest uppercase mb-2">Tools</h2>
		<p class="text-zinc-600 text-sm mb-10">Utilities and experiments, backed by Rust services. More coming.</p>
		<div class="grid md:grid-cols-3 gap-4">
			{#each [1, 2, 3] as _}
				<div class="border border-dashed border-zinc-800 rounded-lg p-6 flex flex-col gap-3 hover:border-zinc-700 transition-colors">
					<div class="w-8 h-8 rounded bg-zinc-800"></div>
					<p class="text-zinc-600 text-sm font-mono">in development</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-zinc-950 border-t border-zinc-900 py-8">
	<div class="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-zinc-700">
		<span class="font-mono">ifost.dev</span>
		<span>Tulsa, OK</span>
	</div>
</footer>
