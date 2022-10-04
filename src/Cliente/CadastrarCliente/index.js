import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        cidade: '',
        uf: '',
        nascimento: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setCliente({ ...cliente, [e.target.name]: e.target.value })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/cliente", cliente, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: 'Cliente cadastrado com sucesso!'
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
                            Cadastrar Cliente
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={cadCliente}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Cidade
                        </Label>
                        <Input
                            name="cidade"
                            placeholder="Digite a cidade do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Estado
                        </Label>
                        <Input
                            name="uf"
                            placeholder="Digite o estado do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Data de nascimento
                        </Label>
                        <Input
                            name="nascimento"
                            placeholder="Digite a data de nascimento do cliente"
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