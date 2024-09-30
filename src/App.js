import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header/Header';
import Main from './components/Pages/main/Main';
import Footer from './components/footer/Footer';
import Contact from './components/Pages/contact/Contact';
import About from './components/Pages/about/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}



export default App;
