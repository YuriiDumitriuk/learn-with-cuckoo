
// src/pages/AudioWord.jsx
import { useState, useEffect } from "react";
import Mascot from "../components/Mascot";
import homeIcon from "../assets/home-icon.svg";
import speakerIcon from "../assets/speaker-icon.svg";

function AudioWord() {
    const [currentWord, setCurrentWord] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState({ isCorrect: null, showResult: false });
    const [hiddenAnswer, setHiddenAnswer] = useState(true);
    const [currentBestScore, setCurrentBestScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [counter, setCounter] = useState(0);
    // your full wordsList…
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
    // speak helper
    const speak = (text) => {
        if (!window.speechSynthesis) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "pl-PL";
        u.rate = 0.9;
        u.pitch = 1.0;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    };

    const getRandomWord = () => {
        const candidate = wordsList[Math.floor(Math.random() * wordsList.length)];
        setCurrentWord(candidate);
        setUserInput("");
        setResult({ isCorrect: null, showResult: false });
        setHiddenAnswer(true);
        // auto‑speak new word:
        speak(candidate);
        setCounter(0);
    };

    const checkWord = () => {
        const isCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
        setResult({ isCorrect, showResult: true });

        if (isCorrect) {
            if (counter === 0) {
                setCurrentBestScore(currentBestScore + 1);
                setCounter(1);
            }
        }
        else {
            setCurrentBestScore(0);
            setCounter(0);
        }
        
        
    };

    return (
        <div className="centered min-h-screen bg-gray-50 p-6">
            <h1 className="text-5xl font-bold text-blue-500 ">Nauka słów</h1>
            <button
                className="btn-primary px-8 py-4 home-button"
                onClick={() => window.location.href = '/learn-with-cuckoo'}>
                <img src={homeIcon} alt="Home" />
            </button>
            <div className="hot-streak">{currentBestScore}/{bestScore}</div>
            {currentWord ? (
                <>
                    <p className="text-xl text-gray-700 mb-6">Posłuchaj słowa:</p>
                    {/* TTS play button */}
                    <button
                        onClick={() => speak(currentWord)}
                        className="play-icon-btn"
                    >
                        <img src={speakerIcon} className="play-icon-btn__icon"></img>
                        
                    </button>

                    <input
                        type="text"
                        className="pretty-input mb-4"
                        placeholder="Wpisz słowo"
                        value={userInput}
                        onChange={e => {
                            setUserInput(e.target.value);
                            setResult({ isCorrect: null, showResult: false });
                        }}
                    />

                    <button onClick={checkWord} className="btn-primary px-8 py-4 mb-6">
                        Wyślij
                    </button>

                    {result.showResult && (
                        <p className="text-xl text-gray-700 mb-6">
                            {result.isCorrect
                                ?"Brawo! Poprawnie napisane słowo."
                                : <>
                                    Oj! Spróbuj ponownie. Poprawne słowo to:
                                    <span
                                        className={hiddenAnswer ? "hidden-answer" : "hidden-answer revealed"}
                                        onClick={() => setHiddenAnswer(false)}
                                    >
                                        {currentWord}
                                    </span>
                                </>
                            }
                        </p>
                    )}

                    <button
                        onClick={getRandomWord}
                        className="btn-primary px-8 py-4"
                    >
                        Następne słowo
                    </button>
                </>
            ) : (
                <button
                    onClick={getRandomWord}
                    className="btn-primary px-8 py-4"
                >
                    Nowe słowo
                </button>
            )}

            <Mascot
                selected={userInput.trim().toLowerCase()}
                showResult={result.showResult}
                correct={currentWord}
            />

            
        </div>
    );
}

export default AudioWord;




