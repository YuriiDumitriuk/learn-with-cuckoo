import { useNavigate } from "react-router-dom";

const topics = ["Ó vs U", "RZ vs Ż", "Wielka litera"];

function Home() {
    const navigate = useNavigate();

    const handleNavigate = (topic) => {
        navigate(`/lesson/${topic}`);
    };

    return (
        <div className="centered min-h-screen bg-yellow-50 p-4 flex flex-col justify-between">
            <div className="flex-grow flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-red-500 mb-10">Ucz się z Gżegżółką 🐤</h1>
                <p className="mb-6 text-xl text-gray-700">Wybierz temat:</p>
                <div className="flex flex-col gap-8">
                    {/*{topics.map((topic, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleNavigate(topic)}
                            className="btn-primary text-lg py-4 px-10"
                        >
                            {topic}
                        </button>
                    ))}*/}
                </div>
            </div>

            <div className="text-center mt-6">
                <div className="text-4xl text-yellow-500">🐤</div>
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate("/audio-word")}
                    className="btn-primary text-xl"
                >
                    Spróbuj odsłuchać i napisać
                </button>
            </div>
            
        </div>

    );
}

export default Home;
