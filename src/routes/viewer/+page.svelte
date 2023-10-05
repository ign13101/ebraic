<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";

    let pefContent = `<?xml version="1.0" encoding="UTF-8"?>
    <!-- Pega aquí el contenido de tu archivo PEF -->
    `;

    let rows = [];

    onMount(() => {
        parsePefContent();
    });

    function parsePefContent() {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(pefContent, "text/xml");
        const rowElements = xmlDoc.querySelectorAll("row");
        rows = Array.from(rowElements, (row) => row.textContent);
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            pefContent = e.target.result;
            parsePefContent();
        };

        reader.readAsText(file);
    }

    function copyToClipboard() {
        const rowsText = rows.join("\n");
        navigator.clipboard
            .writeText(rowsText)
            .then(() => {
                alert("Filas copiadas al portapapeles");
            })
            .catch((err) => {
                console.error(
                    "No se pudieron copiar las filas al portapapeles: ",
                    err
                );
            });
    }
</script>

<svelte:head>
  <title>EBRAIC Visor</title>
</svelte:head>

<Container>
    <h1 class="pb-2">Visor de Unicode Braille en archivos PEF</h1>
    <div class="toggleContainer">
        <label for="fileToggle">Cargar desde archivo:</label>
        <input type="file" id="fileToggle" on:change={handleFileUpload} />
    </div>
    <div>Cargar desde texto:</div>
    <textarea bind:value={pefContent} rows="10" cols="40" />
    <div class="buttonContainer">
        <button class="actionButton" on:click={parsePefContent}
            >Extraer filas</button
        >
        <button class="actionButton" on:click={copyToClipboard}
            >Copiar filas al portapapeles</button
        >
    </div>

    <div class="rows-container">
        <h2>Filas</h2>
        {#each rows as row, index}
            <div class="row" key={index}>{row}</div>
        {/each}
    </div>
</Container>

<style>
    .toggleContainer {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .toggleContainer label {
        margin-right: 10px;
    }

    .buttonContainer {
        display: flex;
        justify-content: center;
        gap: 10px; /* Adds space between buttons */
    }

    textarea {
        width: 100%;
        margin-bottom: 10px;
    }

    .actionButton {
        flex: 1; /* Each button takes up equal space */
        padding: 10px;
        background-color: #212529;
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out; /* Add transition */
    }

    .actionButton:hover {
        background-color: #52585f; /* Lighter shade on hover */
    }

    .rows-container {
        margin-top: 20px;
    }

    .row {
        border: 1px solid #ddd;
        padding: 5px;
        margin: 5px 0;
    }

    button {
        padding: 5px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>
