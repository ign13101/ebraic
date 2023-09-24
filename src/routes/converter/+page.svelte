<script>
    import {
        Button,
        Form,
        FormGroup,
        Label,
        Input,
        Container,
        Card,
        CardTitle,
        CardBody,
        CardHeader,
    } from "sveltestrap";
    import JSZip from "jszip";
    import { create, fragment } from "xmlbuilder2";

    import languages from "./brailleChars.js";

    let epubFile;
    let book = "";
    let epubVersion = "-";
    let fileCount = "-";
    let processStatus = "Esperando archivo EPUB";
    let modifiedXmlString;
    let selectedLanguage = Object.keys(languages)[0];
    let xmlOutput;

    function convertTextToBraille(text, selectedLanguage) {
        console.log("convertTextToBraille function start");
        const brailleText = Array.from(text, (char) => {
            if (char === "\n") {
                return "\u000A"; // Handle new line character here, replace with desired Braille representation
            }
            return (
                languages[selectedLanguage][char] ||
                languages[selectedLanguage].default
            );
        }).join("");
        return brailleText;
    }

    async function handleUploadedFile(event) {
        processStatus = "Comenzando...\n";
        epubFile = event.target.files[0];
        const zip = await JSZip.loadAsync(epubFile);

        for (const zipEntry of Object.values(zip.files)) {
            if (zipEntry.name.endsWith(".opf")) {
                await processOpfEntry(zip, zipEntry, new DOMParser());
            }
        }

        xmlOutput = generateXML(modifiedXmlString);
        processStatus += "Listo para descargar\n";
    }

    async function processOpfEntry(zip, zipEntry, parser) {
        processStatus += "Accediendo a archivo opf\n";
        const content = await zip.file(zipEntry.name).async("string");
        const opfDoc = parser.parseFromString(content, "text/xml");
        const hrefs = parseOpfDocument(opfDoc);

        if (hrefs.length > 0) {
            fileCount = `${hrefs.length} archivos encontrados`;
        }

        processStatus += "Procesando archivos con texto legible\n";

        const processEntryPromises = hrefs.map(async (href) => {
            const xhtmlEntry = zip.file(
                zipEntry.name.replace(/^(.*\/)?[^/]*$/, `$1${href}`)
            );
            await processZipEntry(xhtmlEntry, parser);
        });

        await Promise.all(processEntryPromises);
    }

    function parseOpfDocument(opfDoc) {
        processStatus += "Procesando archivo opf\n";
        epubVersion = opfDoc.querySelector("package").getAttribute("version");
        const metadata = opfDoc.querySelector("metadata");
        processStatus += "Analizando metadatos\n";
        const xmlSerializer = new XMLSerializer();
        const xmlString = xmlSerializer.serializeToString(metadata);

        modifiedXmlString = xmlString
            .replace(/<metadata/g, "<meta")
            .replace(/<\/metadata>/g, "</meta>");

        const spine = opfDoc.querySelector("spine");
        const manifest = opfDoc.querySelector("manifest");
        const spineIds = [];
        const hrefs = [];

        for (const item of spine.querySelectorAll("itemref")) {
            spineIds.push(item.getAttribute("idref"));
        }

        for (const id of spineIds) {
            hrefs.push(
                manifest.querySelector(`item[id="${id}"]`).getAttribute("href")
            );
        }

        return hrefs;
    }

    function generateXML(meta) {
        processStatus += "Creando archivo XML de destino\n";

        const brailleChars = Array.from(
            convertTextToBraille(book, selectedLanguage)
        );
        const numRows = Math.ceil(brailleChars.length / 32);

        const doc = create({ version: "1.0", encoding: "UTF-8" });
        const pef = doc.ele("pef", {
            version: "2008-1",
            xmlns: "http://www.daisy.org/ns/2008/pef",
        });
        const head = pef.ele("head");
        const metaHead = head.ele(meta);
        let body = pef.ele("body");
        let volume = body.ele("volume", {
            cols: "32",
            rows: "29",
            rowgap: "0",
            duplex: "true",
        });
        let section = volume.ele("section");
        let page = section.ele("page");
        processStatus += "Añadiendo texto al archivo de destino\n";
        for (let i = 0; i < numRows; i++) {
            const rowText = brailleChars.slice(i * 32, (i + 1) * 32).join("");
            const row = page.ele("row");
            row.txt(rowText);
        }

        const xmlOutput = doc.end({ prettyPrint: true });
        processStatus += "Archivo XML de destino completado\n";
        return xmlOutput;
    }

    async function processZipEntry(zipEntry, parser) {
        const content = await zipEntry.async("string");
        let readableText = "";

        if (
            zipEntry.name.endsWith(".xhtml") ||
            zipEntry.name.endsWith(".html")
        ) {
            readableText = parseXhtmlDocument(content);
        }

        book += `${readableText}\n`;
    }

    function initiateDownload() {
        // const xmlOutput = generateXML(modifiedXmlString);
        const originalFileName = epubFile.name.replace(".epub", ".pef");
        const file = new Blob([xmlOutput], { type: "application/xml" });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = originalFileName;
        document.body.appendChild(element);
        element.click();
    }

    function parseXhtmlDocument(content) {
        const parser = new DOMParser();
        const xhtmlDoc = parser.parseFromString(
            content,
            "application/xhtml+xml"
        );
        const allElements = xhtmlDoc.body.getElementsByTagName("*");
        const readableText = Array.from(allElements)
            .map((el) => el.textContent)
            .join(" ");
        return readableText;
    }
</script>

<Container class="mx-auto mt-4">
    <Card>
        <CardHeader>
            <CardTitle>Conversor de archivos EPUB a PEF</CardTitle>
        </CardHeader>
        <CardBody>
            <Form>
                <FormGroup>
                    <Label for="languageInput" />
                    <Input
                        type="select"
                        id="languageInput"
                        value={selectedLanguage}
                        on:change={(event) =>
                            (selectedLanguage = event.target.value)}
                    >
                        {#each Object.keys(languages) as language}
                            <option value={language}>{language}</option>
                        {/each}
                    </Input>
                    <Label for="epubFileInput"
                        >Selecciona el archivo EPUB:</Label
                    >
                    <Input
                        type="file"
                        id="epubFileInput"
                        on:change={handleUploadedFile}
                        accept=".epub"
                    />
                </FormGroup>
            </Form>
            <Button color="dark" on:click={initiateDownload} disabled={!book}
                >Descargar libro en PEF</Button
            >
        </CardBody>
    </Card>
    <br />
    <p class="epubVersion">
        Versión EPUB: {epubVersion}
    </p>
    <p class="fileNumber">
        Archivos con texto legible: {fileCount}
    </p>
    <p class="language">
        Idioma seleccionado: {selectedLanguage}
    </p>
    
        Estado de procesamiento: <br>
        <span class="statusLog">
        {processStatus}
    </span>
</Container>

<style>
    .statusLog {
        white-space: pre-wrap;
    }
</style>
