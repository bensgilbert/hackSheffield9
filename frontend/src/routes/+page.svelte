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

		const markers = [
			{
				locationName: 'The Diamond',
				lat: 53.38182330444414,
				lng: -1.4816028478377632,
				address: '32 Leavygreave Rd<br>Sheffield<br>S3 7RD'
			}
		];

		const markerIcon = '/shopping-basket.png'

		const mapOptions = {
			center: { lat: 13.736717, lng: 100.523186 },
			zoom: 12,
			disableDefaultUI: true,
			gestureHandling: 'greedy',
			mapId: 'your-map-id'
		}

		map = new google.maps.Map(mapElement, mapOptions);

		const infoWindow = new google.maps.InfoWindow({
			minWidth: 200,
			maxWidth: 200
		});

		const marker = new google.maps.Marker({
			position: { lat: markers[0]['lat'], lng: markers[0]['lng'] },
			map: map,
			icon: {
				url: markerIcon,
				scaledSize: new google.maps.Size(40, 40)
			}
		});
		
		function createInfoWindows() {
			// Create content for the InfoWindow as a string
			const infoWindowContent = `
				<div class="marker-content">
				<h3>${markers[0]['locationName']}</h3>
				<address>
					<p>${markers[0]['address']}</p>
				<address>
				</div>
			`;

			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(infoWindowContent);
				infoWindow.open(map, marker);
			});
		}

		createInfoWindows()

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
