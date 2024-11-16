<script>
	import { myStyle } from '$lib/javascript/map';
	import { onMount } from 'svelte';

	let mapElement;
	let map;
	let order = {
		username: 'superuser123',
		startTime: '2024-11-16 08:00',
		endTime: '2024-11-16 12:00',
		items: [
			['bread', 2],
			['bananas', 1],
			['water', 4],
			['loo roll', 3]
		],
		lat: 53.38182330444414,
		lng: -1.4816028478377632,
		fulfilled: 'user123' // or null if not fulfilled
	};

	onMount(() => {
		loadGoogleMaps();
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
			styles: myStyle
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

<div class="container mx-auto p-4 relative">
	<!-- Map Section -->
	<div class="relative"><div bind:this={mapElement} class="h-[400px] w-full rounded-md bg-gray-300"></div></div>

	<!-- Order Details Section -->
	<div class="mt-4">
		<h3><b>Your Order</b></h3>
		<p><strong>Order by:</strong> {order.username}</p>
		<p><strong>Start Time:</strong> {order.startTime}</p>
		<p><strong>End Time:</strong> {order.endTime}</p>
		<p><strong>Location:</strong> {order.lat}, {order.lng}</p>
		<p><strong>Fulfilled by:</strong> {order.fulfilled || 'Not fulfilled yet'}</p>

		<h4 class="mt-4"><b>Items:</b></h4>
		<ul>
			{#each order.items as [item, quantity]}
				<li>{item} - Quantity: {quantity}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.navbar {
		background-color: #4f46e5;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>

