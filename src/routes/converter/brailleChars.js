
const languages = {
    Español: {
        a: "\u2801",
        b: "\u2803",
        c: "\u2809",
        d: "\u2819",
        e: "\u2811",
        f: "\u280B",
        g: "\u281B",
        h: "\u2813",
        i: "\u280A",
        j: "\u281A",
        k: "\u2805",
        l: "\u2807",
        m: "\u280D",
        n: "\u281D",
        o: "\u2815",
        p: "\u280F",
        q: "\u281F",
        r: "\u2817",
        s: "\u280E",
        t: "\u281E",
        u: "\u2825",
        v: "\u2827",
        w: "\u283A",
        x: "\u282D",
        y: "\u283D",
        z: "\u2835",

        A: "\u2828\u2801",
        B: "\u2828\u2803",
        C: "\u2828\u2809",
        D: "\u2828\u2819",
        E: "\u2828\u2811",
        F: "\u2828\u280B",
        G: "\u2828\u281B",
        H: "\u2828\u2813",
        I: "\u2828\u280A",
        J: "\u2828\u281A",
        K: "\u2828\u2805",
        L: "\u2828\u2807",
        M: "\u2828\u280D",
        N: "\u2828\u281D",
        O: "\u2828\u2815",
        P: "\u2828\u280F",
        Q: "\u2828\u281F",
        R: "\u2828\u2817",
        S: "\u2828\u280E",
        T: "\u2828\u281E",
        U: "\u2828\u2825",
        V: "\u2828\u2827",
        W: "\u2828\u283A",
        X: "\u2828\u282D",
        Y: "\u2828\u283D",
        Z: "\u2828\u2835",

        á: "\u2837",
        é: "\u283F",
        í: "\u280C",
        ó: "\u282A",
        ú: "\u283E",
        ü: "\u2833",
        Á: "\u2828\u2837",
        É: "\u2828\u283F",
        Í: "\u2828\u280C",
        Ó: "\u2828\u282A",
        Ú: "\u2828\u283E",
        Ü: "\u2828\u2833",
        ñ: "\u283B",
        Ñ: "\u2828\u283B",
        ç: "\u282F",

        "0": "\u283C\u281A",
        "1": "\u283C\u2801",
        "2": "\u283C\u2803",
        "3": "\u283C\u2809",
        "4": "\u283C\u2819",
        "5": "\u283C\u2811",
        "6": "\u283C\u280B",
        "7": "\u283C\u281B",
        "8": "\u283C\u2813",
        "9": "\u283C\u280A",

        " ": "\u2800",
        " ": "\u2800",
        ".": "\u2804",
        ",": "\u2802",
        ";": "\u2806",
        ":": "\u2812",
        "!": "\u2816",
        "¡": "\u2816",
        "?": "\u2822",
        "¿": "\u2822",
        "'": "\u2820\u2826",
        '"': "\u2826",
        "‘": "\u2820\u2826",
        "”": "\u2826",
        "`": "\u2820\u2804",
        "-": "\u2824",
        "–": "\u2824",
        "_": "\u2824\u2824",
        "(": "\u2823",
        ")": "\u281C",
        "[": "\u2810\u2837",
        "]": "\u2838\u283E",
        "{": "\u2810\u2807",
        "}": "\u2838\u2802",
        "/": "\u2820\u2802",
        "\\": "\u2810\u2804",
        "@": "\u2810",
        "#": "\u283C",
        "*": "\u2814",
        "+": "\u282C",
        "=": "\u2836",
        "\\n": "\u2832",
        "%": "\u2838\u2834",
        "&": "\u2820\u282F",
        "§": "\u282C",
        "©": "\u2823\u2828\u2809\u281C",
        default: "\u282C", // 8 dot full symbol for blank square
    },

    Inglés: {
        // UEB
        a: "\u2801",
        b: "\u2803",
        c: "\u2809",
        d: "\u2819",
        e: "\u2811",
        f: "\u280B",
        g: "\u281B",
        h: "\u2813",
        i: "\u280A",
        j: "\u281A",
        k: "\u2805",
        l: "\u2807",
        m: "\u280D",
        n: "\u281D",
        o: "\u2815",
        p: "\u280F",
        q: "\u281F",
        r: "\u2817",
        s: "\u280E",
        t: "\u281E",
        u: "\u2825",
        v: "\u2827",
        w: "\u283A",
        x: "\u282D",
        y: "\u283D",
        z: "\u2835",

        A: "\u2828\u2801",
        B: "\u2828\u2803",
        C: "\u2828\u2809",
        D: "\u2828\u2819",
        E: "\u2828\u2811",
        F: "\u2828\u280B",
        G: "\u2828\u281B",
        H: "\u2828\u2813",
        I: "\u2828\u280A",
        J: "\u2828\u281A",
        K: "\u2828\u2805",
        L: "\u2828\u2807",
        M: "\u2828\u280D",
        N: "\u2828\u281D",
        O: "\u2828\u2815",
        P: "\u2828\u280F",
        Q: "\u2828\u281F",
        R: "\u2828\u2817",
        S: "\u2828\u280E",
        T: "\u2828\u281E",
        U: "\u2828\u2825",
        V: "\u2828\u2827",
        W: "\u2828\u283A",
        X: "\u2828\u282D",
        Y: "\u2828\u283D",
        Z: "\u2828\u2835",

        "0": "\u283C\u281A",
        "1": "\u283C\u2801",
        "2": "\u283C\u2803",
        "3": "\u283C\u2809",
        "4": "\u283C\u2819",
        "5": "\u283C\u2811",
        "6": "\u283C\u280B",
        "7": "\u283C\u281B",
        "8": "\u283C\u2813",
        "9": "\u283C\u280A",

        " ": "\u2800",
        " ": "\u2800",
        ".": "\u2804",
        ",": "\u2802",
        ";": "\u2806",
        ":": "\u2812",
        "!": "\u2816",
        "¡": "\u2816",
        "?": "\u2822",
        "¿": "\u2822",
        "'": "\u2820\u2826",
        '"': "\u2826",
        "`": "\u2820\u2804",
        "‘": "\u2820\u2826",
        "”": "\u2826",
        "-": "\u2824",
        "–": "\u2824",
        "_": "\u2828\u2824",
        "(": "\u2810\u2823",
        ")": "\u2810\u281C",
        "[": "\u2828\u2823",
        "]": "\u2828\u281C",
        "{": "\u2838\u2823",
        "}": "\u2838\u281C",
        "/": "\u2838\u280C",
        "\\": "\u2838\u2821",
        "@": "\u2808\u2801",
        "#": "\u2838\u2839",
        "*": "\u2810\u2814",
        "+": "\u2810\u2816",
        "=": "\u2810\u2836",
        " ": "\u2800",
        // "\\n": "\u2832",
        // " ": "\u2800", 
        "\\n": "\u2832",
        "%": "\u2828\u2834",
        "&": "\u2808\u282F",
        "§": "\u282C",
        "©": "\u2818\u2809",

        default: "\u282C",

    },

};

export default languages;