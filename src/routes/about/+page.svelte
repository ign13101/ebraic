<script>
    import { Container } from "sveltestrap";
    import { onMount } from "svelte";
    import SvelteIcon from "../SvelteIcon.svelte";
    import VercelIcon from "../VercelIcon.svelte";

    let loadingSymbols = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇"];
    let currentSymbolIndex = 0;

    function animateLoading() {
        currentSymbolIndex = (currentSymbolIndex + 1) % loadingSymbols.length;
    }

    onMount(() => {
        const interval = setInterval(animateLoading, 100); // Adjust the interval time as needed
        return () => clearInterval(interval);
    });

    let heart = "\u2665";
</script>

<svelte:head>
  <title>EBRAIC Descubre</title>
</svelte:head>

<Container>
    <!-- Contenido centrado -->
    <div class="centered-content">
        <!-- Contenido principal -->
        <!-- <div class="logo">EBRAI⠯</div> -->

        <!-- Animación de carga -->
        <!-- <div class="animacion-carga">
            {símbolosCarga[índiceSímboloActual]}
        </div> -->
        <br />
        <br />
        <br />
        <h2>¿Qué es EBRAI<span class="lowered-text">⠯</span>?</h2>
        <br />
        <!-- <div class="text-focus"> -->
        <div>
            EBRAI<span class="lowered-text">⠯</span> es un innovador proyecto de
            Trabajo de Fin de Grado, una culminación académica en la etapa universitaria
            en la que se aplican conocimientos adquiridos para crear soluciones reales.
            Se enfoca en eliminar las barreras entre los libros electrónicos y las
            personas con deficiencias visuales. Permite convertir libros electrónicos en formato EPUB a PEF,
            facilitando la impresión de libros físicos en Braille y la lectura de
            estos libros electrónicos en pantallas de Braille actualizables, promoviendo
            así una experiencia de lectura inclusiva.

        </div>
        <br />
        
        <br />
        <div>
            Hecho con <span class="bigText">{heart}</span> usando <SvelteIcon /> y <VercelIcon />.
        </div>
    </div>
</Container>

<style>
    .text-focus {
        text-align: justify;
    }

    /* * {
         outline: 1px solid red; 
    } */

    .centered-content {
        /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; */
        text-align: center;
        /* width: 100%;
      height: 50vh; */
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

    .bigText {
        font-size: larger;
    }

    /* Additional styles for responsive design */
    @media (max-width: 768px) {
        .centered-content {
            padding: 20px;
        }
    }
</style>
