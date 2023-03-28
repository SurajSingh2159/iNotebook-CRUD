import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    {/* <Alert /> */}
    <div className="container my-3">
    <Routes>
          <Route exact path="/about" element ={<About />}/>
          <Route exact path="/" element ={<Home />}/>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
