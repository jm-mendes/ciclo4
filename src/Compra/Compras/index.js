import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"

export const Compras = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getCompras = async () => {
        
        await axios.get(api + "/compras")
            .then((response) => {
                console.log('recebendo compras')
                console.log(response.data.comp)
                setData(response.data.comp)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            })
    };

     const delCompra = async (CartaoId, PromocaoId) => {
         console.log(CartaoId)
         console.log(PromocaoId)

         const headers = {
             'Content-type':  'application/json'
         }

         await axios.delete(api+"/cartao/"+CartaoId+"/promocao/"+PromocaoId,
         {headers})
         .then((response)=>{
             console.log(response.data.type);
             console.log(response.data.message);
             getCompras();
         })
         .catch(()=>{
             setStatus({
                 type: 'error',
                 message: 'Erro: não foi possível conectar-se a API'
             })
         })
     }

    useEffect(() => {
        getCompras();
    }, [])

    return (
        <div>
            <Container>

                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger"> {status.message} </Alert> : ""}
                </div>

                <div className="d-flex justify-content-between">
                    <div>
                        <h1>Lista de Compras</h1>
                    </div>

                    <div className="p-2">
                        <Link to="/" className="btn btn-outline-info btn-sm">Home</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Id Cartão
                            </th>
                            <th>
                                Id Promoção
                            </th>
                            <th>
                                Data da Compra
                            </th>
                            <th>
                                Quantidade
                            </th>
                            <th>
                                Valor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(comp => (

                            <tr key={comp.CartaoId}>
                                <th scope="row">
                                    {comp.CartaoId}
                                </th>
                                <td>
                                    {comp.PromocaoId}
                                </td>
                                <td>
                                    {comp.data}
                                </td>
                                <td>
                                    {comp.quantidade}
                                </td>
                                <td>
                                    {comp.valor}
                                </td>

                                <td>
                                    <Link to ={"/editar-compra/cartao/"+comp.CartaoId+"/promocao/"+comp.PromocaoId} className="btn btn-outline-warning btn-sm">Editar Compra</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delCompra(comp.CartaoId, comp.PromocaoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}
