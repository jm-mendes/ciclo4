import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Form, Button, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const EditarEmpresa = () => {

    const params = useParams();
    const [id,setId] = useState(params.id);
    const[nome,setNome] = useState();
    const [dataAdesao,setDataAdesao] = useState();

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const edtEmpresa = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api+"/alterarempresa/"+id,{id, nome, dataAdesao}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Alteração na empresa realizada com sucesso!'
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
        const getEmpresa = async () =>{
            await axios.get(api+"/empresa/"+id)
            .then((response)=>{
                setId(response.data.empresas.id)
                setNome(response.data.empresas.nome)
                setDataAdesao(response.data.empresas.dataAdesao)

                console.log(response.data.empresas.id)
                console.log(response.data.empresas.nome)
                console.log(response.data.empresas.dataAdesao)

            })
            .catch(()=>{
                console.log('Sem conexão com a API.')
            })
        }
        getEmpresa()
    },[id])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Editar Empresa
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to = "/listar-empresas" className="m-auto btn
                        btn-outline-info btn-sm">Empresas</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1"/>
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert>: " " }
                    {status.type === 'success' ? <Alert color ="success">{status.message}</Alert>: " "}
                </div>

                <Form className="p-2" onSubmit={edtEmpresa}>
                    <FormGroup className="p-2">
                        <Label>
                            Id da Empresa
                        </Label>
                        <Input
                            name="id"
                            placeholder="Digite o Id da Empresa"
                            type="text"
                            disabled
                            defaultValue={id}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Nome da Empresa
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Nome da Empresa"
                            type="text"
                            value={nome} onChange={e=> setNome(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Data de Adesão
                        </Label>
                        <Input
                            name="dataAdesao"
                            placeholder="Digite a data da adesão da empresa"
                            type="date"
                            value={dataAdesao} onChange={e=> setDataAdesao(e.target.value)}
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