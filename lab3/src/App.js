//import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Create from './components/Create';
import Edit from './components/Edit';
import Register from './components/Register';
import Login from './components/Login';

import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function App() {

  
  return (
    <div className="App">
      <h1>EGUI Data Base Project 3</h1>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/edit/:prodid" element={<Edit/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path='/' element={<List/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
