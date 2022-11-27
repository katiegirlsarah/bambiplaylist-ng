<script>
	import { Turnstile } from 'svelte-turnstile';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

{#if form?.error}
	<p>{form?.error}</p>
{/if}

<form method="POST" action="/post">
	<input type="text" name="title" placeholder="Enter a bambilicious title!" />
	<textarea placeholer="What's on your mind?" />
	<Turnstile siteKey="0x4AAAAAAABYklLBnEWMcPxZ" theme="dark" />
	<input type="submit" value="post" />
</form>
