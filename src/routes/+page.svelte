<script>
	import { onMount } from 'svelte';
	import { Container, Form, FormGroup, Input, Label, Button } from 'sveltestrap';

	import JSZip from 'jszip';

	onMount(() => {
		handleSubmitFile();
	});

	function handleSubmitFile(event) {
		event.preventDefault();
		const zip = new JSZip();
		let form = event.target;
		let formData = new FormData(form);
		let file = formData.get('file');
		zip.loadAsync(file).then(function (unzippedFile) {
			const unzipFile = unzippedFile;
			unzippedFile.forEach(function (relativePath, zipEntry) {
				if (zipEntry.name.endsWith('.opf')) {
					unzippedFile
						.file(zipEntry.name)
						.async('string')
						.then(function (content) {
							const parser = new DOMParser();
							const opfDoc = parser.parseFromString(content, 'text/xml');
							const version = parseInt(opfDoc.querySelector('package').getAttribute('version'));
							const spine = opfDoc.querySelector('spine');
							const manifest = opfDoc.querySelector('manifest');
							const spineIds = [];
							console.log(opfDoc.querySelector('package'));
							console.log(version);
							console.log(spine);

							for (const item of spine.querySelectorAll('itemref')) {
								spineIds.push(item.getAttribute('idref'));
							}
							const hrefs = [];
							for (const id of spineIds) {
								hrefs.push(manifest.querySelector(`item[id='${id}']`).getAttribute('href'));
							}

							console.log(hrefs);

							parseWithVersion(unzipFile, version, hrefs);
						});
				}
			});
		});

		console.log('Success');
	}

	// you should consider excluding a tags, as they usually have no meaning in the book, only digital books
	// whose purpose is to skip a couple of pages might use it
	function parseEpubV3(xhtmlText) {
		const parser = new DOMParser();
		const xhtmlDoc = parser.parseFromString(xhtmlText, 'application/xhtml+xml');
		const allElements = xhtmlDoc.body.getElementsByTagName('*');
		let readableText = Array.from(allElements)
			.map((el) => el.textContent)
			.join(' ');
		return readableText;
	}

	function parseEpubV2(htmlText) {
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(htmlText, 'application/xhtml+xml');
		const allElements = htmlDoc.body.getElementsByTagName('*');
		let readableText = Array.from(allElements)
			.map((el) => el.textContent)
			.join(' ');
		return readableText;
	}

	async function parseWithVersion(usableFile, version, hrefs) {
		switch (version) {
			case 3:
				for (const href of hrefs) {
					const zipEntry = usableFile.file(href);
					if (zipEntry && (zipEntry.name.endsWith('.xhtml') || zipEntry.name.endsWith('.html'))) {
						console.log(zipEntry.name);
						const content = await zipEntry.async('string');
						let readableContent = parseEpubV3(content);
						console.log(readableContent);
					}
				}
				break;
			case 2:
				for (const href of hrefs) {
					const zipEntry = usableFile.file(href);
					if (zipEntry) {
						if (zipEntry.name.endsWith('.xhtml')) {
							console.log(zipEntry.name);
							const content = await zipEntry.async('string');
							let readableContent = parseEpubV3(content);
							// check if it contains any character different from whitespace
							if (/\S/.test(readableContent)) {
								console.log(readableContent);
							}
						} else if (zipEntry.name.endsWith('.html')) {
							console.log(zipEntry.name);
							const content = await zipEntry.async('string');
							let readableContent = parseEpubV2(content);
							// check if it contains any character different from whitespace
							if (/\S/.test(readableContent)) {
								console.log(readableContent);
							}
						}
					}
				}
				break;
			default:
				break;
		}
	}
</script>

<Container>
	<h1 class="text-center">Welcome to my homepage!</h1>
	<Form id="form-ebook-upload">
		<FormGroup>
			<Label for="file">Sube tu libro en formato epub:</Label>
			<Input required type="file" class="form-control" id="file" name="file" />
			<Button color="primary" type="submit">Enviar</Button>
		</FormGroup>
	</Form>
</Container>
