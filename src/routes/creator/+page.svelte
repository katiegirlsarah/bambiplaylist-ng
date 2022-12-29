<script>
  export let data;
  
  let files = JSON.parse(data.files);
</script>

{#each files as file}
  <p>{file}</p>
{/each}
