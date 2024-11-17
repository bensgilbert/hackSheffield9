<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="fixed inset-0 flex min-h-dvh flex-col">
	<header class="z-50 bg-blue-700 p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<a class="text-2xl font-bold" href="/">Neighbourly</a>
			<a href="/account">My Account ({accountDetail.nickname})</a>
		</div>
	</header>
	<main class="relative grow">
		{@render children()}
	</main>
	<footer class="z-50 bg-blue-700 p-4 text-white">
		<div class="container mx-auto flex justify-center">
			<p>Ben | Jack | Jonathan | Nikkhil</p>
		</div>
	</footer>
</div>
