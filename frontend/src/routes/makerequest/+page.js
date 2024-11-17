import { goto } from "$app/navigation";

export function load() {
    // Request database
    // fetch
    const hasRequest = false;
    if (hasRequest) {
        goto("/viewrequest")
    }
}