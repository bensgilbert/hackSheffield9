<script>
	import { goto } from '$app/navigation';
	import { style } from '$lib/javascript/map';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let container;
	let map;
	let filter = $state(10);
	let leftSidebar = $state(false);
	let rightSidebar = $state(false);

	let myOrders = $state([]);
	let unfulfilledOrders = $state([]);

	onMount(async () => {
		const pkg = await import('@googlemaps/js-api-loader');
		const { Loader } = pkg;
		const loader = new Loader({
			apiKey: 'AIzaSyDB8EtJ3vK8gwJgTgjeNyvDLkUOYnal1GM',
			libraries: ['maps', 'marker']
		});
		const { Map } = await loader.importLibrary('maps');
		const { Marker } = await loader.importLibrary('marker');
		map = new Map(container, {
			center: {
				lat: 0,
				lng: 0
			},
			disableDefaultUI: true,
			styles: style,
			zoom: 1
		});
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
				map.setCenter({ lat: latitude, lng: longitude });
				map.setZoom(16);
				new Marker({
					map,
					position: { lat: latitude, lng: longitude }
				});
			});
		}

		fetch('http://localhost:3000/requests', {
			redirect: 'error'
		})
			.then((response) => response.json())
			.then((orders) => {
				[myOrders, unfulfilledOrders] = orders;
				if (myOrders.length > 0 && myOrders[0].error) {
				} else {
					myOrders.forEach((order) => {
						console.log('myOrders', order);
						new Marker({
							map,
							position: { lat: parseFloat(order.latitude), lng: parseFloat(order.longitude) },
							icon: {
								url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
							}
						});
					});
				}
				if (unfulfilledOrders.length > 0 && unfulfilledOrders[0].error) {
				} else {
					unfulfilledOrders.forEach((order) => {
						console.log('Unfulfilled', order);
						new Marker({
							map,
							position: { lat: parseFloat(order.latitude), lng: parseFloat(order.longitude) },
							icon: {
								url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
							}
						});
					});
				}
			})
			.catch(() => {
				window.location = 'http://localhost:3000/login';
			});
	});
</script>

<div bind:this={container} class="size-full"></div>

<div class="absolute inset-y-0 left-0">
	{#if leftSidebar}
		<div
			transition:slide={{ axis: 'x' }}
			class="h-full w-80 space-y-8 text-nowrap bg-white p-4 shadow"
		>
			<div class="space-y-2 leading-none">
				<h1 class="text-xl font-bold">Order #1234</h1>
				<div class="space-y-2 rounded bg-black/20 p-3 leading-none">
					<div class="space-y-1">
						<p>Start:</p>
						<p>End:</p>
					</div>
					<ul class="mt-2 list-inside list-disc space-y-1 pl-2 leading-none">
						{#each [1, 2, 3] as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
				<button class="rounded bg-blue-700 p-4 text-white">Accept Order</button>
			</div>
		</div>
	{/if}
</div>

<div class="absolute inset-y-0 right-0">
	{#if rightSidebar}
		<div
			transition:slide={{ axis: 'x' }}
			class="h-full w-80 space-y-8 overflow-y-auto text-nowrap bg-white p-4 shadow"
		>
			<div class="space-y-2 leading-none">
				<h1 class="text-xl font-bold">My Orders</h1>
				{#each [1, 2, 3] as order}
					<div class="space-y-1 rounded bg-blue-700 p-3 leading-none text-white">
						<p>Orderer:</p>
						<p>Start:</p>
						<p>End:</p>
					</div>
				{:else}
					<p class="text-center font-bold m-3">
						You have no orders to fufil,
						<br />
						accept one from below
					</p>
				{/each}
			</div>
			<div class="space-y-3 leading-none">
				<h1 class="text-xl font-bold">Suggested Orders</h1>
				<div>
					<input bind:value={filter} class="w-full" type="range" min="1" max="50" />
					<p>Range: {filter}km</p>
				</div>
				{#each [1, 2, 3] as order}
					<div class="space-y-1 rounded bg-black/20 p-3">
						<p>Orderer:</p>
						<p>Start:</p>
						<p>End:</p>
					</div>
				{:else}
					<p class="text-center font-bold">No orders nearby</p>
				{/each}
			</div>
		</div>
	{/if}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="absolute left-0 top-4 -translate-x-full rounded-l bg-blue-700 p-2 text-white"
		onclick={() => {
			rightSidebar = !rightSidebar;
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
			/></svg
		>
	</button>
</div>
