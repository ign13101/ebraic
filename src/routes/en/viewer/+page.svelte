<script>
    import { onMount } from "svelte";
    import { Container } from "sveltestrap";

    let pefContent = `<?xml version="1.0" encoding="UTF-8"?>
    <!-- Paste here the content of your PEF file -->
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
                alert("Rows copied to the clipboard");
            })
            .catch((err) => {
                console.error("Couldn't copy rows to the clipboard: ", err);
            });
    }
</script>

<svelte:head>
    <title>EBRAIC Viewer</title>
</svelte:head>

<Container>
    <h1 class="pb-2">Braille Unicode Viewer for PEF files</h1>
    <div class="toggleContainer">
        <label for="fileToggle">Load from file:</label>
        <input type="file" id="fileToggle" on:change={handleFileUpload} />
    </div>
    <label for="fileContent">Load from text:</label>
    <textarea id="fileContent" bind:value={pefContent} rows="10" cols="40" />
    <div class="buttonContainer">
        <button class="actionButton" on:click={parsePefContent}
            >Extract rows</button
        >
        <button class="actionButton" on:click={copyToClipboard}
            >Copy rows to clipboard</button
        >
    </div>
    <div class="rows-container">
        <h2>Rows</h2>
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
        gap: 10px;
    }

    textarea {
        width: 100%;
        margin-bottom: 10px;
    }

    .actionButton {
        flex: 1;
        padding: 10px;
        background-color: #212529;
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    .actionButton:hover {
        background-color: #52585f;
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
