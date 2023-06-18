import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MelodyPage from "./pages/MelodyPage";
import Layout from "./Layout";
import LyricsPage from "./pages/LyricsPage";
import CoverPage from "./pages/CoverPage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="melody" element={<MelodyPage />} />
                <Route path="lyrics" element={<LyricsPage />} />
                <Route path="cover" element={<CoverPage />} />
                <Route path="error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
