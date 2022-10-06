import { Link } from "react-router-dom"
import { Container } from "reactstrap"

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="m-auto d-flex">
                    <div className="m-auto p-2">
                        <h1>
                            Página Inicial
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                        <Link to="/listar-empresas" className="m-auto btn
                        btn-outline-primary btn-sm">Empresas</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}