import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Index from './pages/login' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<Index/>}/>
      </Routes>
    </Router>
  );
}

export default App;
