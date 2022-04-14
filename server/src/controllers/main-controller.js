const proyects = [
  {
    idProyecto: "1111",
    tituloProyecto: "Mantenimiento web",
    descripcionProyecto: "Se busca persona para mantener una página web",
    precioProyecto: 2000,
    fechaProyecto: "01-02-2022",
  },
  {
    idProyecto: "1112",
    tituloProyecto: "Desarrollador Backend",
    descripcionProyecto: "Se busca desarrollador backend para proyecto interesante",
    precioProyecto: 6000,
    fechaProyecto: "16-03-2022",
  },
  {
    idProyecto: "1113",
    tituloProyecto: "Desarrollador Frontend",
    descripcionProyecto: "Se busca desarrollador frontend para proyecto interesante",
    precioProyecto: 10000,
    fechaProyecto: "29-02-2022",
  },
  {
    idProyecto: "1114",
    tituloProyecto: "Rebranding logo",
    descripcionProyecto: "Se busca persona para realizar rebranding de logo",
    precioProyecto: 12000,
    fechaProyecto: "01-03-2022",
  },
];

module.exports = {
  index: (req, res) => {
    res.render("index", {
      proyects: proyects,
    });
  },
  register: (req, res) => {
    res.render("register");
  },
  ejemplo: (req, res) => {
    res.render("ejemplo");
  },
  biddingDetail,
};
