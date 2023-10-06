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
        Bienvenido a EBRAI<span class="lowered-text">⠯</span>, una innovadora
        aplicación diseñada para convertir libros electrónicos en formato EPUB a
        Braille (Portable Embosser Format - PEF). Con EBRAI<span
          class="lowered-text">⠯</span
        >, hacemos que la literatura digital sea accesible para personas con
        discapacidades visuales, ofreciendo una experiencia de lectura en
        Braille eficiente y amigable.
      </p>
      <p>
        Nuestra aplicación se esfuerza por simplificar la conversión de libros
        electrónicos y garantizar la calidad y legibilidad del Braille generado.
        ¡Descubre la magia de la inclusión en la era digital con EBRAI<span
          class="lowered-text">⠯</span
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
