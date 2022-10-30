import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Surah from "./pages/Surah";
import Surahs from "./pages/Surahs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/surahs" element={<Surahs/>} />
      <Route path="/surahs/:id/:surah" element={<Surah/>} />
      <Route path="*" element={<Home/>} />
    </Routes>
  );
}

export default App;
