<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-dvh flex-col">
	<header class="bg-blue-500 p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<div class="text-xl font-bold">Neighbourly</div>
			<a href="/account" class="text-sm text-white hover:text-gray-200">My Account</a>
		</div>
	</header>
	<main class="grow">
		{@render children()}
	</main>
	<header class="flex justify-center bg-blue-500 p-4 text-white">
		Ben | Jack | Jonathan | Nikhil
	</header>
</div>
