import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Assignement3 from './components/Assignement3';
import Profile from './components/Profile';
import Blog from './components/Blog';
import Contact from './components/Contact';
import About from './components/About';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/assignement-3" element={<Assignement3 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}
