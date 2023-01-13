<script>
  export let title;
  export let desc;
</script>

<div class="container">
  <header>
    <h2>{title}</h2>
    <i class="fa-solid fa-heart"></i>
  </header>
  
  <p>{desc}</p>
</div>

<style>
  header {
    display: flex;
    flex-direction: row;
  }
  
  h2 {
    width: 100%;
  }
  
  .container {
    border: 3px purple solid;
    border-radius: 3px;
  }
  
  .container * {
    margin: 10px;
  }
</style>
