import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const SelecionarPromocao = () => {

    const params = useParams();

    const [compra, setCompra] = useState({
        CartaoId: '',
        PromocaoId: '',
        data: '',
        quantidade: '',
        valor: ''
    })


    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [CartaoId] = useState(params.idcartao);

    const [PromocaoId] = useState();

    const valorInput = e =>
        setCompra({ ...compra, [e.target.name]: e.target.value })


    const getPromocoes = async () => {
        await axios.get(api + "/empresas/promocoes")
            .then((response) => {
                console.log('recebendo promoções')
                console.log(response.data.promocoes)
                setData(response.data.promocoes)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                console.log("Erro: sem conexão com a API.")
            })
    };

    const cadCompra = async e => {
        e.preventDefault();

        console.log("Cartão ID: ", CartaoId)

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/cartao/" + CartaoId + "/promocao/" + PromocaoId, compra, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: 'Compra cadastrada com sucesso!'
                })
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    }

    useEffect(() => {
        getPromocoes();
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>
                            Cadastrar Compra
                        </h1>
                        <h3>Selecione a promoção: </h3>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compras" className="m-auto btn
                        btn-outline-info btn-sm">Compras</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>


                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Ações
                            </th>
                            <th>
                                Id da Promoção
                            </th>
                            <th>
                                Id da Empresa
                            </th>
                            <th>
                                Nome
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
                                    <Link to={"/inserir-compra/cartao/" + CartaoId +"/promocao/"+ promocoes.id} className="btn btn-outline-secondary btn-sm">Selecionar Promoção</Link>
                                </th>

                                <td scope="row">
                                    {promocoes.id}
                                </td>
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

                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    )
}