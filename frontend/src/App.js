import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Index from './pages/index' ;
import Abecedario from './pages/abecedario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<Index/>}/>
        <Route path='/abecedario' element={<Abecedario/>}/>
      </Routes>
    </Router>
  );
}

export default App;
