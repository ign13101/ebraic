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
    import { create, fragment } from "xmlbuilder2";

    let epubFile;
    let book = "";
    let one = "-";
    let two = "-";
    let three = `-`;

    const brailleChars = {
  'a': '\u2801', 'b': '\u2803', 'c': '\u2809', 'd': '\u2819',
  'e': '\u2811', 'f': '\u280B', 'g': '\u281B', 'h': '\u2813',
  'i': '\u280A', 'j': '\u281A', 'k': '\u2805', 'l': '\u2807',
  'm': '\u280D', 'n': '\u281D', 'o': '\u2815', 'p': '\u280F',
  'q': '\u281F', 'r': '\u2817', 's': '\u280E', 't': '\u281E',
  'u': '\u2825', 'v': '\u2827', 'w': '\u283A', 'x': '\u282D',
  'y': '\u283D', 'z': '\u2835',
  'A': '\u2820', 'B': '\u2821', 'C': '\u2823', 'D': '\u283B',
  'E': '\u2828', 'F': '\u2833', 'G': '\u283A', 'H': '\u2831',
  'I': '\u2829', 'J': '\u2832', 'K': '\u2825', 'L': '\u2827',
  'M': '\u283D', 'N': '\u2835', 'O': '\u283C', 'P': '\u2839',
  'Q': '\u283E', 'R': '\u2837', 'S': '\u282E', 'T': '\u2836',
  'U': '\u2845', 'V': '\u2847', 'W': '\u285A', 'X': '\u284D',
  'Y': '\u285D', 'Z': '\u2855',
  'ä': '\u2805', 'ö': '\u280C', 'ü': '\u281C', 'ß': '\u2830',
  'Ä': '\u2805', 'Ö': '\u280C', 'Ü': '\u281C',
  'ä': '\u2805', 'ö': '\u280C', 'Ä': '\u2805', 'Ö': '\u280C',
  'Å': '\u2820', 'Ć': '\u2823', 'Ę': '\u2828', 'Ł': '\u2839',
  'Ń': '\u2835', 'Ø': '\u283C', 'Ś': '\u282E', 'Ź': '\u285D',
  'Ż': '\u2855',
  'а': '\u2801', 'б': '\u2810', 'в': '\u2813', 'г': '\u2809',
  'д': '\u2819', 'е': '\u2811', 'ё': '\u2811', 'ж': '\u2815',
  'з': '\u2817', 'и': '\u280A', 'й': '\u281A', 'к': '\u2805',
  'л': '\u2807', 'м': '\u280D', 'н': '\u281D', 'о': '\u2815',
  'п': '\u280F', 'р': '\u281F', 'с': '\u280E', 'т': '\u281E',
  'у': '\u2825', 'ф': '\u281B', 'х': '\u2823', 'ц': '\u282F',
  'ч': '\u2833', 'ш': '\u282D', 'щ': '\u2831', 'ъ': '\u280C',
  'ы': '\u2827', 'ь': '\u2821', 'э': '\u282B', 'ю': '\u2837',
  'я': '\u2835',
  'अ': '\u2801', 'आ': '\u2803', 'इ': '\u280A', 'ई': '\u281A',
  'उ': '\u2825', 'ऊ': '\u2825\u281A', 'ऋ': '\u2821\u281A',
  'ए': '\u2811', 'ऐ': '\u2811\u281A', 'ओ': '\u2815', 'औ': '\u2815\u281A',
  'क': '\u2805', 'ख': '\u2805\u280A', 'ग': '\u2805\u2819', 'घ': '\u2805\u2819\u280A',
  'च': '\u2809', 'छ': '\u2809\u280A', 'ज': '\u281B', 'झ': '\u281B\u280A',
  'ट': '\u2810', 'ठ': '\u2810\u280A', 'ड': '\u2810\u2819', 'ढ': '\u2810\u2819\u280A',
  'ण': '\u281D', 'त': '\u281E', 'थ': '\u281E\u280A', 'द': '\u2819',
  'ध': '\u2819\u280A', 'न': '\u281D', 'प': '\u280F', 'फ': '\u280B',
  'ब': '\u2813', 'भ': '\u2813\u280A', 'म': '\u280D', 'य': '\u283D',
  'र': '\u2817', 'ल': '\u2807', 'व': '\u2827', 'श': '\u280E',
  'ष': '\u280E\u2819', 'स': '\u280E\u2819\u280A', 'ह': '\u2813\u280A',
  // Numbers
  '0': '\u281A', '1': '\u2801', '2': '\u2803', '3': '\u2809',
  '4': '\u2819', '5': '\u2811', '6': '\u280B', '7': '\u281B',
  '8': '\u2813', '9': '\u280A',
  // Common symbols
  ' ': '\u2800',  // Space
  '.': '\u2802',  // Period
  ',': '\u2806',  // Comma
  ';': '\u280E',  // Semicolon
  ':': '\u280A',  // Colon
  '!': '\u2816',  // Exclamation Mark
  '?': '\u281E',  // Question Mark
  "'": '\u2803',  // Apostrophe
  '"': '\u281B',  // Quotation Mark
  '-': '\u280F',  // Hyphen
  '(': '\u281C',  // Left Parenthesis
  ')': '\u2838',  // Right Parenthesis
  '[': '\u281C',  // Left Square Bracket
  ']': '\u2838',  // Right Square Bracket
  '/': '\u283F',  // Slash
  '&': '\u2826',  // Ampersand
  '@': '\u2837',  // At Sign
  '#': '\u2833',  // Hash Sign
  '$': '\u282F',  // Dollar Sign
  '%': '\u2835',  // Percent Sign
  '*': '\u282D',  // Asterisk
  '+': '\u2836',  // Plus Sign
  '=': '\u283A',  // Equal Sign
  '<': '\u2822',  // Less Than Sign
  '>': '\u2832',  // Greater Than Sign
};

function textToBraille(text) {
  const brailleText = Array.from(text, char => brailleChars[char.toLowerCase()] || char).join('');
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
        console.log(textToBraille(book));
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
        if (zipEntry.name.endsWith(".xhtml")) {
            readableText = parseXhtmlDoc(content);
        } else if (zipEntry.name.endsWith(".html")) {
            readableText = parseHtmlDoc(content);
        }
        // console.log(readableText);
        book += `${readableText}\n`;
    };

    const downloadBook = () => {
        console.log("6");
// console.log(book);
        const element = document.createElement("a");
        const file = new Blob([book], { type: "text/plain" });
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

    const parseHtmlDoc = (content) => {
        // console.log("3.");
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
    <br />
    <p class="stepOne">
        Epub version: {one}
    </p>
    <p class="steptwo">
        Files with text: {two}
    </p>
    <span class="status">Status: {three}</span>
</Container>

<style>
    .status {
        white-space: pre-wrap;
    }
</style>
