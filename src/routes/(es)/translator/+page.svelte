<script>
    import {
        Form,
        FormGroup,
        Label,
        Input,
        Container,
        Card,
        CardTitle,
        CardBody,
        CardHeader,
        Button,
    } from "sveltestrap";

    let inputText = "";
    let outputText = "";

    import dictionaries from "./dicts.js";
    let selectedLanguage = Object.keys(dictionaries)[0];

    let translateText = async () => {
        let brailleCharacters = inputText.split("");
        let translatedCharacters = [];
        for (let i = 0; i < brailleCharacters.length; i++) {
            let brailleChar = brailleCharacters[i];
            let nextBrailleChar = brailleCharacters[i + 1];
            if (
                brailleChar + nextBrailleChar in
                dictionaries[selectedLanguage]
            ) {
                translatedCharacters.push(
                    dictionaries[selectedLanguage][
                        brailleChar + nextBrailleChar
                    ]
                );
                i++;
            } else if (brailleChar in dictionaries[selectedLanguage]) {
                translatedCharacters.push(
                    dictionaries[selectedLanguage][brailleChar]
                );
            } else {
                if (brailleChar == "\n") {
                    translatedCharacters.push(brailleChar + "");
                } else {
                    translatedCharacters.push(
                        dictionaries[selectedLanguage].default
                    );
                }
            }
        }
        outputText = translatedCharacters.join("");
    };
</script>

<svelte:head>
    <title>EBRAIC Traductor</title>
</svelte:head>

<Container class="mx-auto mt-4">
    <Card>
        <CardHeader>
            <CardTitle>Traductor de Braille Unicode a Texto</CardTitle>
        </CardHeader>
        <CardBody>
            <Form>
                <FormGroup>
                    <Label for="languageInput">Selecciona idioma:</Label>
                    <Input
                        type="select"
                        id="languageInput"
                        bind:value={selectedLanguage}
                    >
                        {#each Object.keys(dictionaries) as language}
                            <option value={language}>{language}</option>
                        {/each}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="inputText">Texto de entrada (Braille):</Label>
                    <Input
                        type="textarea"
                        id="inputText"
                        bind:value={inputText}
                        rows="4"
                        placeholder="Introduce el texto en Braille a traducir"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="outputText">Texto de salida:</Label>
                    <Input
                        type="textarea"
                        id="outputText"
                        readonly
                        rows="4"
                        bind:value={outputText}
                    />
                </FormGroup>
            </Form>
            <Button color="dark" on:click={translateText}>Traducir</Button>
        </CardBody>
    </Card>
</Container>
