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

    let epubFile;
    let book = "";
    let epubVersion = "-";
    let fileNumber = "-";
    let statusLog = `-`;

    let modifiedXmlString;

    import languages from "./brailleChars.js";

    let selectedLanguage = Object.keys(languages)[0];

    function textToBraille(text, selectedLanguage) {
        console.log("textToBraille function start");
        const brailleText = Array.from(text, (char) => {
            if (char === "\n") {
                // Handle new line character here, replace with desired Braille representation
                return "\u000A"; // For example, replace with two line break characters
            }
            return (
                languages[selectedLanguage][char] ||
                languages[selectedLanguage].default
            );
        }).join("");
        return brailleText;
    }

    const handleFileInput = async (event) => {
        console.log("handleFileInput function start");
        statusLog = `\nStarting...\n`;
        epubFile = event.target.files[0];
        const zip = await JSZip.loadAsync(epubFile);

        for (const zipEntry of Object.values(zip.files)) {
            if (zipEntry.name.endsWith(".opf")) {
                // console.log(zipEntry.name);
                await handleOpfEntry(zip, zipEntry, new DOMParser());
            }
        }
        console.log("book ready");
        createXML(modifiedXmlString);
        // console.log(book);
        // console.log(textToBraille(book, selectedLanguage));
    };

    const handleOpfEntry = async (zip, zipEntry, parser) => {
        console.log("handleOpfEntry function start");
        statusLog += `Accessing opf file\n`;
        const content = await zip.file(zipEntry.name).async("string");
        const opfDoc = parser.parseFromString(content, "text/xml");
        const hrefs = parseOpfDoc(opfDoc);
        if (hrefs.length > 0) {
            fileNumber = `${hrefs.length} files found`;
        }
        // console.log(hrefs);

        statusLog += "Processing files with readable text\n";
        for (const href of hrefs) {
            // const xhtmlEntry = zip.file(
            //     zipEntry.name.replace(/\/[^/]*$/, `/${href}`)
            // );
            // This is the fix for the commented previous statusLog lines
            const xhtmlEntry = zip.file(
                zipEntry.name.replace(/^(.*\/)?[^/]*$/, `$1${href}`)
            );
            await processZipEntry(xhtmlEntry, parser);
        }
        statusLog += "Ready for download";
    };

    const parseOpfDoc = (opfDoc) => {
        console.log("parseOpfDoc function start");
        statusLog += "Parsing opf file\n";
        // console.log(opfDoc);
        epubVersion = opfDoc.querySelector("package").getAttribute("version");
        const metadata = opfDoc.querySelector("metadata");
        // console.log(metadata);
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
            // This was commented because item was not being used
            // const item = manifest.querySelector(`item[id="${id}"]`);
            hrefs.push(
                manifest.querySelector(`item[id="${id}"]`).getAttribute("href")
            );
        }
        // console.log(spineIds);
        // console.log(hrefs);
        return hrefs;
    };

    const createXML = (meta) => {
        console.log("createXML function start");
        statusLog += "Creating target XML file\n";

        let brailleText = textToBraille(book, selectedLanguage);
        // console.log(brailleText);

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

        const brailleChars = Array.from(brailleText);

        while (brailleChars.length > 0) {
            let rowText = brailleChars.splice(0, 32).join("");
            let row = page.ele("row");
            row.txt(rowText);
        }

        const xmlOutput = doc.end({ prettyPrint: true });
        return xmlOutput;
        // console.log(xmlOutput);
    };

    const processZipEntry = async (zipEntry, parser) => {
        console.log("processZipEntry function start");

        // console.log(zipEntry);
        const content = await zipEntry.async("string");
        let readableText = "";
        // console.log(zipEntry.name);
        if (
            zipEntry.name.endsWith(".xhtml") ||
            zipEntry.name.endsWith(".html")
        ) {
            readableText = parseXhtmlDoc(content);
            // } else if (zipEntry.name.endsWith(".html")) {
            //     readableText = parseHtmlDoc(content);
        }
        // console.log(readableText);
        book += `${readableText}\n`;
    };

    const downloadBook = () => {
        console.log("downloadBook function start");
        // console.log(book);
        const xmlOutput = createXML(modifiedXmlString); // Get the XML content

        const file = new Blob([xmlOutput], { type: "application/xml" }); // Set the MIME type as application/xml

        const element = document.createElement("a");

        element.href = URL.createObjectURL(file);
        element.download = "book.pef"; // Change the download filename to "book.pef"
        document.body.appendChild(element);
        element.click();
    };

    const parseXhtmlDoc = (content) => {
        console.log("parseXhtml function start");
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
    };

    // const parseHtmlDoc = (content) => {
    //     // console.log("3.");
    //     const parser = new DOMParser();
    //     const htmlDoc = parser.parseFromString(
    //         content,
    //         "application/xhtml+xml"
    //     );
    //     const allElements = htmlDoc.body.getElementsByTagName("*");
    //     const readableText = Array.from(allElements)
    //         .map((el) => el.textContent)
    //         .join(" ");
    //     return readableText;
    // };
</script>

<Container class="mx-auto mt-4">
    <Card>
        <CardHeader>
            <CardTitle>Epub file converter</CardTitle>
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
                    <Label for="epubFileInput">EPUB File:</Label>
                    <Input
                        type="file"
                        id="epubFileInput"
                        on:change={handleFileInput}
                        accept=".epub"
                    />
                </FormGroup>
            </Form>
            <Button color="primary" on:click={downloadBook} disabled={!book}
                >Download Book</Button
            >
        </CardBody>
    </Card>
    <br />
    <p class="epubVersion">
        Epub version: {epubVersion}
    </p>
    <p class="fileNumber">
        Files with text: {fileNumber}
    </p>
    <span class="statusLog">
        Status: {statusLog}
    </span>
    <p class="language">
        Selected Language: {selectedLanguage}
    </p>
</Container>

<style>
    .statusLog {
        white-space: pre-wrap;
    }
</style>
