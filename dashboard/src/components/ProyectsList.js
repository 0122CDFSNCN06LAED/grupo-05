import { Component } from "react";

class ProyectsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proyects: [],
            page: 0,
            hasPrevPage: false,
            hasNextPage: false,
        };
    }

    async updateProyects() {
        const response = await fetch(
            `http://localhost:3001/api/proyect?page=${this.state.page}`
        );
        const proyectsData = await response.json();

        this.setState({
            proyects: proyectsData.data,
            hasNextPage: proyectsData.meta.hasNextPage,
            hasPrevPage: proyectsData.meta.hasPrevPage,
        });
    }

    componentDidMount() {
        this.updateProyects();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            this.updateProyects();
        }
    }

    render() {
        return (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Proyects List</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.proyects.map((proyect) => {
                            return (
                                <tr key={proyect.id}>
                                    <th scope="row">{proyect.id}</th>
                                    <td>{proyect.titulo}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary"
                        disabled={!this.state.hasPrevPage}
                        onClick={() => {
                            this.setState({
                                page: this.state.page - 1,
                            });
                        }}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <p className="p-3">Pagina: {this.state.page + 1}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            this.setState({
                                page: this.state.page + 1,
                            });
                        }}
                        disabled={!this.state.hasNextPage}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </>
        );
    }
}

export default ProyectsList;
