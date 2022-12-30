<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import '$lib/styles/style.css';
</script>

<Navbar />

<main>
  <slot/>
</main>
