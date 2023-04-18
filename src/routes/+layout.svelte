<script>
  import Header from "./Header.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
  />
</svelte:head>

<main>
  <Header />

  <slot class="slot" />

  <!-- <Footer/> -->
</main>
