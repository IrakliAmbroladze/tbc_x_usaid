import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

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

function Contact(){
  return <h2 style={{color: "red"}}>Contact page</h2>
}

function About (){
  return <h2>About page</h2>

}

export default App;
