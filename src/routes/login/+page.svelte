<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { Turnstile } from 'svelte-turnstile';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<PageTransition>
	{#if form?.error}
		<p>{form?.error}</p>
	{/if}

	<form method="POST" action="?/login">
		<label for="user">username</label>
		<input type="text" name="user" required />
		<label for="pass">password</label>
		<input type="password" name="pass" required />
		<Turnstile siteKey="0x4AAAAAAABYklLBnEWMcPxZ" theme="dark" />
		<button>Login</button>
		<button formaction="?/register">Register</button>
	</form>
</PageTransition>
