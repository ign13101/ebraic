<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";

    let pefContent = `<?xml version="1.0" encoding="UTF-8"?>
    <!-- Your PEF XML content here -->
    `;

    let rows = [];

    onMount(() => {
        parsePefContent();
    });

    function parsePefContent() {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(pefContent, "text/xml");
        const rowElements = xmlDoc.querySelectorAll("row");
        rows = Array.from(rowElements, row => row.textContent);
    }
</script>

<Container>
    <h1 class="pb-2">PEF XML Content Viewer</h1>
    <textarea bind:value={pefContent} rows="10" cols="40"></textarea>
    <button on:click={parsePefContent}>Parse PEF Content</button>
    <div class="rows-container">
        <h2>Rows</h2>
        {#each rows as row, index}
            <div class="row" key={index}>{row}</div>
        {/each}
    </div>
</Container>

<style>
   

    textarea {
        width: 100%;
        margin-bottom: 10px;
    }

    button {
        display: block;
        width: 100%;
        padding: 5px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    .rows-container {
        margin-top: 20px;
    }

    .row {
        border: 1px solid #ddd;
        padding: 5px;
        margin: 5px 0;
    }
</style>
