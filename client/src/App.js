import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listpage from './components/Listpage';
import AddPassword from './components/AddPassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  
  return (
    <>
    <ToastContainer/>
    <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Listpage />} />
      <Route path="/add" element={<AddPassword />} />
    </Routes>
  </Router>
  </>
  );
}

export default App;
