<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { page } from '$app/stores';

	let id = $page.params.id;
	id = id.match(/([0-9]\,?){1,}/)[0];
</script>

<PageTransition>
	<h2>{id}</h2>

	<audio controls>
		<source src="http://localhost:3000/?p={id}" />
	</audio>
</PageTransition>
