import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { Container } from "reactstrap"
import { api } from "../../config"

export const PromocaosEmpresa = () => {
    const params=useParams()

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [data,setData] = useState([])
    
    const [id] = useState(params.id)

    const getProm = async () => {

        await axios.get(api+"/empresa/"+id+"/promocoes")
        .then((response)=>{
            console.log('recebendo promocoes')
            console.log(response.data.promocoes)
            setData(response.data.promocoes)
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: sem conexão  com a API.'
            })
            console.log("Erro: sem conexão com a API.")})
    }

    const delPromocao = async (idPromocao) => {
        console.log(idPromocao)
        const headers = {
            'Content-type':  'application/json'
        }

        await axios.delete(api+"/excluirpromocao/"+idPromocao,
        {headers})
        .then((response)=>{
            console.log(response.data.type);
            console.log(response.data.message);
            getProm();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se a API'
            })
        })
    }

    useEffect(()=>{
        getProm()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Promoções da Empresa    
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-empresas" className="m-auto btn
                        btn-outline-info btn-sm">Empresas</Link>
                        <Link to={"/promocao/"+id} className="m-auto btn
                        btn-outline-info btn-sm">Inserir Promoção</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Promoção
                            </th>
                            <th>
                                Id da Empresa
                            </th>
                            <th>
                                nome
                            </th>
                            <th>
                                Descrição
                            </th>
                            <th>
                                Validade
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(promocoes => (

                            <tr key={promocoes.id}>
                                <th scope="row">
                                    {promocoes.id}
                                </th>
                                <td>
                                    {promocoes.EmpresaId}
                                </td>
                                <td>
                                    {promocoes.nome}
                                </td>
                                <td>
                                    {promocoes.descricao}
                                </td>
                                <td>
                                    {promocoes.validade}
                                </td>
                                <td>
                                    <Link to ={"/editar-promocao/"+promocoes.id} className="btn btn-outline-warning btn-sm">Editar Promoção</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delPromocao(promocoes.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}