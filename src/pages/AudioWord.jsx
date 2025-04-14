// src/pages/AudioWord.jsx
import { useState, useEffect } from "react";
import Mascot from "../components/Mascot"; // Import Mascot component

function AudioWord() {
    const [currentWord, setCurrentWord] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState({ isCorrect: null, showResult: false }); // Combined state for correctness and result visibility

    // Lista słów do losowania
    const wordsList = [
        "mąka",
        "rzeka",
        "zamek",
        "długopis",
        "dzik",
        "dupa",
        "samolot",
        "autobus",
        "piwnica",
        "jezioro",
        "grzyb",
        "komputer",
        "telefon",
        "książka",
        "biblioteka",
        "czekolada",
        "słownik",
        "pamiętnik",
        "kalendarz",
        "notatnik",
        "ogród",
        "drzewo",
        "krzew",
        "liść",
        "jesień",
        "zima",
        "wiosna",
        "lato",
        "śnieg",
        "deszcz",
        "pogoda",
        "burza",
        "wiatr",
        "słońce",
        "chmura",
        "księżyc",
        "gwiazda",
        "niebo",
        "przestrzeń",
        "świat",
        "miasto",
        "wieś",
        "ulica",
        "droga",
        "skrzyżowanie",
        "rondo",
        "most",
        "tunel",
        "dworzec",
        "lotnisko",
        "szpital",
        "apteka",
        "lekarz",
        "pielęgniarka",
        "pacjent",
        "operacja",
        "leczenie",
        "choroba",
        "zdrowie",
        "wizyta",
        "szkoła",
        "nauczyciel",
        "uczeń",
        "klasa",
        "lekcja",
        "przerwa",
        "zadanie",
        "sprawdzian",
        "egzamin",
        "ocena",
        "świadectwo",
        "uniwersytet",
        "student",
        "wykład",
        "laboratorium",
        "badania",
        "eksperyment",
        "chemia",
        "fizyka",
        "matematyka",
        "biologia",
        "geografia",
        "historia",
        "język",
        "słowo",
        "zdanie",
        "gramatyka",
        "ortografia",
        "interpunkcja",
        "czytanie",
        "pisanie",
        "mówienie",
        "słuchanie",
        "rozmowa",
        "dyskusja",
        "prezentacja",
        "komunikacja",
        "wyobraźnia",
        "twórczość",
        "artysta",
        "malarz",
        "muzyk",
        "aktor",
        "reżyser",
        "sztuka",
        "film",
        "teatr",
        "kino",
        "wystawa",
        "muzeum",
        "galeria",
        "fotografia",
        "obraz",
        "rzeźba",
        "grafika",
        "projekt",
        "architektura",
        "budynek",
        "dom",
        "mieszkanie",
        "pokój",
        "kuchnia",
        "łazienka",
        "sypialnia",
        "balkon",
        "piętro",
        "sufit",
        "ściana",
        "podłoga",
        "drzwi",
        "okno",
        "firanka",
        "zasłona",
        "dywan",
        "meble",
        "stół",
        "krzesło",
        "fotel",
        "kanapa",
        "łóżko",
        "szafa",
        "regał",
        "półka",
        "lustro",
        "lampka",
        "żarówka",
        "gniazdko",
        "wtyczka",
        "prąd",
        "światło",
        "ciepło",
        "gaz",
        "woda",
        "kran",
        "zlew",
        "wanna",
        "prysznic",
        "umywalka",
        "toaleta",
        "papier",
        "mydło",
        "szampon",
        "ręcznik",
        "szczoteczka",
        "pasta",
        "grzebień",
        "szczotka",
        "suszarka",
        "maszynka",
        "golarka",
        "perfumy",
        "krem",
        "balsam",
        "makijaż",
        "szminka",
        "tusz",
        "cień",
        "puder",
        "lakier",
        "manicure",
        "pedicure",
        "fryzura",
        "ubranie",
        "koszula",
        "bluza",
        "sweter",
        "spodnie",
        "spódnica",
        "sukienka",
        "płaszcz",
        "kurtka",
        "czapka",
        "szalik",
        "rękawiczki",
        "buty",
        "skarpetki",
        "bielizna",
        "biżuteria",
        "zegarek",
        "torebka",
        "plecak",
        "walizka",
        "parasol",
        "rower",
        "hulajnoga",
        "deskorolka",
        "samochód",
        "motocykl",
        "traktor",
        "pociąg",
        "tramwaj",
        "metro",
        "statek",
        "łódź",
        "kajak",
        "jacht",
        "samolot",
        "helikopter",
        "balon",
        "rakieta",
        "przestrzeń",
        "kosmos",
        "planeta",
        "ziemia",
        "mars",
        "wenus",
        "jowisz",
        "saturn",
        "uran",
        "neptun",
        "pluton",
        "gwiazda",
        "kometa",
        "meteor",
        "kosmonauta",
        "astronauta",
        "sonda",
        "teleskop",
        "obserwatorium"
    ];

    // Funkcja do wybierania losowego słowa
    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        const word = wordsList[randomIndex];
        setCurrentWord(word);
        setUserInput(""); // Reset user input
        setResult({ isCorrect: null, showResult: false }); // Reset result state
    };

    // Funkcja do sprawdzania poprawności słowa
    const checkWord = () => {
        const isCorrect = userInput.toLowerCase() === currentWord.toLowerCase();
        setResult({
            isCorrect, // true or false
            showResult: true, // We want to show the result after checking
        });
    };

    return (
        <div className="centered min-h-screen bg-gray-50 p-6">
            <h1 className="text-5xl font-bold text-blue-500 mb-8">Nauka słów</h1>

            {currentWord && (
                <>
                    <p className="text-xl text-gray-700 mb-6">Posłuchaj słowa:</p>

                    {/* Odtwarzacz audio */}
                    <div className="flex justify-center mb-6">
                        <iframe
                            src={`https://commons.wikimedia.org/wiki/File:Pl-${currentWord}.ogg?embedplayer=yes&showinfo=false`}
                            width="100"
                            height="50"
                            className="inline-block"
                            frameBorder="0"
                            allow="picture-in-picture"
                            allowFullScreen
                            title={`Audio dla słowa: ${currentWord}`}
                        ></iframe>
                    </div>

                    {/* Input field */}
                    <input
                        type="text"
                        className="pretty-input"
                        placeholder="Wpisz słowo"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />

                    {/* Submit button */}
                    <button
                        onClick={checkWord}
                        className="btn-primary px-8 py-4 mb-6"
                    >
                        Wyślij
                    </button>

                    {/* Result message */}
                    {result.showResult && (
                        <p className="text-xl text-gray-700 mb-6">
                            {result.isCorrect
                                ? "Brawo! Poprawnie napisane słowo."
                                : `Oj! Spróbuj ponownie. Poprawne słowo to: ${currentWord}`}
                        </p>
                    )}

                    {/* Next word button */}
                    <button
                        onClick={getRandomWord}
                        className="btn-primary px-8 py-4 mb-6"
                    >
                        Następne słowo
                    </button>
                    <button
                        className="btn-primary px-8 py-4"
                        onClick={() => window.location.href = '/'}>
                        Powrót do strony głównej
                    </button>
                </>
            )}

            {/* Show mascot with the selected state and result */}
            <div className="mascot-box mt-6 mx-auto">
                <Mascot selected={userInput} showResult={result.showResult} correct={currentWord} />
            </div>

            {/* New word button */}
            {!currentWord && (
                <button
                    onClick={getRandomWord}
                    className="btn-primary px-8 py-4"
                >
                    Nowe słowo
                </button>
            )}

            {/* Stopka */}
            <footer>
                <p>Plik audio użyty na tej stronie pochodzi z <a href={`https://commons.wikimedia.org/wiki/File:Pl-${currentWord}.ogg`} target="_blank">Wikimedia Commons</a>.
                    Licencja: <a href="https://creativecommons.org/licenses/by/2.5/" target="_blank">Creative Commons Attribution 2.5 Generic License</a>.</p>
            </footer>
        </div>
    );
}

export default AudioWord;



