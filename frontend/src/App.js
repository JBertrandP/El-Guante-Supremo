import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Index from './pages/index' ;
import Abecedario from './pages/abecedario';
import Diccionario from './pages/diccionario';
import Guante from './pages/guante';
import User from './pages/perfil';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<Index/>}/>
        <Route path='/abecedario' element={<Abecedario/>}/>
        <Route path='/diccionario' element={<Diccionario/>}/>
        <Route path='/guante' element={<Guante/>}/>
        <Route path='/perfil' element={<User/>}/>
      </Routes>
    </Router>
  );
}

export default App;
