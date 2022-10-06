import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarEmpresa = () => {

    const [empresa, setEmpresa] = useState({
        nome: '',
        dataAdesao: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setEmpresa({ ...empresa, [e.target.name]: e.target.value })

    const cadEmpresa = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/empresa", empresa, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: 'Empresa cadastrada com sucesso!'
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
                            Cadastrar Empresa
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-empresas" className="m-auto btn
                        btn-outline-info btn-sm">Empresas</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={cadEmpresa}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome da empresa"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Data de Adesão
                        </Label>
                        <Input
                            name="dataAdesao"
                            placeholder="Insira a data de adesão da empresa"
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