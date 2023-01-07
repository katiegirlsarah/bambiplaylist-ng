/// <reference types="@sveltejs/adapter-cloudflare-workers" />

declare namespace App {
	interface Platform {
		env?: {
			BP_DB: KVNamespace;
		};
	}
}
