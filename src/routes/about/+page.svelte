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
        <h2>¿Qué es EBRAI<span class="lowered-text">⠯</span>?</h2>
        <br />
        <div class="text-focus">
            EBRAI<span class="lowered-text">⠯</span> es un innovador proyecto de
            Trabajo de Fin de Grado, una culminación académica en la etapa
            universitaria en la que se aplican conocimientos adquiridos para
            crear soluciones reales. Se enfoca en eliminar las barreras entre
            los libros electrónicos y las personas con deficiencias visuales.
            Permite convertir libros electrónicos en formato EPUB a PEF,
            facilitando la impresión de libros físicos en Braille y la lectura
            de estos libros electrónicos en pantallas de Braille actualizables,
            promoviendo así una experiencia de lectura inclusiva.
            <br />
            <br />
            Además de la página de conversión, también dispone de una página de extracción
            del texto en Braille de los archivos PEF, para poder comprobar el correcto
            funcionamiento del conversor, y una página de traductor, donde puedes
            introducir las filas de la página de visor para comprobar que la traducción
            es correcta.
            <br />
            <br />
            La página utiliza una estructura típica de un proyecto Svelte con Sveltekit
            y está desplegado en Vercel, la ausencia de un backend permite reducir
            la complejidad y aumentar el rendimiento de la aplicación significativamente,
            esto supone que el código para la conversión se ejecuta en el navegador,
            pero este ha sido optimizado para funcionar con archivos de gran tamaño
            y complejidad.
            <br />
            <br />
            Puedes encontrar más información en:
            <a target="_blank" href="https://github.com/ign13101/ebraic"
                >https://github.com/ign13101/ebraic</a
            >
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
