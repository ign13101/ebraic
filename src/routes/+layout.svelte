<script>
  import Header from "./Header.svelte";
  import { page } from "$app/stores";
  let pathname = $page.url.pathname;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
  />
</svelte:head>

<main>
  {#if pathname !== "/"}
    <Header />

    <slot class="slot" />
  {:else}
    <slot class="slot" />
  {/if}

  <!-- <Footer/> -->
</main>
