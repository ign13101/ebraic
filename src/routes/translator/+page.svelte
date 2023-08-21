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
        console.log("start");
        // Split the inputText into individual Braille characters
        let brailleCharacters = inputText.split("");
        console.log("breakpoint1");

        // Convert Braille characters to their corresponding language characters
        let translatedCharacters = brailleCharacters.map((brailleChar) => {
            // Check if the Braille character exists in the selected language's mapping
            console.log("breakpoint2");
            console.log("braillechar  " + brailleChar);
            if (brailleChar in dictionaries[selectedLanguage]) {
                console.log("breakpoint3a");
                return dictionaries[selectedLanguage][brailleChar];
            } else {
                console.log("breakpoint3b");
                // If not found, use the default Braille character
                return dictionaries[selectedLanguage].default;
            }
        });

        // Join the translated characters to form the outputText
        outputText = translatedCharacters.join("");
    };
</script>

<Container class="m-5">
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
