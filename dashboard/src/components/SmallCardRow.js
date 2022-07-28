/* import SmallCard from "./SmallCard";

const statistics = [
    {
        title: "Proyects in database",
        value: 21,
        icon: "fa-film",
        color: "primary",
    },
    {
        title: "Total empresas",
        value: 79,
        icon: "fa-award",
        color: "success",
    },
    {
        title: "freelancers quantity",
        value: 49,
        icon: "fa-user",
        color: "warning",
    },
];

function SmallCardRow() {
    return (
        <div className="row">
            {statistics.map((stat) => {
                console.log('stat', stat)
                return <SmallCard key={stat.title} {...stat} />;
            })}
        </div>
    );
}

export default SmallCardRow; */

import SmallCard from "./SmallCard";
import React, { Component } from "react";

class SmallCardRow extends Component {

    statistics = [
        {
            title: "Proyectos en la base de datos",
            value: null,
            icon: "fa-film",
            color: "primary",
        },
        {
            title: "Total empresas",
            value: null,
            icon: "fa-award",
            color: "success",
        },
        {
            title: "Total Freelancers",
            value: null,
            icon: "fa-user",
            color: "warning",
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            proyectosCant: null,
            bgColor: "",
        };
    }

    render() {
        if (!this.state.proyectosCant) {
            return "Cargando...";
        }
        return (
            <div className="row">
                {this.statistics.map((stat) => {
                    return <SmallCard key={stat.title} {...stat} />;
                })}
            </div>
        );
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:3000/api/proyectApiRouter");
        const proyectos = await response.json();
        this.statistics[0].value = proyectos.meta.total
        const response1 = await fetch("http://localhost:3000/api/userApiRouter");
        const usuariosSinFiltrar = await response1.json();
        const users = usuariosSinFiltrar.data
        let usuariosEmpresa = 0;
        let usuariosFreelancer = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].tipoUsuarioId === 1) {
                usuariosEmpresa = usuariosEmpresa + 1
            } else if (users[i].tipoUsuarioId === 2) {
                usuariosFreelancer = usuariosFreelancer + 1
            }
        }
        this.statistics[1].value = usuariosEmpresa
        this.statistics[2].value = usuariosFreelancer
        this.setState({
            proyectosCant: proyectos.meta.total,
        });
    }
}

export default SmallCardRow;


