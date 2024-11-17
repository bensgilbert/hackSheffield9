<script>
	import {onMount} from "svelte";

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

<div class="container mx-auto p-4">
	<h1 class="text-5xl">Account</h1>
	<form action="" class="my-8 grid gap-8 md:grid-cols-2">
		<div class="flex space-x-2">
			<input contenteditable="false" class="grow rounded border p-2" type="text"
				   bind:value={accountDetail.email} />
<!--			<button class="rounded bg-blue-700 px-4 py-2 text-white">Edit</button>-->
		</div>
		<div class="flex space-x-2">
			<input class="grow rounded border p-2" type="date" />
			<button class="rounded bg-blue-700 px-4 py-2 text-white">Edit</button>
		</div>
		<div class="space-y-2">
			<div class="flex space-x-2">
				<input contenteditable="false" class="grow rounded border p-2" type="text"
					   bind:value={accountDetail.nickname} />
<!--				<button class="rounded bg-blue-700 px-4 py-2 text-white">Edit</button>-->
			</div>
			<div class="flex space-x-2">
<!--				<label for="email verified">Email Verified</label>-->
				<input contenteditable="false" name="email verified" class="grow rounded border p-2" type="text"
					  bind:value={accountDetail.verified} />
<!--				<button class="rounded bg-blue-700 px-4 py-2 text-white">Edit</button>-->
			</div>
<!--			<div class="flex space-x-2">-->
<!--				<input class="grow rounded border p-2" type="text" placeholder="City" />-->
<!--				<button class="rounded bg-blue-700 px-4 py-2 text-white">Edit</button>-->
<!--			</div>-->
<!--			<div class="flex space-x-2">-->
<!--				<input class="grow rounded border p-2" type="text" placeholder="Postcode" />-->
<!--				<button class="rounded bg-blue-700 px-4 py-2 text-white">Edit</button>-->
<!--			</div>-->
		</div>
	</form>
</div>


