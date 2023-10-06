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
        <h2>What is EBRAI<span class="lowered-text">⠯</span>?</h2>
        <br />
        <div class="text-focus">
            EBRAI<span class="lowered-text">⠯</span> is an innovative Final
            Degree Project, an academic culmination in the university stage
            where acquired knowledge is applied to create real solutions. It
            focuses on eliminating barriers between electronic books and people
            with visual impairments. It allows for the conversion of EPUB format
            electronic books to PEF, facilitating the printing of physical
            Braille books and the reading of these electronic books on
            refreshable Braille displays, thus promoting an inclusive reading
            experience.
            <br />
            <br />
            Additionally, besides the conversion page, it also has a Braille text
            extraction page from PEF files, to verify the correct functioning of
            the converter. There is also a translation page where you can input rows
            from the viewer page to check the accuracy of the translation.
            <br />
            <br />
            The page follows a typical structure of a Svelte project with Sveltekit
            and is deployed on Vercel. The absence of a backend helps reduce the
            complexity and significantly increase the application's performance.
            This means that the conversion code runs in the browser, but it has been
            optimized to work with large and complex files.
            <br />
            <br />
            Spanish version:
            <a href="https://ebraic.vercel.app/">https://ebraic.vercel.app/</a>
            <br />
            <br />
            You can find more information here:
            <a target="_blank" href="https://github.com/ign13101/ebraic"
                >https://github.com/ign13101/ebraic</a
            >
        </div>

        <br />
        <div>
            Made with <span class="bigText">{heart}</span> using <SvelteIcon />
            and <VercelIcon />.
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
