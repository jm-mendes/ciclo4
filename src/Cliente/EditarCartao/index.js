import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Form, Button, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const EditarCartao = () => {

    const params = useParams();
    const [id,setId] = useState(params.id);
    const[dataCartao,setDataCartao] = useState();
    const[validade,setValidade] = useState();
    const [ClienteId,setClienteId] = useState();

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const edtCartao = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api+"/alterarcartao/"+id,{id, dataCartao, validade, ClienteId}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Alteração no cartão realizada com sucesso!'
            })
            console.log(response.data.type)
            console.log(response.data.message)
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message:'Erro: não foi possível alterar.'
            })
        })
    }

    useEffect(()=>{
        const getCartao = async () =>{
            await axios.get(api+"/cartao/"+id)
            .then((response)=>{
                setId(response.data.card.id)
                setDataCartao(response.data.card.dataCartao)
                setValidade(response.data.card.validade)
                setClienteId(response.data.card.ClienteId)
                console.log(response.data.card.id)
                console.log(response.data.card.dataCartao)
                console.log(response.data.card.validade)
                console.log(response.data.card.ClienteId)
            })
            .catch(()=>{
                console.log('Sem conexão com a API.')
            })
        }
        getCartao()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Editar Cartão
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/cartaos-cliente/"+ClienteId} className="m-auto btn
                        btn-outline-info btn-sm">Cartões</Link>
                        <Link to="/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1"/>
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert>: " " }
                    {status.type === 'success' ? <Alert color ="success">{status.message}</Alert>: " "}
                </div>

                <Form className="p-2" onSubmit={edtCartao}>
                    <FormGroup className="p-2">
                        <Label>
                            Id do Cartão
                        </Label>
                        <Input
                            name="id"
                            placeholder="Digite o Id do Cartão"
                            type="text"
                            disabled
                            defaultValue={id}
                        />
                    </FormGroup>

                    
                    <FormGroup className="p-2">
                        <Label>
                            Id do Cliente
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="Id do Cliente"
                            type="text"
                            disabled
                            defaultValue={ClienteId}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Data do Cartão
                        </Label>
                        <Input
                            name="dataCartao"
                            placeholder="Data do Cartão"
                            type="date"
                            value={dataCartao} onChange={e=> setDataCartao(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Validade do Cartão
                        </Label>
                        <Input
                            name="dataValidade"
                            placeholder="Digite a validade do Cartão"
                            type="date"
                            value={validade} onChange={e=> setValidade(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="warning">
                            Salvar
                        </Button>
                        <Button type="reset" outline color="info">
                            Limpar
                        </Button>
                    </FormGroup>

                </Form>

            </Container>
        </div>
    )
}