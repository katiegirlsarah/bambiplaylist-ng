<script>
	import { Turnstile } from 'svelte-turnstile';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

{#if form?.error}
	<p>{form?.error}</p>
{/if}

<form method="POST" action="/post">
	<label for="title">title</label>
	<input type="text" name="title" required />
	<label for="post">post</label>
	<textarea name="post" required />
	<Turnstile siteKey="0x4AAAAAAABYklLBnEWMcPxZ" theme="dark" />
	<input type="submit" value="post" />
</form>
