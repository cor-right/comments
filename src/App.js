import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const Home = () => {
    return <h1>Hello World</h1>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
