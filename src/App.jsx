import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Surahs from "./pages/Surahs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/surahs" element={<Surahs/>} />
    </Routes>
  );
}

export default App;
