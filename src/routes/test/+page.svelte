<script>
    import { onMount } from "svelte";
    import JSZip from "jszip";

    let epubFile;
    let book = "";

    const parseOpfDoc = (opfDoc) => {
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
                console.log(xhtmlEntry);
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
    };

    // const downloadBook = () => {
    //     const element = document.createElement("a");
    //     const file = new Blob([book], { type: "text/plain" });
    //     element.href = URL.createObjectURL(file);
    //     element.download = "book.txt";
    //     document.body.appendChild(element);
    //     element.click();
    // };
</script>

<svelte:head>
    <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self' data:"
    />
</svelte:head>

<div class="container">
    <form>
        <div class="form-group">
            <label for="epubFileInput">EPUB File:</label>
            <input
                type="file"
                class="form-control-file"
                id="epubFileInput"
                on:change={handleFileInput}
                accept=".epub"
            />
        </div>
    </form>
    <button disabled={!book}
        ><a href={book} download="book.txt">Download Book</a></button
    >
    <!-- on:click={downloadBook}  -->
</div>
