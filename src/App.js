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
import { Empresas } from './Empresa/Empresas';
import { CadastrarEmpresa } from './Empresa/CadastrarEmpresa';
import { EditarEmpresa } from './Empresa/EditarEmpresa';
import { PromocaosEmpresa } from './Empresa/PromocaosEmpresa';
import { CadastrarPromocao } from './Empresa/CadastrarPromocao';
import { EditarPromocao } from './Empresa/EditarPromocao';
import { Compras } from './Compra/Compras';
import { SelecionarPromocao } from './Compra/SelecionarPromocao';
import { CadastrarCompra } from './Compra/CadastrarCompra';
import { EditarCompra } from './Compra/EditarCompra';


function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>

        <Route path ='/' element={<Home/>}/>
        <Route path ='/listar-clientes' element={<Clientes/>}/>
        <Route path ='/listar-empresas' element={<Empresas/>}/>

        <Route path ='/cliente' element={<CadastrarCliente/>}/>
        <Route path ='/cartao/:id' element={<CadastrarCartao/>}/>

        <Route path ='/empresa' element={<CadastrarEmpresa/>}/>
        <Route path ='/promocao/:id' element={<CadastrarPromocao/>}/>

        <Route path = '/cartaos-cliente/:id' element={<CartaosCliente/>} />
        <Route path = '/promocaos-empresa/:id' element={<PromocaosEmpresa/>} />

        <Route path = '/editar-cartao/:id' element={<EditarCartao/>} />
        <Route path = '/editar-cliente/:id' element={<EditarCliente/>} />

        <Route path = '/editar-empresa/:id' element={<EditarEmpresa/>} />
        <Route path = '/editar-promocao/:id' element={<EditarPromocao/>} />

        <Route path = '/listar-compras' element={<Compras/>}/>

        <Route path = '/cartao/:idcartao/promocao' element={<SelecionarPromocao/>}/>
        <Route path = '/inserir-compra/cartao/:idcartao/promocao/:idpromocao' element={<CadastrarCompra/>}/>
        <Route path = '/editar-compra/cartao/:idcartao/promocao/:idpromocao' element={<EditarCompra/>}/>

      </Routes>
    </div>
  );
}

export default App;
