<script>
    import { Container } from "sveltestrap";
    import SvelteIcon from "../resources/SvelteIcon.svelte";
    import VercelIcon from "../resources/VercelIcon.svelte";

    let heart = "\u2665";
</script>

<svelte:head>
    <title>EBRAIC Descubre</title>
</svelte:head>

<Container>
    <div class="centered-content">
        <br />
        <br />
        <br />
        <h2>¿Qué es EBRAI<span class="lowered-text">⠯</span>?</h2>
        <br />
        <div class="text-focus">
            EBRAI<span class="lowered-text">⠯</span> es un innovador proyecto de
            Trabajo de Fin de Grado, una culminación académica en la etapa universitaria
            en la que se aplican conocimientos adquiridos para crear soluciones reales.
            Se enfoca en eliminar las barreras entre los libros electrónicos y las
            personas con deficiencias visuales. Permite convertir libros electrónicos
            en formato EPUB a PEF, facilitando la impresión de libros físicos en
            Braille y la lectura de estos libros electrónicos en pantallas de Braille
            actualizables, promoviendo así una experiencia de lectura inclusiva.
        </div>

        <br />
        <div>
            Hecho con <span class="bigText">{heart}</span> usando <SvelteIcon />
            y <VercelIcon />.
        </div>
    </div>
</Container>

<style>
    .text-focus {
        text-align: justify;
    }

    .centered-content {
        text-align: center;
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
