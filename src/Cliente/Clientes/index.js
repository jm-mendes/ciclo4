import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"

export const Clientes = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getClientes = async () => {
        
        await axios.get(api + "/clientes")
            .then((response) => {
                console.log('recebendo clientes')
                console.log(response.data.cli)
                setData(response.data.cli)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            })
    };

    const delCliente = async (idCliente) => {
        console.log(idCliente)
        const headers = {
            'Content-type':  'application/json'
        }

        await axios.delete(api+"/excluir-cliente/"+idCliente,
        {headers})
        .then((response)=>{
            console.log(response.data.type);
            console.log(response.data.message);
            getClientes();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API'
            })
        })
    }

    useEffect(() => {
        getClientes();
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
                        <h1>Lista de Clientes</h1>
                    </div>

                    <div className="p-2">
                        <Link to="/cliente" className="btn btn-outline-info btn-sm">Inserir</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Nome
                            </th>
                            <th>
                                Cidade
                            </th>
                            <th>
                                UF
                            </th>
                            <th>
                                Data de nascimento
                            </th>
                            <th>
                                Cliente desde
                            </th>
                            <th>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (

                            <tr key={cli.id}>
                                <th scope="row">
                                    {cli.id}
                                </th>
                                <td>
                                    {cli.nome}
                                </td>
                                <td>
                                    {cli.cidade}
                                </td>
                                <td>
                                    {cli.uf}
                                </td>
                                <td>
                                    {cli.nascimento}
                                </td>
                                <td>
                                    {cli.createdAt}
                                </td>
                                <td>
                                    <Link to ={"/cartaos-cliente/"+cli.id} className="btn btn-outline-info btn-sm">Consultar Cartões</Link>
                                    <Link to ={"/editar-cliente/"+cli.id} className="btn btn-outline-warning btn-sm">Editar Cliente</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delCliente(cli.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}
