const dictionaries = {
    Spanish: {
        // Spanish lowercase alphabet fixed
        "\u2801": "a",
        "\u2803": "b",
        "\u2809": "c",
        "\u2819": "d",
        "\u2811": "e",
        "\u280B": "f",
        "\u281B": "g",
        "\u2813": "h",
        "\u280A": "i",
        "\u281A": "j",
        "\u2805": "k",
        "\u2807": "l",
        "\u280D": "m",
        "\u281D": "n",
        "\u2815": "o",
        "\u280F": "p",
        "\u281F": "q",
        "\u2817": "r",
        "\u280E": "s",
        "\u281E": "t",
        "\u2825": "u",
        "\u2827": "v",
        "\u283A": "w",
        "\u282D": "x",
        "\u283D": "y",
        "\u2835": "z",

        // Spanish uppercase alphabet fixed
        "\u2828\u2801": "A",
        "\u2828\u2803": "B",
        "\u2828\u2809": "C",
        "\u2828\u2819": "D",
        "\u2828\u2811": "E",
        "\u2828\u280B": "F",
        "\u2828\u281B": "G",
        "\u2828\u2813": "H",
        "\u2828\u280A": "I",
        "\u2828\u281A": "J",
        "\u2828\u2805": "K",
        "\u2828\u2807": "L",
        "\u2828\u280D": "M",
        "\u2828\u281D": "N",
        "\u2828\u2815": "O",
        "\u2828\u280F": "P",
        "\u2828\u281F": "Q",
        "\u2828\u2817": "R",
        "\u2828\u280E": "S",
        "\u2828\u281E": "T",
        "\u2828\u2825": "U",
        "\u2828\u2827": "V",
        "\u2828\u283A": "W",
        "\u2828\u282D": "X",
        "\u2828\u283D": "Y",
        "\u2828\u2835": "Z",

        // Spanish special characters fixed
        "\u2837": "á",
        "\u283F": "é",
        "\u280C": "í",
        "\u282A": "ó",
        "\u283E": "ú",
        "\u2828\u2837": "Á",
        "\u2828\u283F": "É",
        "\u2828\u280C": "Í",
        "\u2828\u282A": "Ó",
        "\u2828\u283E": "Ú",
        "\u283B": "ñ",
        "\u2828\u283B": "Ñ",
        "\u282F": "ç",
        "\u2833": "ü",

        // Numbers fixed
        "\u283C\u281A": "0",
        "\u283C\u2801": "1",
        "\u283C\u2803": "2",
        "\u283C\u2809": "3",
        "\u283C\u2819": "4",
        "\u283C\u2811": "5",
        "\u283C\u280B": "6",
        "\u283C\u281B": "7",
        "\u283C\u2813": "8",
        "\u283C\u280A": "9",

        // Common symbols
        "\u2800": " ", // Space fixed?
        "\u2804": ".", // Period fixed
        "\u2802": ",", // Comma fixed
        "\u2806": ";", // Semicolon fixed
        "\u2812": ":", // Colon fixed
        "\u2816": "!", // Exclamation Mark fixed
        "\u2822": "?", // Question Mark fixed
        "\u2820\u2826": "'", // Apostrophe fixed
        "\u2826": '"', // Quotation Mark fixed
        "\u2824": "-", // Hyphen fixed
        "\u2824\u2824": "_", // Underscore fixed
        "\u2823": "(", // Left Parenthesis fixed
        "\u281C": ")", // Right Parenthesis fixed
        "\u2837": "[", // Left Square Bracket fixed
        "\u283E": "]", // Right Square Bracket fixed
        "\u2810\u2807": "{", // Open Curly Braces fixed
        "\u2838\u2802": "}", // Close Curly Braces fixed
        "\u2820\u2802": "/", // Slash fixed
        "\u2810\u2804": "\\", // Backwards Slash fixed
        "\u2810": "@", // At Sign fixed
        "\u2833": "#", // Hash Sign
        "\u2814": "*", // Asterisk fixed
        "\u2816": "+", // Plus Sign fixed
        "\u2836": "=", // Equal Sign fixed
        "\u000A": "\\n",
        default: "\u2800",
    },
};

export default dictionaries;