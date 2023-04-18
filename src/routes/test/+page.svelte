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
    import br from "braille";
    // import XmlWriter from "xml-writer";
    import { create, fragment } from "xmlbuilder2";

    let epubFile;
    let book = "";

    function createXML(meta) {
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
        let row = page.ele("row");
        const xmlOutput = doc.end({ prettyPrint: true });
        console.log(xmlOutput);
    }

    const parseOpfDoc = (opfDoc) => {
        const metadata = opfDoc.querySelector("metadata");
        const xmlSerializer = new XMLSerializer();
        const xmlString = xmlSerializer.serializeToString(metadata);

        const modifiedXmlString = xmlString
            .replace(/<metadata/g, "<meta")
            .replace(/<\/metadata>/g, "</meta>");
        // console.log(modifiedXmlString);

        createXML(modifiedXmlString);

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
    };

    const parseHtmlDoc = (content) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(
            content,
            "application/xhtml+xml"
        );
        const allElements = htmlDoc.body.getElementsByTagName("*");
        const readableText = Array.from(allElements)
            .map((el) => el.textContent)
            .join(" ");
        return readableText;
    };

    const parseXhtmlDoc = (content) => {
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

    const processZipEntry = async (zipEntry, parser) => {
        const content = await zipEntry.async("string");
        let readableText = "";
        // console.log(zipEntry.name);
        if (zipEntry.name.endsWith(".xhtml")) {
            readableText = parseXhtmlDoc(content);
        } else if (zipEntry.name.endsWith(".html")) {
            readableText = parseHtmlDoc(content);
        }
        // console.log(readableText);
        book += `${readableText}\n`;
    };

    const handleOpfEntry = async (zip, zipEntry, parser) => {
        const content = await zip.file(zipEntry.name).async("string");
        const opfDoc = parser.parseFromString(content, "text/xml");
        const hrefs = parseOpfDoc(opfDoc);

        for (const href of hrefs) {
            // console.log(href);
            const xhtmlEntry = zip.file(
                zipEntry.name.replace(/\/[^/]*$/, `/${href}`)
            );
            if (xhtmlEntry) {
                // console.log(xhtmlEntry);
                await processZipEntry(xhtmlEntry, parser);
            }
        }
    };

    const handleFileInput = async (event) => {
        epubFile = event.target.files[0];
        const zip = await JSZip.loadAsync(epubFile);

        for (const zipEntry of Object.values(zip.files)) {
            if (zipEntry.name.endsWith(".opf")) {
                await handleOpfEntry(zip, zipEntry, new DOMParser());
            }
        }
        console.log(br.toBraille(book));
    };

    const downloadBook = () => {
        const element = document.createElement("a");
        const file = new Blob([book], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "book.txt";
        document.body.appendChild(element);
        element.click();
    };
</script>

<Container class="m-5">
    <Card>
        <CardHeader>
            <CardTitle>Epub file converter</CardTitle>
        </CardHeader>
        <CardBody>
            <Form>
                <FormGroup>
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
</Container>
