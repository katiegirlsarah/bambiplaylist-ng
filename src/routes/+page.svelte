<script>
	import PageTransition from '$lib/components/PageTransition.svelte';
	import PlaylistBlock from '$lib/components/PlaylistBlock.svelte';
</script>

<PageTransition>
	<h1>bambi play!</h1>

	<PlaylistBlock
		title="testing"
		desc="testing 123 lorem ipsum bambi playlist here is a short description"
	/>
	
	<footer>
		<button>
			create a playlist
		</button>
	</footer>
</PageTransition>

<style>
	footer {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 3vw;
	}
	
	button {
		width: 100%;
		height: 100%;
	}
</style>
