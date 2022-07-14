import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Personagem from './componentes/telas/personagem/Personagem'
import Arma from './componentes/telas/arma/Arma'
import FunUtiliza from './componentes/telas/utiliza/Utiliza'

function App() {
  return (
    <Router>
        <Menu/>
        <Routes>
          <Route exact="true" path="/" element={<Home/>}/>
          <Route exact="true" path="/personagem" element={<Personagem/>}/>
          <Route exact="true" path="/arma" element={<Arma/>}/>
          <Route exact="true" path="/utiliza" element={<FunUtiliza/>}/>
        </Routes>
    </Router>
  );
}

export default App;