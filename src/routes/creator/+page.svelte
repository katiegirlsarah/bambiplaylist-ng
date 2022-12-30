<script>
  import PageTransition from '$lib/components/PageTransition.svelte';
  export let data;
  
  let files = JSON.parse(data.files);
</script>

<PageTransition>
{#each files as file}
  <p>{file}</p>
{/each}
</PageTransition>
