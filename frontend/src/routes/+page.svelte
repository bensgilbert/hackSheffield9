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
			apiKey: "AIzaSyCP51atk-DnFmwSZOAicKCwumFOxeVoV3w",
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

		// Request user's location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const userLat = position.coords.latitude;
				const userLng = position.coords.longitude;

				// Center the map to the user's location
				map.setCenter({ lat: userLat, lng: userLng });
				map.setZoom(15); // Zoom in a bit to focus on the user's location

				// Add a marker for the user's location
				const userMarker = new google.maps.Marker({
					position: { lat: userLat, lng: userLng },
					map: map,
					title: 'You are here!'
				});
			}, (error) => {
				console.error('Error getting location: ', error);
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}
</script>

<div bind:this={mapElement} class="size-96" id="map"></div>
