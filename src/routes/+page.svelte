<script>
	// import { onMount } from 'svelte';
	import { Container, Form, FormGroup, Input, Label, Button } from 'sveltestrap';

	import JSZip from 'jszip';

	// onMount(() => {

	// });

	let file;

	async function handleSubmitFile(event) { 
		file = event.target.files[0];
		const zip = new JSZip();

		const unzippedFile = await zip.loadAsync(file);
		unzippedFile.forEach(async (relativePath, zipEntry) => {
			if (zipEntry.name.endsWith('.opf')) {
				const content = await unzippedFile.file(zipEntry.name).async('string');
				const parser = new DOMParser();
				const opfDoc = parser.parseFromString(content, 'text/xml');
				const spine = opfDoc.querySelector('spine');
				const spineIds = Array.from(spine.querySelectorAll('itemref'), (item) =>
					item.getAttribute('idref')
				);
				const manifest = opfDoc.querySelector('manifest');
				const hrefs = spineIds.map((id) =>
					manifest.querySelector(`item[id='${id}']`).getAttribute('href')
				);
				await parseWithVersion(
					unzippedFile,
					parseInt(opfDoc.querySelector('package').getAttribute('version')),
					hrefs
				);
			}
		});
		console.log('Success');
	}

	function parseEpubV3(xhtmlText) {
		console.log('parsev3');
		const parser = new DOMParser();
		const xhtmlDoc = parser.parseFromString(xhtmlText, 'application/xhtml+xml');
		const allElements = xhtmlDoc.body.getElementsByTagName('*');
		let readableText = Array.from(allElements)
			.map((el) => el.textContent)
			.join(' ');
		return readableText;
	}

	function parseEpubV2(htmlText) {
		console.log('parsev2');
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(htmlText, 'text/html');
		const allElements = htmlDoc.body.getElementsByTagName('*');
		let readableText = Array.from(allElements)
			.map((el) => el.textContent)
			.join(' ');
		return readableText;
	}

	async function parseWithVersion(usableFile, version, hrefs) {
		console.log('parsewithversion');
		for (const href of hrefs) {
			const zipEntry = usableFile.file(href);
			if (zipEntry) {
				if (zipEntry.name.endsWith('.xhtml') || zipEntry.name.endsWith('.html')) {
					console.log(zipEntry.name);
					const content = await zipEntry.async('string');
					let readableContent;
					if (version === 3) {
						readableContent = parseEpubV3(content);
					} else if (version === 2) {
						readableContent = parseEpubV2(content);
					} else {
						console.log('missing1');
					}
					if (/\S/.test(readableContent)) {
						console.log(readableContent);
					} else {
						console.log('missing2');
					}
				}
			} else {
				console.log('missing3');
			}
		}
		console.log('success?');
	}
</script>

<Container>
	<h1 class="text-center">Welcome to my homepage!</h1>
	<form id="form-ebook-upload" on:submit|preventDefault={handleSubmitFile}>
		<FormGroup>
			<Label for="file">Sube tu libro en formato epub:</Label>
			<Input required type="file" class="form-control" id="file" name="file" />
			<Button color="primary" type="submit">Enviar</Button>
		</FormGroup>
	</form>
</Container>
