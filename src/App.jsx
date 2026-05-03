import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddPage from "./pages/Addpage";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tambah" element={<AddPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;