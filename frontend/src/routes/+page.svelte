<script>
	import { myStyle } from '$lib/javascript/map';
	import { onMount } from 'svelte';

	let mapElement;
	let map;
	let lastClickedContent = '';
	// let text = "";
	let marker;

	onMount(() => {
		loadGoogleMaps();

		document.getElementById('serviceForm');
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// Collect selected items
			const selectedItems = [];
			markerData.items.forEach((item, index) => {
				const checkbox = form.querySelector(`input[name="item${index}"]`);
				if (checkbox && checkbox.checked) {
					selectedItems.push({
						itemName: item[0],
						quantity: item[1]
					});
				}
			});

			// Log the selected items for now or handle as needed
			console.log('Selected Items:', selectedItems);

			// Perform further actions (e.g., send data to a server)
			alert('Thank you for offering to help!');
		});
	});

	// Loading google maps to the page
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

		// Key locations, will be the orders
		const markers = [
			{
				username: 'superuser123',
				message: 'Please I need stuff',
				items: [
					['bread', 2, false],
					['bananas', 1, false],
					['water', 4, false],
					['loo roll', 3, false]
				],
				locationName: 'The Diamond',
				lat: 53.38182330444414,
				lng: -1.4816028478377632,
				address: '32 Leavygreave Rd<br>Sheffield<br>S3 7RD'
			},
			{
				username: 'superuser123',
				message: 'Please I need stuff',
				items: [
					['bread', 2, false],
					['bananas', 1, false],
					['water', 4, false],
					['loo roll', 3, false]
				],
				locationName: 'Sir Frederick Mappin Building',
				lat: 53.38196206804772,
				lng: -1.4788498911897958,
				address: 'Mappin St<br>Sheffield<br>S1 3JD'
			}
		];

		const markerIcon = '/shopping-basket.png';

		const mapOptions = {
			center: { lat: 13.736717, lng: 100.523186 },
			zoom: 12,
			disableDefaultUI: true,
			gestureHandling: 'greedy',
			styles: myStyle
		};

		map = new google.maps.Map(mapElement, mapOptions);

		const bounds = new google.maps.LatLngBounds();

		// Adds custom marker and adds listener to click on them
		markers.forEach((markerData) => {
			const marker = new google.maps.Marker({
				position: { lat: markerData.lat, lng: markerData.lng },
				map: map,
				icon: {
					url: markerIcon,
					scaledSize: new google.maps.Size(40, 40)
				},
				title: markerData.title
			});

			google.maps.event.addListener(marker, 'click', () => {
				// Update the last clicked content with the marker's title and description
				lastClickedContent = `
					<h3>${markerData.locationName}</h3>
					<p>${markerData.address}</p>
					<p><strong>Message:</strong> ${markerData.message}</p>
					<form id="serviceForm">
						<h4>Items Requested:</h4>
						<ul>
						${markerData.items
							.map(
								(item, index) => `
							<li>
								<label>
								${item[0]} (${item[1]} requested)
								<input 
									type="number" 
									name="item${index}" 
									min="0" 
									step="1" 
									value="0" 
									data-max="${item[1]}"
									class="number-input"
								>
								</label>
							</li>`
							)
							.join('')}
						</ul>
						<button type="submit">Submit</button>
					</form>
				`;
			});

			bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
			map.fitBounds(bounds);
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

<div class="container mx-auto p-4">
	<div class="container mx-auto mb-2 rounded-md bg-blue-600 p-4 text-white">OrderDetails</div>

	<div class="container mx-auto mb-6 w-full rounded-md bg-gray-300 p-4">
		<div id="text" class="m-auto">
			<p>The Diamond</p>
			<p>32 Leavygreave Rd</p>
			<p>Sheffield</p>
			<p>S3 7RD</p>
		</div>
	</div>
</div>

<style>
	/* Custom styles (change) */
	.navbar {
		background-color: #4f46e5; /* Tailwind Indigo color */
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	
</style>