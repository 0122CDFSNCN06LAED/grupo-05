
import React, { Component } from "react";
import BigCard from "./BigCard"

class LastProyectInDb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyecto: null,
      bgColor: "",
    };
  }

  render() {
    if (!this.state.proyecto) {
      return "Cargando...";
    }
    return (
      <BigCard title="Last proyect in database">
        <h3>{this.state.proyecto.titulo}</h3>
        <div className="text-center">
        </div>
        <p>
          {this.state.proyecto.descripcionDetallada}
        </p>
        <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
          View proyect detail
        </a>
      </BigCard>
    );
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/proyectApiRouter");
    const proyectos = await response.json();
    const proyectosFiltrados = proyectos.data
    let proyectosOrdenados = proyectosFiltrados.sort((o1, o2) => {
      if (o1.fechaCreacion < o2.fechaCreacion) {
        return -1;
      } else if (o1.fechaCreacion > o2.fechaCreacion) {
        return 1;
      } else {
        return 0;
      }
    });
    this.setState({
      proyecto: proyectosOrdenados[proyectosOrdenados.length - 1],
    });
  }
}

export default LastProyectInDb;
/* import BigCard from "./BigCard";

export default function LastProyectInDb() {
  console.log('proyectoss', proyectos)
  return (
    <BigCard title="Last proyect in database">
      <div className="text-center">
        <img
          className="img-fluid px-3 px-sm-4 mt-3 mb-4"
          style={{
            width: "40rem",
          }}
          src=""
          alt=""
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
        consequatur explicabo officia inventore libero veritatis iure voluptate
        reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem
        culpa citationem ratione aperiam voluptatum non corporis ratione aperiam
        voluptatum quae dolorem culpa ratione aperiam voluptatum?
      </p>
      <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
        View proyect detail
      </a>
    </BigCard>
  );
}
 */