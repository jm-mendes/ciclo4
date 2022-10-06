import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Form, Button, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const EditarPromocao = () => {

    const params = useParams();
    const [id,setId] = useState(params.id);
    const[nome,setNome] = useState();
    const[descricao,setDescricao] = useState();
    const[validade,setValidade] = useState();
    const [EmpresaId,setEmpresaId] = useState();

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const edtPromocao = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api+"/alterarpromocao/"+id,{id, nome, descricao, validade, EmpresaId}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Alteração na promoção realizada com sucesso!'
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
        const getPromocao = async () =>{
            await axios.get(api+"/promocao/"+id)
            .then((response)=>{
                setId(response.data.prom.id)
                setNome(response.data.prom.nome)
                setDescricao(response.data.prom.descricao)
                setValidade(response.data.prom.validade)
                setEmpresaId(response.data.prom.EmpresaId)
                console.log(response.data.prom.id)
                console.log(response.data.prom.nome)
                console.log(response.data.prom.descricao)
                console.log(response.data.prom.validade)
                console.log(response.data.prom.EmpresaId)
            })
            .catch(()=>{
                console.log('Sem conexão com a API.')
            })
        }
        getPromocao()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Editar Promoção
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/promocaos-empresa/"+EmpresaId} className="m-auto btn
                        btn-outline-info btn-sm">Promoções</Link>
                        <Link to="/listar-empresas" className="m-auto btn
                        btn-outline-info btn-sm">Empresas</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1"/>
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert>: " " }
                    {status.type === 'success' ? <Alert color ="success">{status.message}</Alert>: " "}
                </div>

                <Form className="p-2" onSubmit={edtPromocao}>
                    <FormGroup className="p-2">
                        <Label>
                            Id da Promoção
                        </Label>
                        <Input
                            name="id"
                            placeholder="Digite o Id da Promoção"
                            type="text"
                            disabled
                            defaultValue={id}
                        />
                    </FormGroup>

                    
                    <FormGroup className="p-2">
                        <Label>
                            Id da Empresa
                        </Label>
                        <Input
                            name="EmpresaId"
                            placeholder="Id da Empresa"
                            type="text"
                            disabled
                            defaultValue={EmpresaId}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Nome da Cartão"
                            type="text"
                            value={nome} onChange={e=> setNome(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="Descrição da Promoção"
                            type="text"
                            value={descricao} onChange={e=> setDescricao(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Validade da Promoção
                        </Label>
                        <Input
                            name="validade"
                            placeholder="Digite a validade da promoção"
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