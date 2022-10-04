import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { Container } from "reactstrap"
import { api } from "../../config"

export const CartaosCliente = () => {
    const params=useParams()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [data,setData] = useState([])
    
    const [id] = useState(params.id)

    const getCart = async () => {

        await axios.get(api+"/cliente/"+id+"/cartoes")
        .then((response)=>{
            console.log('recebendo cartoes')
            console.log(response.data.cartoes)
            setData(response.data.cartoes)
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão com a API.'
            })
            console.log("Erro: sem conexão com a API.")})
    }

    useEffect(()=>{
        getCart()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Cartões do Cliente
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                        <Link to={"/cartao/"+id} className="m-auto btn
                        btn-outline-info btn-sm">Inserir Cartão</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Cartão
                            </th>
                            <th>
                                Id do Cliente
                            </th>
                            <th>
                                Data do Cartão
                            </th>
                            <th>
                                Validade do Cartão
                            </th>
                            <th>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cartoes => (

                            <tr key={cartoes.id}>
                                <th scope="row">
                                    {cartoes.id}
                                </th>
                                <td>
                                    {cartoes.ClienteId}
                                </td>
                                <td>
                                    {cartoes.dataCartao}
                                </td>
                                <td>
                                    {cartoes.validade}
                                </td>
                                <td>
                                    <Link to ={"/editar-cartao/"+cartoes.id} className="btn btn-outline-warning btn-sm">Editar cartão</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}