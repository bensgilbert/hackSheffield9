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
			apiKey: 'AIzaSyCP51atk-DnFmwSZOAicKCwumFOxeVoV3w',
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

		const mapOptions = {
			center: { lat: 13.736717, lng: 100.523186 },
			zoom: 12,
			disableDefaultUI: true,
			gestureHandling: 'greedy',
			mapId: 'your-map-id',
			styles: [
				{
					featureType: 'all',
					elementType: 'all',
					stylers: [
						{
							visibility: 'on'
						}
					]
				},
				{
					featureType: 'all',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off'
						},
						{
							saturation: '-100'
						}
					]
				},
				{
					featureType: 'all',
					elementType: 'labels.text.fill',
					stylers: [
						{
							saturation: 36
						},
						{
							color: '#000000'
						},
						{
							lightness: 40
						},
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'all',
					elementType: 'labels.text.stroke',
					stylers: [
						{
							visibility: 'off'
						},
						{
							color: '#000000'
						},
						{
							lightness: 16
						}
					]
				},
				{
					featureType: 'all',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#000000'
						},
						{
							lightness: 20
						}
					]
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#000000'
						},
						{
							lightness: 17
						},
						{
							weight: 1.2
						}
					]
				},
				{
					featureType: 'landscape',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000'
						},
						{
							lightness: 20
						}
					]
				},
				{
					featureType: 'landscape',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#4d6059'
						}
					]
				},
				{
					featureType: 'landscape',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#4d6059'
						}
					]
				},
				{
					featureType: 'landscape.natural',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#4d6059'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [
						{
							lightness: 21
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#4d6059'
						}
					]
				},
				{
					featureType: 'poi',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#4d6059'
						}
					]
				},
				{
					featureType: 'road',
					elementType: 'geometry',
					stylers: [
						{
							visibility: 'on'
						},
						{
							color: '#7f8d89'
						}
					]
				},
				{
					featureType: 'road',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#7f8d89'
						}
					]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#7f8d89'
						},
						{
							lightness: 17
						}
					]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#7f8d89'
						},
						{
							lightness: 29
						},
						{
							weight: 0.2
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000'
						},
						{
							lightness: 18
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#7f8d89'
						}
					]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#7f8d89'
						}
					]
				},
				{
					featureType: 'road.local',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000'
						},
						{
							lightness: 16
						}
					]
				},
				{
					featureType: 'road.local',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#7f8d89'
						}
					]
				},
				{
					featureType: 'road.local',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#7f8d89'
						}
					]
				},
				{
					featureType: 'transit',
					elementType: 'geometry',
					stylers: [
						{
							color: '#000000'
						},
						{
							lightness: 19
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'all',
					stylers: [
						{
							color: '#2b3638'
						},
						{
							visibility: 'on'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [
						{
							color: '#2b3638'
						},
						{
							lightness: 17
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'geometry.fill',
					stylers: [
						{
							color: '#24282b'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'geometry.stroke',
					stylers: [
						{
							color: '#24282b'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'labels',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'labels.text',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'labels.text.fill',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'labels.text.stroke',
					stylers: [
						{
							visibility: 'off'
						}
					]
				},
				{
					featureType: 'water',
					elementType: 'labels.icon',
					stylers: [
						{
							visibility: 'off'
						}
					]
				}
			]
		};

		map = new google.maps.Map(mapElement, mapOptions);

		const marker = new google.maps.Marker({
			position: { lat: markers[0]['lat'], lng: markers[0]['lng'] },
			map: map
		});

		// Request user's location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
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
				},
				(error) => {
					console.error('Error getting location: ', error);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}
</script>

<div class="container mx-auto p-4">
	<!-- Map Section -->
	<div bind:this={mapElement} class="mb-6 mt-4 h-[400px] w-full rounded-md bg-gray-300"></div>
</div>

<style>
	/* Custom styles (optional) */
	.navbar {
		background-color: #4f46e5; /* Tailwind Indigo color */
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
