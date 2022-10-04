import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarCartao = () => {

    const params = useParams();

    const [cartao, setCartao] = useState({
        ClienteId: '',
        dataCartao: '',
        validade: '',
    })

    const [ClienteId] = useState(params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setCartao({ ...cartao, [e.target.name]: e.target.value })

    const cadCartao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/cliente/" + ClienteId + "/cartao", cartao, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: 'Cartão cadastrado com sucesso!'
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
                            Cadastrar Cartão
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/cartaos-cliente/" + ClienteId} className="m-auto btn
                        btn-outline-info btn-sm">Cartões</Link>
                        <Link to="/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={cadCartao}>
                    <FormGroup className="p-2">
                        <Label>
                            Data do Cartão
                        </Label>
                        <Input
                            name="dataCartao"
                            placeholder="Digite a data do cartão"
                            type="date"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Validade do Cartão
                        </Label>
                        <Input
                            name="validade"
                            placeholder="Digite a validade do cartão"
                            type="date"
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