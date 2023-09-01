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
</script>

<Container>
    <!-- Centered Content -->
    <div class="centered-content">
        <!-- Main Content -->
        <div class="logo">EBRAI⠯</div>

        <!-- Loading Animation -->
        <div class="loading-animation">
            {loadingSymbols[currentSymbolIndex]}
        </div>
        <h2>What is EBRAIC?</h2>
        <div class="text-focus">
            EBRAIC is a web application developed to bridge the gap between
            ebooks and visually impaired people. Allowing you to convert from
            EPUB to PEF so that you can embosse physical books as well as read
            these electronic books on refreshable Braille displays.
        </div>
        <div>
            Made with love using <SvelteIcon /> and <VercelIcon />.
        </div>
        <div>
            <h2>How does it work?</h2>
            Ebraic is a multipurpose tool that handles epub files, extracts the metadata
            and content of those epub files, then converts the readable text into
            braille, and offers you a variety of ways to use your pef ebook
        </div>
    </div>
</Container>

<style>
    .text-focus {
        text-align: justify;
    }

    * {
        /* outline: 1px solid red; */
    }

    .centered-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

    /* Additional styles for responsive design */
    @media (max-width: 768px) {
        .centered-content {
            padding: 20px;
        }
    }
</style>
