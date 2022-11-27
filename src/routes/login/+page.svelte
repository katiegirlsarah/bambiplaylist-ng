<script>
	import { Turnstile } from 'svelte-turnstile';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

{#if form?.error}
	<p>{form?.error}</p>
{/if}

<form method="POST" action="/login">
	<input type="text" name="user" placeholder="Enter username..." />
	<input type="password" name="pass" placeholder="Enter password..." />
	<Turnstile siteKey="0x4AAAAAAABYklLBnEWMcPxZ" theme="dark" />
	<input type="submit" value="Login" />
</form>
