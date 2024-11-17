<script>
	import '../app.css';
	import {onMount} from "svelte";
	let { children } = $props();
	let accountDetail = $state({})

	onMount(async () => {

		fetch('http://localhost:3000/account-details', {
			redirect: 'error'
		})
			.then((response) => response.json())
			.then((account) => {
				accountDetail = account;
			})
			.catch(() => {
				window.location = 'http://localhost:3000/login';
			});
	});
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
