import { Link } from "react-router-dom"
import { Container } from "reactstrap"

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div>
                        <h1>
                            Home
                        </h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className="m-auto btn
                        btn-outline-info btn-sm">Clientes</Link>
                        <Link to="/listar-empresas" className="m-auto btn
                        btn-outline-primary btn-sm">Empresas</Link>
                        <Link to="/listar-compras" className="m-auto btn
                        btn-outline-warning btn-sm">Compras</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}