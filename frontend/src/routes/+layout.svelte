<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	<header class="fixed top-0 left-0 w-full bg-blue-500 p-4 text-white z-10">
		<div class="container mx-auto flex items-center justify-between">
			<a href="/" class="text-xl font-bold">Neighbourly</a>
			<a href="/account" class="text-sm text-white hover:text-gray-200">My Account</a>
		</div>
	</header>
	<main class="flex-grow pt-[64px] pb-[64px]">
		<!-- Add padding to account for fixed header and footer -->
		{@render children()}
	</main>
	<footer class="fixed bottom-0 left-0 w-full bg-blue-500 p-4 text-white z-10">
		<div class="container mx-auto flex justify-center">
			Ben | Jack | Jonathan | Nikhil
		</div>
	</footer>
</div>
