import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config"

export const CadastrarPromocao = () => {

    const params = useParams();

    const [promocao, setPromocao] = useState({
        EmpresaId: '',
        nome: '',
        descricao: '',
        validade: ''

    })

    const [EmpresaId] = useState(params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e =>
        setPromocao({ ...promocao, [e.target.name]: e.target.value })

    const cadPromocao = async e => {
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/empresa/"+EmpresaId+"/promocao", promocao, { headers })
            .then((response) => {
                console.log(response.data.message)
                setStatus({
                    type: 'success',
                    message: 'Promoção cadastrada com sucesso!'
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
                            Cadastrar Promoção para Empresa
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/promocaos-empresa/" + EmpresaId} className="m-auto btn
                        btn-outline-info btn-sm">Promoções</Link>
                        <Link to="/listar-empresas" className="m-auto btn
                        btn-outline-info btn-sm">Empresas</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : " "}
                </div>
                <Form className="p-2" onSubmit={cadPromocao}>

                    <FormGroup className="p-2">
                        <Label>
                            Nome da Promoção
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Digite o nome da promoção"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="Digite a descrição da promoção"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>
                            Validade
                        </Label>
                        <Input
                            name="validade"
                            placeholder="Digite a validade da promoção"
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