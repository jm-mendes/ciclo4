import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Home } from './Home';
import { Clientes } from './Cliente/Clientes';
import { Menu } from './Menu';
import { CadastrarCliente } from './Cliente/CadastrarCliente';
import { CartaosCliente } from './Cliente/CartaosCliente';
import { EditarCartao } from './Cliente/EditarCartao';
import { EditarCliente } from './Cliente/EditarCliente';
import { CadastrarCartao } from './Cliente/CadastrarCartao';


function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>

        <Route path ='/' element={<Home/>}/>
        <Route path ='/listar-clientes' element={<Clientes/>}/>

        <Route path ='/cliente' element={<CadastrarCliente/>}/>
        <Route path ='/cartao/:id' element={<CadastrarCartao/>}/>

        <Route path = '/cartaos-cliente/:id' element={<CartaosCliente/>} />

        <Route path = '/editar-cartao/:id' element={<EditarCartao/>} />
        <Route path = '/editar-cliente/:id' element={<EditarCliente/>} />

      </Routes>
    </div>
  );
}

export default App;
