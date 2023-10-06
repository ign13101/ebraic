<script>
  import { onMount } from "svelte";
  import { Container } from "sveltestrap";

  let loadingSymbols = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇"];
  let currentSymbolIndex = 0;

  function animateLoading() {
    currentSymbolIndex = (currentSymbolIndex + 1) % loadingSymbols.length;
  }

  onMount(() => {
    const interval = setInterval(animateLoading, 100);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>EBRAIC</title>
</svelte:head>

<Container>
  <div class="centered-content">
    <div class="logo">EBRAI⠯</div>
    <div class="loading-animation">
      {loadingSymbols[currentSymbolIndex]}
    </div>
    <div>
      <p>
        Welcome to EBRAI<span class="lowered-text">⠯</span>, an innovative
        application designed to convert EPUB format e-books to Braille (Portable
        Embosser Format - PEF). With EBRAI<span class="lowered-text">⠯</span>,
        we make digital literature accessible for individuals with visual
        impairments, providing an efficient and user-friendly Braille reading
        experience.
      </p>
      <p>
        Our application strives to simplify the conversion of e-books and ensure
        the quality and readability of the generated Braille. Discover the magic
        of inclusion in the digital age with EBRAI<span class="lowered-text"
          >⠯</span
        >!
      </p>
    </div>
  </div>
</Container>

<style>
  .centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 40px 0;
  }

  .loading-animation {
    font-size: 24px;
    padding-top: 20px;
  }

  .lowered-text {
    display: inline-block;
    transform: translateY(0.05em);
  }

  /* Additional styles for responsive design */
  @media (max-width: 768px) {
    .centered-content {
      padding: 20px;
    }
  }
</style>
