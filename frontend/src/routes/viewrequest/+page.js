import { goto } from "$app/navigation";

export function load() {
    // Request database
    // fetch
    const hasRequest = true;
    if (!hasRequest) {
        goto("/makerequest")
    }
}