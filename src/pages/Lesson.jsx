import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Mascot from "../components/Mascot";
import topicsData from "../data/topics.json";

function Lesson() {
    const { topic } = useParams(); // Odczytanie parametru 'topic' z URL
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]); // Przechowujemy poprawne odpowiedzi w tablicy
    const [remainingWords, setRemainingWords] = useState([]); // Pozostałe słowa do odpowiedzi
    const [finished, setFinished] = useState(false); // Czy quiz jest zakończony
    const [availableLetters, setAvailableLetters] = useState([]); // Litery dostępne do wyboru

    const navigate = useNavigate();

    // Inicjalizacja słów po załadowaniu komponentu
    useEffect(() => {
        const topicData = topicsData[topic];
        if (topicData) {
            // Na początku wszystkie słowa są dostępne
            setRemainingWords(topicData.words);
            setAvailableLetters(topicData.availableLetters); // Ustawiamy dostępne litery
            setCorrectAnswers([]); // Resetowanie poprawnych odpowiedzi
            setFinished(false); // Resetowanie zakończenia quizu
        }
    }, [topic]); // Zmienna zależna, aby resetować stan przy zmianie tematu

    // Losowanie słowa
    useEffect(() => {
        if (remainingWords.length === 0) {
            // Jeśli brak słów, quiz zakończony
            setFinished(true);
            return;
        }
        const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        setCurrentWord(randomWord);
    }, [remainingWords]);

    const handleAnswer = (letter) => {
        setSelected(letter);
        setShowResult(true);
        const isCorrect = letter === currentWord.correctLetter;

        // Jeśli odpowiedź jest poprawna, dodajemy słowo do listy poprawnych odpowiedzi
        if (isCorrect) {
            setCorrectAnswers([...correctAnswers, currentWord.wordBase]);
        }
    };

    const handleNext = () => {
        setSelected(null);
        setShowResult(false);

        // Usuwamy poprzednie słowo z listy pozostałych
        setRemainingWords(remainingWords.filter(word => word.wordBase !== currentWord.wordBase));

        // Jeśli nie ma już słów, zaczynamy od nowa
        if (remainingWords.length === 1) {
            setRemainingWords(topicsData[topic].words);
        } else {
            const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
            setCurrentWord(randomWord);
        }
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    if (!currentWord) {
        return (
            <div className="centered min-h-screen bg-blue-50 p-4">
                <p>Ładowanie...</p>
            </div>
        );
    }

    return (
        <div className="centered min-h-screen bg-blue-50 p-4 text-center flex flex-col justify-between">
            <div className="flex-grow flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold mb-8">Uzupełnij słowo:</h2>
                <div className="word-box mb-8">
                    {showResult ? currentWord.wordBase.replace("__", selected === currentWord.correctLetter ? currentWord.correctLetter : selected) : currentWord.wordBase}
                </div>

                <div className="flex gap-8 mb-8">
                    {availableLetters.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleAnswer(letter)}
                            disabled={showResult}
                            className={`answer-button px-8 py-4 rounded-2xl shadow transition-all duration-300
                ${showResult && letter === currentWord.correctLetter
                                    ? "correct"
                                    : showResult && selected === letter
                                        ? "incorrect"
                                        : ""}`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {showResult && (
                    <div className="bg-white p-8 rounded-xl shadow-md mx-auto max-w-md">
                        <div className="text-green-600 text-xl font-semibold mb-4">Poprawnie: {currentWord.fullWord}</div>
                        <p className="text-gray-700 mb-6">{currentWord.definition}</p>
                        <button
                            onClick={handleNext}
                            className="btn-primary mt-4 px-8 py-4"
                        >
                            Następne
                        </button>
                    </div>
                )}

                <div className="mt-6">
                    <button
                        onClick={handleBackToHome}
                        className="btn-secondary px-8 py-4"
                    >
                        Powrót do wyboru tematu
                    </button>
                </div>
            </div>

            <div className="mascot-box mt-6 mx-auto">
                <Mascot selected={selected} showResult={showResult} correct={currentWord.correctLetter} />
            </div>
        </div>
    );
}

export default Lesson;
