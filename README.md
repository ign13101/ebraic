## EBRAIC
EBRAIC is a web application that can convert ebooks in EPUB format to PEF files. It is an End of Degree project by a student of Escuela Técnica Superior de Ingeniería Informática of the University of Seville.

# Abstract
In our digital age, electronic books have revolutionized access to knowledge. However, individuals with visual impairments face significant barriers to accessing this source of information. This project addresses the urgent need to develop a tool that converts electronic books into Braille, ensuring an inclusive reading experience. This project focuses on universal accessibility, open-source principles, inclusion, technological innovation, and cultural diversity.

The main objective of this project is to create a web application that seamlessly converts electronic books, particularly in EPUB format, to Braille using the Portable Embosser Format (PEF). The application will feature a user-friendly interface, employing advanced algorithms for precise and legible Braille conversion while adhering to global web accessibility standards. This enables compatibility with various Braille devices, promoting accessibility in diverse reading environments.

To achieve these goals, we emphasize education and awareness, providing users with information on the significance of accessible electronic literature. We also encourage collaboration and the open-source approach to foster continual improvement and broad community benefit. By realizing these objectives, we aspire to make Braille literature more accessible, promoting inclusivity and equality in the digital realm.

# Author
Ignacio García Rodríguez

# Director
Víctor Jesús Díaz Madrigal

# How to use it
This web application features a converter that allows for the conversion of EPUB format electronic books to PEF format, facilitating the printing of physical Braille books and the reading of these electronic books on refreshable Braille displays.

Additionally, besides the conversion page, it also has a Braille text extraction page from PEF files, to verify the correct functioning of the converter. There is also a translation page where you can input rows from the viewer page to check the accuracy of the translation.

The page follows a typical structure of a Svelte project with Sveltekit and is deployed on Vercel. The absence of a backend helps reduce the complexity and significantly increase the application's performance. This means that the conversion code runs in the browser, but it has beenoptimized to work with large and complex files.
