import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Form, Button, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const EditarCliente = () => {

    const params = useParams();
    const [id,setId] = useState(params.id);
    const[nome,setNome] = useState();
    const[cidade,setCidade] = useState();
    const [uf,setUf] = useState();
    const [nascimento,setNascimento] = useState();

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const edtCliente = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api+"/alterarcliente/"+id,{id, nome, cidade, uf, nascimento}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Alteração no cliente realizada com sucesso!'
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
        const getCliente = async () =>{
            await axios.get(api+"/cliente/"+id)
            .then((response)=>{
                setId(response.data.clientes.id)
                setNome(response.data.clientes.nome)
                setCidade(response.data.clientes.cidade)
                setUf(response.data.clientes.uf)
                setNascimento(response.data.clientes.nascimento)

                console.log(response.data.clientes.id)
                console.log(response.data.clientes.nome)
                console.log(response.data.clientes.cidade)
                console.log(response.data.clientes.uf)
                console.log(response.data.clientes.nascimento)

            })
            .catch(()=>{
                console.log('Sem conexão com a API.')
            })
        }
        getCliente()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Editar Cliente
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to = "/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1"/>
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert>: " " }
                    {status.type === 'success' ? <Alert color ="success">{status.message}</Alert>: " "}
                </div>

                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className="p-2">
                        <Label>
                            Id do Cliente
                        </Label>
                        <Input
                            name="id"
                            placeholder="Digite o Id do Cliente"
                            type="text"
                            disabled
                            defaultValue={id}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Nome do cliente"
                            type="text"
                            value={nome} onChange={e=> setNome(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Cidade
                        </Label>
                        <Input
                            name="cidade"
                            placeholder="Digite cidade do cliente"
                            type="text"
                            value={cidade} onChange={e=> setCidade(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            UF
                        </Label>
                        <Input
                            name="UF"
                            placeholder="Digite o estado do cliente"
                            type="text"
                            value={uf} onChange={e=> setUf(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Nascimento
                        </Label>
                        <Input
                            name="Nascimento"
                            placeholder="Digite a data de nascimento"
                            type="date"
                            value={nascimento} onChange={e=> setNascimento(e.target.value)}
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