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
			apiKey: "cheeky-bastard",
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
			zoom: 8,
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

<div bind:this={mapElement} class="size-96" id="map"></div>
