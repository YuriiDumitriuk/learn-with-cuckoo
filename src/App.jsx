import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import AudioWord from './pages/AudioWord';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/audio-word" element={<AudioWord />} />
                {/* Example of dynamic route (commented) */}
                {/* <Route path="/lesson/:topic" element={<Lesson />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
