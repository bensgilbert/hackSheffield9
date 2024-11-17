<script>
	import { style } from '$lib/javascript/map';
	import { onMount } from 'svelte';

	let mapElement;
	let map;
	let searchInputElement; // Reference to the search input element
	let pinLatLng = { lat: 13.736717, lng: 100.523186 };
	let isCentering = false;

	onMount(async () => {
		loadGoogleMaps();

		try {
			const response = await fetch("http://localhost:3000/check-order");
			if (response.ok) {
				const data = await response.json();
				if (data.exists) {
					window.location.href = "/viewrequest"; // Redirect to viewrequest
				}
			} else {
				console.error("Failed to check order existence");
			}
		} catch (error) {
			console.error("Error checking order:", error);
		}
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

	function initMap() {
		const google = window.google;

		const mapOptions = {
			center: pinLatLng,
			zoom: 12,
			disableDefaultUI: true,
			gestureHandling: 'greedy',
			styles: style
		};

		map = new google.maps.Map(mapElement, mapOptions);

		// Initialize the Places Autocomplete search bar
		initSearchBar(google);

		// Update the search bar location when the map stops moving
		map.addListener('idle', () => {
			if (!isCentering) {
				const center = map.getCenter();
				pinLatLng = { lat: center.lat(), lng: center.lng() };
				updateSearchBarLocation(google);
			}
		});
	}

	function initSearchBar(google) {
		// Create a search input element
		const autocomplete = new google.maps.places.Autocomplete(searchInputElement, {
			types: ['geocode'], // Restrict results to geographical locations
			componentRestrictions: { country: 'uk' } // Example: restrict to UK
		});

		// Listen for a place selection
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (place.geometry && place.geometry.location) {
				isCentering = true; // Avoid triggering the idle event
				const location = place.geometry.location;
				map.setCenter(location);
				pinLatLng = { lat: location.lat(), lng: location.lng() };
				isCentering = false;
			} else {
				alert('No location details available for the selected place.');
			}
		});
	}

	// Update the search bar value based on the pin's location
	function updateSearchBarLocation(google) {
		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ location: pinLatLng }, (results, status) => {
			if (status === 'OK' && results[0]) {
				searchInputElement.value = results[0].formatted_address;
			} else {
				console.error('Error finding address: ', status);
			}
		});
	}

	// Form Data
	let time = '';
	let items = [{ name: '', quantity: 1 }];
	let message = ''; // Message for the order
	let address = '';

	// Add a new item field
	function addItem() {
		items = [...items, { name: '', quantity: 1 }];
	}

	// Remove an item
	function removeItem(index) {
		items = items.filter((_, i) => i !== index);
	}

	// Function to handle the form submission
	async function submitRequest() {
		// Ensure all required data is gathered
		const requestData = {
			message: message,
			lat: pinLatLng.lat,
			lng: pinLatLng.lng,
			address: searchInputElement.value, // Address is captured from the map
			collectionTime: formatTime(time), // Delivery time
			items: items // Items list
		};

		try {
			const response = await fetch('/create-request', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestData)
			});

			if (response.ok) {
				window.location.href = '/viewrequest';
				// Optionally, clear the form or redirect
			} else {
				console.error('Failed to submit request');
			}
		} catch (error) {
			console.error('Error submitting request: ', error);
		}
	}

	// Function to format time from HH:mm to HHmm
	function formatTime(time) {
		const [hours, minutes] = time.split(':'); // Split the time into hours and minutes
		return `${hours}${minutes}`; // Combine hours and minutes into a single string (HHmm)
	}
</script>

<div class="container relative mx-auto p-4">
	<!-- Search Bar -->
	<div class="absolute left-1/2 top-4 z-10 w-4/5 -translate-x-1/2 transform">
		<input
			bind:this={searchInputElement}
			type="text"
			placeholder="Search for a location"
			class="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	</div>

	<!-- Map Section -->
	<div class="relative">
		<div bind:this={mapElement} class="h-[400px] w-full rounded-md bg-gray-300"></div>
		<!-- Fixed Pin -->
		<div
			class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
			style="pointer-events: none"
		>
			<img src="/location-icon.png" alt="Map Pin" class="h-5 w-5" />
		</div>
	</div>

	<!-- Form Section -->
	<div class="mt-4">
		<form on:submit|preventDefault={submitRequest} class="space-y-4">
			<!-- Message Input -->
			<div>
				<label for="message" class="block text-sm font-medium text-gray-700">Message</label>
				<textarea
					id="message"
					bind:value={message}
					required
					class="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="Enter a message"
				></textarea>
			</div>

			<!-- Time Input -->
			<div>
				<label for="time" class="block text-sm font-medium text-gray-700">Delivery Time</label>
				<input
					type="time"
					id="time"
					bind:value={time}
					required
					class="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>

			<!-- Item List -->
			<div>
				<label for="items" class="block text-sm font-medium text-gray-700">Items</label>
				{#each items as { name, quantity }, i}
					<div class="mt-2 flex items-center space-x-2">
						<input
							type="text"
							placeholder="Item name"
							bind:value={items[i].name}
							required
							class="w-2/3 rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<input
							type="number"
							placeholder="Quantity"
							min="1"
							bind:value={items[i].quantity}
							required
							class="w-1/3 rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
						<button
							type="button"
							on:click={() => removeItem(i)}
							class="text-red-500 hover:text-red-700"
						>
							Remove
						</button>
					</div>
				{/each}
				<button type="button" on:click={addItem} class="mt-2 text-indigo-500 hover:text-indigo-700">
					Add Item
				</button>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				class="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
			>
				Submit Request
			</button>
		</form>
	</div>
</div>

<style>
	.navbar {
		background-color: #4f46e5;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
