<script>
	import { onMount } from 'svelte';

	let mapElement;
	let map;

	onMount(() => {
		loadGoogleMaps();
	});

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

	function initMap() {
		const google = window.google;
		map = new google.maps.Map(mapElement, {
			center: { lat: 13.736717, lng: 100.523186 },
			zoom: 12,
			disableDefaultUI: true,
			gestureHandling: 'greedy',
			mapId: 'your-map-id' // Replace or remove this
		});

		const marker = new google.maps.Marker({
			position: { lat: 13.7434332, lng: 100.5534927 },
			map: map,
			title: 'Hello World!'
		});

		marker.addListener('click', function () {
			alert('Marker was clicked!');
		});
	}
</script>

<div class="container mx-auto p-4">
	<!-- Map Section -->
	<div bind:this={mapElement} class="mb-6 mt-4 h-[400px] w-full rounded-md bg-gray-300">
	</div>
</div>

<style>
	/* Custom styles (optional) */
	.navbar {
		background-color: #4f46e5; /* Tailwind Indigo color */
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
