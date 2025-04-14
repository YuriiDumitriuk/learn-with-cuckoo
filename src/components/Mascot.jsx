function Mascot({ selected, showResult, correct }) {
    const getMessage = () => {
        if (!showResult) return "Powodzenia! 🐤";

        const messages = [
            "Brawo! Jesteś mistrzem ó!",
            "Świetnie! Widać postęp! 👏",
            "Znakomicie! Tak trzymać! 🌟",
            "Super! Możesz więcej! 💪",
            "Brawo! Prawie perfekcyjnie! 🎉"
        ];

        return selected === correct ? messages[Math.floor(Math.random() * messages.length)] : "Oj! Spróbuj ponownie, dasz radę!";
    };

    return (
        <div className="mascot-box text-center">
            <div>{getMessage()}</div>
            <div className="mascot-emoji text-yellow-500">🐤</div>
        </div>
    );
}

export default Mascot;
