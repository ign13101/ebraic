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
    import { onMount } from "svelte";

    let inputText = "";
    let outputText = "";

    onMount(() => {
        console.log("hello");
    });

    import dictionaries from "./dicts.js";
    let selectedLanguage = Object.keys(dictionaries)[0]; // Set the default language here

    // ... Your dictionaries object and textToBraille function here ...

    let translateText = async () => {
        // Split the inputText into individual Braille characters
        let brailleCharacters = inputText.split("");

        // Convert Braille characters to their corresponding language characters
        let translatedCharacters = [];
        for (let i = 0; i < brailleCharacters.length; i++) {
            let brailleChar = brailleCharacters[i];
            let nextBrailleChar = brailleCharacters[i + 1];

            console.log("Processing:", brailleChar, nextBrailleChar);

            if (
                brailleChar + nextBrailleChar in
                dictionaries[selectedLanguage]
            ) {
                console.log("Found compound:", brailleChar + nextBrailleChar);
                console.log(
                    "Resulting compound: " +
                        dictionaries[selectedLanguage][
                            brailleChar + nextBrailleChar
                        ]
                );
                translatedCharacters.push(
                    dictionaries[selectedLanguage][
                        brailleChar + nextBrailleChar
                    ]
                );
                i++; // Skip the next character since it's part of a compound character
            } else if (brailleChar in dictionaries[selectedLanguage]) {
                console.log(
                    "Found:",
                    brailleChar +
                        " " +
                        dictionaries[selectedLanguage][brailleChar]
                );
                translatedCharacters.push(
                    dictionaries[selectedLanguage][brailleChar]
                );
            } else {
                console.log("Not found:", brailleChar);
                if (brailleChar == "\n") {
                    console.log("THIS IS THE CASE");
                    translatedCharacters.push(brailleChar + "");
                }
                else {
                    translatedCharacters.push(
                        dictionaries[selectedLanguage].default
                    );
                }
            }
        }

        // Join the translated characters to form the outputText
        outputText = translatedCharacters.join("");
    };
</script>

<Container class="mx-auto mt-4">
    <Card>
        <CardHeader>
            <CardTitle>Braille Text Translator</CardTitle>
        </CardHeader>
        <CardBody>
            <Form>
                <FormGroup>
                    <Label for="languageInput">Select Language:</Label>
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
                    <Label for="inputText">Input Text:</Label>
                    <Input
                        type="textarea"
                        id="inputText"
                        bind:value={inputText}
                        rows="4"
                        placeholder="Enter text to translate"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="outputText">Output Text (Braille):</Label>
                    <Input
                        type="textarea"
                        id="outputText"
                        readonly
                        rows="4"
                        bind:value={outputText}
                    />
                </FormGroup>
            </Form>
            <Button class="btn btn-primary" on:click={translateText}
                >Translate</Button
            >
        </CardBody>
    </Card>
</Container>

<style>
    /* Add your custom styles here */
</style>
