import cuckoo from "../assets/cuckoo-image.png"
function Mascot({ selected, showResult, correct }) {
    const getMessage = () => {
        if (!showResult) return "Powodzenia!";

        const messages = [
            "Brawo! Jesteś mistrzem! 🏆",
            "Świetnie! Widać postęp! 👏",
            "Znakomicie! Tak trzymać! 🌟",
            "Super! Możesz więcej! 💪",
            "Brawo! Prawie perfekcyjnie! 🎉",
            "Doskonale! Masz to w małym palcu! ✨",
            "Ekstra! Twoja praca przynosi efekty! 🚀",
            "Fantastycznie! Wspaniałe podejście! 🎈",
            "Rewelacyjnie! Robisz ogromne postępy! 🧠",
            "Mega! Właśnie o to chodzi! 😎",
            "Świetna robota! Zasługujesz na pochwałę! 🥇",
            "Tak trzymaj! Jesteś na dobrej drodze! 🛤️",
            "Wspaniale! Coraz lepiej ci idzie! 🔝",
            "Perfekcyjnie! Nie dało się lepiej! 💯",
            "Zuch! Pokazujesz klasę! 🐯",
            "Imponujące! Twoja determinacja się opłaca! 🔥",
            "Super robota! Tak się to robi! ⚡",
            "Brawo! Widzisz, że potrafisz! 🌈",
            "Jest progres! Tak dalej! ⏫",
            "Wow! To było bezbłędne! 💥",
            "Bardzo dobrze! Idziesz jak burza! 🌪️",
            "Kapitalnie! Wszystko się zgadza! ✅",
            "Świetny strzał! Masz nosa do słów! 🎯",
            "Widać, że się przykładasz – gratulacje! 📝",
            "Mistrzowsko! Widać talent! 👑"
        ];

        return selected === correct ? messages[Math.floor(Math.random() * messages.length)] : "Oj! Spróbuj ponownie, dasz radę!";
    };

    return (
        <div className="mascot-box text-center">
            <div>{getMessage()}</div>
            <div className="mascot-emoji text-yellow-500"><img src={cuckoo}></img></div>
        </div>
    );
}

export default Mascot;
