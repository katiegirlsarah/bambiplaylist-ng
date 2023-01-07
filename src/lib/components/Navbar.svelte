<script>
  import { browser } from '$app/environment'; 
  import { onMount } from 'svelte';

  let user = '';
  if(browser) {
    onMount(async () => {
      try {
        let cookies = document.cookie.split(';')
        let jwt = cookies[0].split('=')[1];

        let decoded_jwt = atob(jwt.split('.')[1])
        let parsed_jwt = JSON.parse(decoded_jwt)

        user = parsed_jwt.user;
      } catch (e) {
        console.warn('[warn] jwt failed to parse on clientside');
      }
    })
  }
</script>

<header>
  <a href="/">bambi playlist</a>

  <nav>
    <ul>
      <li>
        <a href="/creator">creator</a>
      </li>
      <li>
        <a href="/playlist">playlists</a>
      </li>
      <li>
        <a href="/post">post</a>
      </li>
      <li>
        {#if user == ''}
        <a href="/login">login</a>
        {:else}
        Welcome, {user}
        {/if}
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    padding: 1rem;
    background: #423;
    color: #eee;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: -8px;
    margin-bottom: 10px;
  }

  ul {
    margin: 0;
    list-style-type: none;
    display: flex;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
