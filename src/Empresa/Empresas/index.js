import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Container, Table } from "reactstrap"
import { api } from "../../config"

export const Empresas = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getEmpresas = async () => {
        
        await axios.get(api + "/empresas")
            .then((response) => {
                console.log('recebendo empresas')
                console.log(response.data.emp)
                setData(response.data.emp)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            })
    };

    const delEmpresa = async (idEmpresa) => {
        console.log(idEmpresa)
        const headers = {
            'Content-type':  'application/json'
        }

        await axios.delete(api+"/excluirempresa/"+idEmpresa,
        {headers})
        .then((response)=>{
            console.log(response.data.type);
            console.log(response.data.message);
            getEmpresas();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API'
            })
        })
    }

    useEffect(() => {
        getEmpresas();
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
                        <h1>Lista de Empresas</h1>
                    </div>

                    <div className="p-2">
                        <Link to="/empresa" className="btn btn-outline-info btn-sm">Inserir empresa</Link>
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
                                Data de Adesão
                            </th>
                            <th>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(emp => (

                            <tr key={emp.id}>
                                <th scope="row">
                                    {emp.id}
                                </th>
                                <td>
                                    {emp.nome}
                                </td>
                                <td>
                                    {emp.dataAdesao}
                                </td>
                                <td>
                                    <Link to ={"/promocaos-empresa/"+emp.id} className="btn btn-outline-info btn-sm">Consultar Promoções</Link>
                                    <Link to ={"/editar-empresa/"+emp.id} className="btn btn-outline-info btn-sm">Editar Empresa</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delEmpresa(emp.id)}>Excluir Empresa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}
