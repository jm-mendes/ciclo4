import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarCompra = () => {

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
    const [PromocaoId] = useState(params.idpromocao);

    const valorInput = e =>
        setCompra({ ...compra, [e.target.name]: e.target.value })

    const cadCompra = async e => {
        e.preventDefault();

        console.log("Cartão ID: ", CartaoId)
        console.log("Promocao ID: ", PromocaoId)

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

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>
                            Cadastrar Compra
                        </h1>
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


                <Form className="p-2" onSubmit={cadCompra}>

                    <FormGroup className="p-2">
                        <Label>
                            Data
                        </Label>
                        <Input
                            name="data"
                            placeholder="Digite a data da compra"
                            type="date"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="Digite a quantidade"
                            type="number"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Valor
                        </Label>
                        <Input
                            name="valor"
                            placeholder="Digite o valor da compra R$"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="info">
                            Cadastrar
                        </Button>
                        <Button type="reset" outline color="warning">
                            Limpar
                        </Button>
                    </FormGroup>

                </Form>
            </Container>
        </div>
    )
}