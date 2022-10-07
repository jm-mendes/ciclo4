import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Alert, Form, Button, Container, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../config";

export const EditarCompra = () => {

    const params = useParams();
    const [CartaoId,setCartaoId] = useState(params.idcartao);
    const [PromocaoId,setPromocaoId] = useState(params.idpromocao);

    const[data,setData] = useState();
    const[quantidade,setQuantidade] = useState();
    const [valor,setValor] = useState();

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const edtCompra = async e => {
        e.preventDefault();
        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api+"/cartao/"+CartaoId+"/promocao/"+PromocaoId,{CartaoId, PromocaoId, data, quantidade, valor}, {headers})
        .then((response)=>{
            setStatus({
                type: 'success',
                message: 'Alteração na compra realizada com sucesso!'
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
        const getCompra = async () =>{
            await axios.get(api+"/cartao/"+CartaoId+"/promocao/"+PromocaoId)
            .then((response)=>{

                setCartaoId(response.data.comp.CartaoId)
                setPromocaoId(response.data.comp.PromocaoId)
                setData(response.data.comp.data)
                setQuantidade(response.data.comp.quantidade)
                setValor(response.data.comp.valor)

                console.log(response.data.comp.CartaoId)
                console.log(response.data.comp.PromocaoId)
                console.log(response.data.comp.data)
                console.log(response.data.comp.quantidade)
                console.log(response.data.comp.valor)

            })
            .catch(()=>{
                console.log('Sem conexão com a API.')
            })
        }
        getCompra()
    },[CartaoId],[PromocaoId])

    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Editar Compra
                        </h1>
                    </div>
                    <div className="p-2">

                        <Link to="/listar-compras" className="m-auto btn
                        btn-outline-info btn-sm">Compras</Link>
                    </div>
                </div>
                <div>
                    <hr className="m-1"/>
                    {status.type === 'error' ? <Alert color="danger">{status.message} </Alert>: " " }
                    {status.type === 'success' ? <Alert color ="success">{status.message}</Alert>: " "}
                </div>

                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>
                            Id do Cartão
                        </Label>
                        <Input
                            name="CartaoId"
                            placeholder="Digite o Id do Cartão"
                            type="text"
                            disabled
                            defaultValue={CartaoId}
                        />
                    </FormGroup>

                    
                    <FormGroup className="p-2">
                        <Label>
                            Id da Promoção
                        </Label>
                        <Input
                            name="PromocaoId"
                            placeholder="Id da Promocao"
                            type="text"
                            disabled
                            defaultValue={PromocaoId}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Data da Compra
                        </Label>
                        <Input
                            name="data"
                            placeholder="Data da Compra"
                            type="date"
                            value={data} onChange={e=> setData(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="Quantidade"
                            placeholder="Digite a quantidade"
                            type="number"
                            value={quantidade} onChange={e=> setQuantidade(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Valor
                        </Label>
                        <Input
                            name="Valor"
                            placeholder="Digite o valor R$:"
                            type="number"
                            value={valor} onChange={e=> setValor(e.target.value)}
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