<script>
	import { myStyle } from '$lib/javascript/map';
	import { onMount } from 'svelte';

	let mapElement;
	let map;
	let lastClickedContent = '';
	// let text = "";
	let marker;
	let showSidebar = false;

	// Temporary data
	const myOrders = [
		{
			username: 'test123',
			startTime: 1500,
			endTime: 1530,
			lat: 53.38182330444414,
			lng: -1.4816028478377632,
			items: [
				['bread', 2, false],
				['bananas', 1, false],
				['water', 4, false],
				['loo roll', 3, false]
			]
		}
	];

	const suggestedOrders = [
		{
			username: 'test456',
			startTime: 1400,
			endTime: 1430,
			lat: 53.38282330444414,
			lng: -1.4826028478377632,
			items: [
				['apples', 3, false],
				['orange juice', 2, false]
			]
		},
		{
			username: 'test789',
			startTime: 1600,
			endTime: 1630,
			lat: 53.38482330444414,
			lng: -1.4836028478377632,
			items: [
				['milk', 5, false],
				['cheese', 2, false]
			]
		}
	];

	let radius = 5; // Default radius in kilometers
	let timeSliderValue = 60; // Default time remaining slider value

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
				// Reset lastClickedContent if it is already the same as the clicked markerData
				if (lastClickedContent === markerData) {
					lastClickedContent = ''; // Reset if it's the same marker
				} else {
					// Otherwise, update lastClickedContent with the new marker data
					lastClickedContent = markerData;
				}
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

	function acceptRequest() {
		console.log('HEHEHEH');
	}

	// Toggle Sidebar visibility
	function toggleSidebar() {
		showSidebar = !showSidebar;
	}

	// Function to filter suggested orders based on slider value
	function filterSuggestedOrders() {
		// Filter logic based on radius and timeSliderValue
		// For now, we'll just return all suggested orders as a placeholder
		return suggestedOrders.filter((order) => {
			return Math.abs(order.endTime - order.startTime) <= timeSliderValue;
		});
	}
</script>

<div class="flex h-screen">
	<!-- Sidebar Section -->
	{#if lastClickedContent}
		<div class="z-20 w-1/4 min-w-[300px] bg-gray-100 p-4 shadow-lg">
			<div class="mb-2 rounded-md bg-blue-600 p-4 text-white">Order Details</div>
			<div class="mb-6 rounded-md bg-gray-300 p-4">
				<div>
					<h3>{lastClickedContent.locationName}</h3>
					<p>{@html lastClickedContent.address}</p>
					<p><strong>Message:</strong> {lastClickedContent.message}</p>
					<form id="serviceForm" on:submit|preventDefault={acceptRequest}>
						<h4>Items Requested:</h4>
						<ul>
							{#each lastClickedContent.items as item, index}
								<li>
									{item[0]} ({item[1]} requested)
								</li>
							{/each}
						</ul>
						<button
							class="mt-2 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-700"
							type="submit"
						>
							Accept
						</button>
					</form>
				</div>
			</div>
		</div>
	{/if}

	<!-- Sidebar Section -->
	{#if showSidebar}
		<div class="sidebar open">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-xl font-bold text-gray-800">My Orders</h3>
				<button on:click={toggleSidebar} class="text-gray-500">X</button>
			</div>
			<div class="mb-6">
				{#each myOrders as order}
					<div class="mb-4 rounded-md bg-gray-300 p-3">
						<h4>{order.username}</h4>
						<p>Start Time: {order.startTime}</p>
						<p>End Time: {order.endTime}</p>
					</div>
				{/each}
			</div>

			<div class="mb-4">
				<h3 class="text-xl font-bold text-gray-800">Suggested Orders</h3>
				<input type="range" min="10" max="120" bind:value={timeSliderValue} class="mb-4 w-full" />
				<p>Radius: {radius} km</p>

				{#each filterSuggestedOrders() as order}
					<div class="mb-4 rounded-md bg-gray-300 p-3">
						<h4>{order.username}</h4>
						<p>Start Time: {order.startTime}</p>
						<p>End Time: {order.endTime}</p>
						{#each order.items as item, index}
							<li>
								{item[0]} ({item[1]} requested)
							</li>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Map Section -->
	<div class="map-container flex-grow">
		<div bind:this={mapElement} class="h-full w-full bg-gray-300"></div>
	</div>

	<!-- Button to toggle the sidebar -->
	<button
		class="absolute right-4 top-4 z-20 rounded-md bg-blue-500 p-2 text-white"
		on:click={toggleSidebar}
	>
		{showSidebar ? 'Close Sidebar' : 'Open Sidebar'}
	</button>
</div>

<style>
	.map-container {
		position: fixed;
		top: 64px; /* Height of the fixed header */
		bottom: 64px; /* Height of the fixed footer */
		width: 100vw;
		background-color: #f3f3f3; /* Optional background color */
	}

	.sidebar {
		position: fixed; /* Ensure the sidebar stays fixed in place */
		right: 0; /* Position the sidebar on the right */
		top: 0; /* Align the sidebar to the top */
		width: 25%; /* Set the sidebar width */
		height: 100%; /* Full height */
		background-color: #f0f0f0; /* Background color */
		box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* Shadow for the sidebar */
		padding: 20px; /* Add padding */
		overflow-y: auto; /* Enable vertical scrolling */
		transition: transform 0.3s ease-in-out; /* Smooth transition when showing or hiding */
		transform: translateX(100%); /* Hide sidebar off-screen initially */
		z-index: 20;
	}

	.sidebar.open {
		transform: translateX(0); /* Show sidebar when 'open' class is added */
	}
</style>
