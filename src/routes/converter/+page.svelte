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
        CardText,
        CardHeader,
    } from "sveltestrap";
    import { onMount } from "svelte";
    import JSZip from "jszip";
    import { create, fragment } from "xmlbuilder2";

    let epubFile;
    let book = "";
    let one = "-";
    let two = "-";
    let three = `-`;

    import languages from "./brailleChars.js";

    let selectedLanguage = Object.keys(languages)[0];

    function textToBraille(text, selectedLanguage) {
        console.log(selectedLanguage);
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

    console.log("0");

    const handleFileInput = async (event) => {
        console.log("1");
        three = `\nStarting...\n`;
        epubFile = event.target.files[0];
        const zip = await JSZip.loadAsync(epubFile);

        for (const zipEntry of Object.values(zip.files)) {
            if (zipEntry.name.endsWith(".opf")) {
                // console.log(zipEntry.name);
                await handleOpfEntry(zip, zipEntry, new DOMParser());
            }
        }
        console.log(book);
        console.log(textToBraille(book, selectedLanguage));
    };

    const handleOpfEntry = async (zip, zipEntry, parser) => {
        console.log("2");
        three += `Accessing opf file\n`;
        const content = await zip.file(zipEntry.name).async("string");
        const opfDoc = parser.parseFromString(content, "text/xml");
        const hrefs = parseOpfDoc(opfDoc);
        if (hrefs.length > 0) {
            two = `${hrefs.length} files found`;
        }
        // console.log(hrefs);

        three += "Processing files with readable text\n";
        for (const href of hrefs) {
            // const xhtmlEntry = zip.file(
            //     zipEntry.name.replace(/\/[^/]*$/, `/${href}`)
            // );
            // This is the fix for the commented previous three lines
            const xhtmlEntry = zip.file(
                zipEntry.name.replace(/^(.*\/)?[^/]*$/, `$1${href}`)
            );
            await processZipEntry(xhtmlEntry, parser);
        }
        three += "Ready for download";
    };

    const parseOpfDoc = (opfDoc) => {
        console.log("3");
        three += "Parsing opf file\n";
        // console.log(opfDoc);
        one = opfDoc.querySelector("package").getAttribute("version");
        const metadata = opfDoc.querySelector("metadata");
        // console.log(metadata);
        const xmlSerializer = new XMLSerializer();
        const xmlString = xmlSerializer.serializeToString(metadata);

        const modifiedXmlString = xmlString
            .replace(/<metadata/g, "<meta")
            .replace(/<\/metadata>/g, "</meta>");
        createXML(modifiedXmlString);

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
        console.log("4");
        three += "Creating target XML file\n";
        // console.log(meta);
        const doc = create({ version: "1.0", encoding: "UTF-8" });
        const pef = doc.ele("pef", {
            version: "2008-1",
            xmlns: "http://www.daisy.org/ns/2008/pef",
        });
        const head = pef.ele("head");
        const metaHead = head.ele(meta);
        let body = pef.ele("body");
        let volume = body.ele("volume");
        let section = volume.ele("section");
        let page = section.ele("page");
        // This is incomplete, needs to be continued
        let row = page.ele("row");
        const xmlOutput = doc.end({ prettyPrint: true });
        // console.log(xmlOutput);
    };

    const processZipEntry = async (zipEntry, parser) => {
        console.log("5");

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
        console.log("6");
        // console.log(book);
        const brailleBook = textToBraille(book, selectedLanguage); // Translate the entire book text to Braille

        const file = new Blob([brailleBook], { type: "text/plain" });

        const element = document.createElement("a");

        element.href = URL.createObjectURL(file);
        element.download = "book.txt";
        document.body.appendChild(element);
        element.click();
    };

    const parseXhtmlDoc = (content) => {
        // console.log("2.");
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

<Container class="m-5">
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
    <p class="stepOne">
        Epub version: {one}
    </p>
    <p class="steptwo">
        Files with text: {two}
    </p>
    <span class="status">
        Status: {three}
    </span>
    <p class="language">
        Selected Language: {selectedLanguage}
    </p>
</Container>

<style>
    .status {
        white-space: pre-wrap;
    }
</style>
