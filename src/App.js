import './App.css';
import Home from './pages/Home/Home';
import Panouri from './pages/Panouri/Panouri';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="panouri" element={<Panouri />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
