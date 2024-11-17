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

	let selectedOrder = $state();
	let myOrders = $state([]);
	let unfulfilledOrders = $state([]);
	let unfulfilledOrdersInRange = $state([]);

	$effect(() => {
		unfulfilledOrdersInRange = unfulfilledOrders.filter(
			(order) => order.distanceInKilometers < filter
		);
	});

	onMount(async () => {
		const pkg = await import('@googlemaps/js-api-loader');
		const { Loader } = pkg;

		const loader = new Loader({
			apiKey: 'AIzaSyDB8EtJ3vK8gwJgTgjeNyvDLkUOYnal1GM',
			libraries: ['maps', 'marker']
		});

		const { Map } = await loader.importLibrary('maps');
		const { Marker } = await loader.importLibrary('marker');
		const { spherical } = await loader.importLibrary('geometry');

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
				console.log([myOrders, unfulfilledOrders]);
				if (myOrders.length > 0 && myOrders[0].error) {
				} else {
					myOrders.forEach((order) => {
						new Marker({
							map,
							position: { lat: parseFloat(order.lat), lng: parseFloat(order.lng) },
							icon: {
								url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
							}
						});
					});
				}
				if (unfulfilledOrders.length > 0 && unfulfilledOrders[0].error) {
				} else {
					unfulfilledOrders.forEach((order) => {
						const marker = new Marker({
							map,
							position: { lat: parseFloat(order.lat), lng: parseFloat(order.lng) },
							icon: {
								url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
							}
						});
						marker.addListener('click', () => {
							console.log(order);

							selectedOrder = order;
							leftSidebar = true;
						});
						navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
							const currentPosition = new google.maps.LatLng(latitude, longitude);
							const orderPosition = new google.maps.LatLng(
								parseFloat(order.lat),
								parseFloat(order.lng)
							);

							// Use spherical.computeDistanceBetween to get distance in meters
							const distanceInMeters = spherical.computeDistanceBetween(
								currentPosition,
								orderPosition
							);
							const distanceInKilometers = distanceInMeters / 1000; // Convert to kilometers

							order.distanceInKilometers = distanceInKilometers;
						});
					});
				}
			})
			.catch((reason) => {
				console.error(reason);
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
				<div class="flex items-center justify-between">
					<h1 class="text-2xl font-bold">Order #{selectedOrder.id.toString().padStart(4, '0')}</h1>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						onclick={() => {
							leftSidebar = false;
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
							/></svg
						>
					</button>
				</div>
				<div class="space-y-2 rounded bg-black/20 p-3 leading-none">
					<div class="space-y-1">
						<p>Message: {selectedOrder.message}</p>
						<p>Pickup Time: {selectedOrder.time.slice(0, 2) + ':' + selectedOrder.time.slice(2)}</p>
					</div>
					<p>Items</p>
					<ul class="mt-2 list-inside list-disc space-y-1 pl-2 leading-none">
						{#each selectedOrder.items as item}
							<li>{item.quantity} - {item.name}</li>
						{/each}
					</ul>
				</div>
				{#if !selectedOrder.fulfilled}
					<button
						class="rounded bg-blue-700 p-4 text-white"
						onclick={() => {
							fetch('http://localhost:3000/fulfil-request', {
								redirect: 'error',
								method: 'post',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									order_id: selectedOrder.id
								})
							})
								.then(() => {
									alert('Accepted Order!');
								})
								.catch(() => {
									alert('Something fucked up');
								});
						}}>Accept Order</button
					>
				{/if}
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
				{#each myOrders as order}
					<div class="space-y-1 rounded bg-blue-700 p-3 leading-none text-white">
						<p>Order ID: {order.id}</p>
						<p>Time: {order.time.slice(0, 2) + ':' + order.time.slice(2)}</p>
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
					<input bind:value={filter} class="w-full" type="range" min="2" max="20" />
					<p>Range: {filter}km</p>
				</div>
				{#each unfulfilledOrdersInRange as order}
					<div class="space-y-1 rounded bg-black/20 p-3">
						<p>Order ID: {order.id}</p>
						<p>Time: {order.time.slice(0, 2) + ':' + order.time.slice(2)}</p>
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
