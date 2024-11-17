<script>
	import { style } from '$lib/javascript/map';
	import { onMount } from 'svelte';

	let mapElement;
	let map;
	let order = {
		username: 'superuser123',
		collectionTime: '0800',
		items: [
			['bread', 2],
			['bananas', 1],
			['water', 4],
			['loo roll', 3]
		],
		lat: 53.38182330444414,
		lng: -1.4816028478377632,
		message: 'hello',
		address: 'blah blah blah',
		fulfilled: 'user123' // or null if not fulfilled
	};

	onMount(async () => {
		loadGoogleMaps();

		try {
			const response = await fetch('http://localhost:3000/check-order');
			if (response.ok) {
				const data = await response.json();
				if (!data.exists) {
					window.location.href = '/makerequest'; // Redirect to makerequest
				}
			} else {
				console.error('Failed to check order existence');
			}
		} catch (error) {
			console.error('Error checking order:', error);
		}

		fetch('http://localhost:3000/deliver-personal-order', {
			redirect: 'error'
		})
			.then((response) => {
				if (!response.ok) {
					console.error('Error: ', response.status);
					throw new Error('Failed to fetch orders');
				}
				return response.json(); // Parse response as JSON
			})
			.then((orders) => {
				console.log('Orders:', orders); // Add logging here to inspect the response

				if (orders.length > 0 && orders[0].error) {
					console.error(orders[0].error);
				} else {
					order = orders[0]; // Set the order if it exists
					console.log('First order set:', order);
				}
			})
			.catch((error) => {
				console.error('Request failed: ', error);
				window.location = 'http://localhost:3000/login'; // Redirect to login if fetch fails
			});
	});

	// Loading Google Maps and Places Autocomplete API
	async function loadGoogleMaps() {
		const pkg = await import('@googlemaps/js-api-loader');
		const { Loader } = pkg;

		const loader = new Loader({
			apiKey: 'AIzaSyDB8EtJ3vK8gwJgTgjeNyvDLkUOYnal1GM',
			version: 'weekly',
			libraries: ['places', 'maps']
		});

		try {
			await loader.load();
			initMap();
		} catch (e) {
			console.error('Error loading Google Maps', e);
		}
	}

	// Initialize the map centered on the order's location
	function initMap() {
		const google = window.google;

		const mapOptions = {
			center: { lat: order.lat, lng: order.lng },
			zoom: 18,
			disableDefaultUI: true,
			gestureHandling: 'none', // Disable map interaction (drag, scroll zoom, etc.)
			zoomControl: false,
			draggable: false,
			scrollwheel: false,
			styles: style
		};

		map = new google.maps.Map(mapElement, mapOptions);

		// Add a marker for the order location
		new google.maps.Marker({
			position: { lat: order.lat, lng: order.lng },
			map: map,
			title: 'Order Location'
		});
	}
</script>

<div class="container relative mx-auto p-4">
	<!-- Map Section -->
	<div class="relative">
		<div bind:this={mapElement} class="h-[400px] w-full rounded-md bg-gray-300"></div>
	</div>

	<!-- Order Details Section -->
	<div class="mt-4">
		<h3><b>Your Order</b></h3>
		<p><strong>Collection Time:</strong> {order.collectionTime}</p>
		<p><strong>Address:</strong> {order.address}</p>
		<p><strong>Message:</strong> {order.message}</p>
		<p><strong>Fulfilled by:</strong> {order.fulfilled || 'Not fulfilled yet'}</p>

		<h4 class="mt-4"><b>Items:</b></h4>
		<ul>
			{#each order.items as item}
				<li>{item.name} - Quantity: {item.quantity}</li>
			{/each}
		</ul>

		<!-- Cancel Button -->
		<div class="mt-6">
			<button
				on:click={async () => {
					try {
						// Make a GET request to /completed-request
						const response = await fetch('http://localhost:3000/completed-request', {
							method: 'GET',
							credentials: 'include' // Include cookies for session-based authentication
						});

						if (response.ok) {
							console.log('Request completed successfully.');
							// Redirect to /makerequest after successful completion
							window.location.href = '/makerequest';
						} else {
							console.error('Failed to complete request:', response.statusText);
							alert('Failed to complete the request. Please try again.');
						}
					} catch (error) {
						console.error('Error making request to /completed-request:', error);
						alert('An error occurred. Please try again.');
					}
				}}
				class="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
			>
				Cancel
			</button>
		</div>
	</div>
</div>

<style>
	.navbar {
		background-color: #4f46e5;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
