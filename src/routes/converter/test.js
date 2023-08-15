
const generateBrailleChars = () => {
    const brailleChars = {};

    // Generating lowercase letters
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        brailleChars[letter] = `${String.fromCodePoint(10241 + i)}`;
    }

    // Generating uppercase letters
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        brailleChars[letter] = `${String.fromCodePoint(10241 + i)}`;
    }

    // Generating symbols
    brailleChars["!"] = "⠖";
    brailleChars["@"] = "⠲⠲";
    // ... add more symbols

    // Generating accented letters
    brailleChars["è"] = "⠑⠲";
    brailleChars["ü"] = "⠥⠲";
    // ... add more accented letters

    return brailleChars;
};

const languages = {
    Spanish: generateBrailleChars(),
    English: generateBrailleChars(),
};

// Print out generated Braille characters
console.log(languages);