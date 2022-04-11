async function getCategorias() {
  let url = "./js/categorias.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCatProy() {
  let url = "./js/proyectoCategoria.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getUsuarios() {
  let url = "./js/usuarios.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getUsuariosParticular(usuarioId) {
  let url = "./js/usuarios.json";
  try {
    const proyectos = await fetch(url);
    const data = await proyectos.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].idUsuario == usuarioId) {
        return data[i];
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getNivelUsuario(nivelId) {
  let url = "./js/niveles.json";
  try {
    const proyectos = await fetch(url);
    const data = await proyectos.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].idNivel == nivelId) {
        return data[i];
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getNiveles() {
  let url = "./js/niveles.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderCategorias() {
  let categorias = await getCategorias();
  let html = "";
  for (let index = 0; index < categorias.length; index++) {
    let htmlSegment = `<div class="label-checkbox">
                        <input type="checkbox" name="categoria" value="${categorias[index].idCategoria}" class="cat" id="${categorias[index].idCategoria}">
                        <label for="${categorias[index].idCategoria}">${categorias[index].nombreCategoria}</label>
                        </div>`;

    html += htmlSegment;
  }
  let container = document.querySelector(
    ".filtrado-checkbox-categoria.categoria-scroll"
  );
  container.innerHTML = html;
}

renderCategorias();

async function getProyectos() {
  let url = "./js/proyectos.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

//creo las tarjetas, tanto en recomendados como en el buscador
async function renderProyectos() {
  let proyectos = await getProyectos();
  /* //casteo a date la fecha
  let fechasProyectos = [];
  for (let i = 0; i < proyectos.length; i++) {
    fechasProyectos.push(proyectos[i].fechaProyecto.toString());
  }
  //el tema de la fecha manejarlo en sequelize para traer los más recientes
  const ordenados = bubbleSort([fechasProyectos]);
  if (ordenados[0][3] > ordenados[0][0]) {
    console.log("lelelelle", ordenados[0][3], ordenados[0][2]);
  } else {
    console.log("noono");
  } */
  let html = "";
  for (let index = 0; index < proyectos.length; index++) {
    let categorias = await categoriaProyecto(proyectos[index].idProyecto);
    let categoriaSegment = "";
    categorias.forEach((c) => {
      categoriaSegment += `<p>${c}</p>`;
    });
    let htmlSegment = `<a href="#" class="card hipervinculo">
                            <h5 class="card-header">${proyectos[index].tituloProyecto}</h5>
                            <div class="card-body">
                                <div class="fecha-horario">
                                  <p class="price"> $${proyectos[index].precioProyecto} </p>
                                  <p> ${proyectos[index].fechaProyecto}</p>
                                </div>
                                <p class="card-text">${proyectos[index].descripcionProyecto}</p>
                                <div class="requisitos-recomendados">
                                ${categoriaSegment}
                                </div>
                            </div>
                        </a>`;
    html += htmlSegment;
  }
  let container = document.querySelector(".tarjeta");
  container.innerHTML = html;
  let container1 = document.querySelector(".tarjeta-buscados");
  container1.innerHTML = html;
}

renderProyectos();

//creo las tarjetas cuando ingresa un input el usuario
async function renderProyectosBuscar(
  valorBuscador,
  valorMin,
  valorMax,
  categorias
) {
  let proyectos = await getProyectos();
  let html = "";
  for (let index = 0; index < proyectos.length; index++) {
    let proyectoCategoria = await getCatProy();
    //categorías del proyecto
    let catProy = [];
    for (let j = 0; j < proyectoCategoria.length; j++) {
      if (proyectoCategoria[j].fk_Proyecto == proyectos[index].idProyecto) {
        catProy.push(proyectoCategoria[j].fk_Categoria);
      }
    }
    let contieneCat = false;
    if (categorias.length == 0) {
      contieneCat = true;
    }
    catProy.forEach((cp) => {
      categorias.forEach((c) => {
        if (cp == c) {
          contieneCat = true;
        }
      });
    });
    if (
      (contieneCat == true &&
        proyectos[index].precioProyecto >= valorMin &&
        proyectos[index].precioProyecto <= valorMax &&
        proyectos[index].tituloProyecto
          .toLowerCase()
          .includes(valorBuscador.toLowerCase())) ||
      (proyectos[index].descripcionProyecto
        .toLowerCase()
        .includes(valorBuscador.toLowerCase()) &&
        contieneCat == true &&
        proyectos[index].precioProyecto >= valorMin &&
        proyectos[index].precioProyecto <= valorMax)
    ) {
      let categorias = await categoriaProyecto(proyectos[index].idProyecto);
      let categoriaSegment = "";
      categorias.forEach((c) => {
        categoriaSegment += `<p>${c}</p>`;
      });
      let htmlSegment = `<a href="#" class="card hipervinculo">
                            <h5 class="card-header">${proyectos[index].tituloProyecto}</h5>
                            <div class="card-body">
                                <p class="price"> $${proyectos[index].precioProyecto} </p>
                                <p class="card-text">${proyectos[index].descripcionProyecto}</p>
                                <div class="requisitos-recomendados">
                                ${categoriaSegment}
                                </div>
                            </div>
                        </a>`;
      html += htmlSegment;
    }
  }
  let container1 = document.querySelector(".tarjeta-buscados");
  container1.innerHTML = html;
}

async function renderUsuarioDatos() {
  //datos del usuario
  let usuario = await getUsuariosParticular("1112");
  //nivel del usuario
  let nivel = await getNivelUsuario(usuario.fk_Nivel);
  let htmlSegment = `<a href="/" class="link-logo"><img class="logo" src="./images/logo-icon.png" alt="Logo" /></a>
                      <div class="usuario-datos">
                        <div class="usuario-texto">
                          <p>${usuario.firstName} ${usuario.lastName} </p>
                          <p class="texto-gris">freelancer</p>
                        </div>
                        <img class="imagen-usuario" src=${usuario.profileURL} alt="Imagen Usuario" />
                        <img class="nivel-icon" src="${nivel.nivelUrl}" alt="Icono Nivel" />
                        <div class="dropdown">
                        <img class="configuracion btn btn-secondary dropdown-toggle boton-desplegable" src="./images/config-icon.svg"
                        alt="icono-config" id="dropdownMenuButton1" data-bs-toggle="dropdown" />
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                              <div class="dropdown-item opciones-desplegable">
                                <a class="hipervinculo" href="portfolio">Mi portafolio</a>
                                <a href="portfolio"><i class="fa-solid fa-book"></i></a>
                              </div>
                            </li>
                            <li>
                              <div class="dropdown-item opciones-desplegable">
                                <a class="hipervinculo" href="mailbox">Buzón</a>
                                <a href="mailbox"><img class="config-icon" src="./images/buzon.png" alt="buzón"></i></a>
                              </div>
                            </li>
                            <li>
                              <div class="dropdown-item opciones-desplegable">
                                <a class="hipervinculo" href="config">Configurar cuenta</a>
                                <a href="config"><img class="config-icon" src="./images/config.png" alt="configuración"></i></a>
                              </div>
                            </li>
                            <li>
                              <div class="dropdown-item opciones-desplegable">
                                <a class="hipervinculo" href="login">Cerrar sesión</a>
                                <a href="login"><i class="fa-solid fa-right-from-bracket"></i></a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>`;

  let container = document.querySelector(".header");
  container.innerHTML = htmlSegment;
}
renderUsuarioDatos();

const proyectosPorPrecio = async (precioMin, precioMax, request, response) => {
  const url = "./js/proyectos.json";
  try {
    const proyectos = await fetch(url);
    const data = await proyectos.json();
    data.forEach((proyecto) => {
      if (
        precioMin <= proyecto.precioProyecto &&
        precioMax >= proyecto.precioProyecto
      ) {
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//hacer bien el método fetch mandando por el body o params el precio
proyectosPorPrecio(3000, 12000);

//busca una categoría en específica
const categoriaIndividual = async (idCategor, request, response) => {
  const url = "./js/categorias.json";
  try {
    const proyectos = await fetch(url);
    const data = await proyectos.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].idCategoria == idCategor) {
        let categoria = data[i].nombreCategoria;
        return categoria;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//ANOTACIÓN IMPORTANTE SI QUIERO HACER AWAIT EN UN LOOP USAR FOR OF, NO FOREACH!!!
const categoriaProyecto = async (idProyecto, request, response) => {
  try {
    let Categorias = [];
    let proyCat = await getCatProy();
    for (c of proyCat) {
      if (c.fk_Proyecto == idProyecto) {
        let nombreCat = await categoriaIndividual(c.fk_Categoria);
        Categorias.push(nombreCat);
      }
    }
    return Categorias;
  } catch (error) {
    // console.log("error");
  }
};

/* obtener proyectos filtrados al buscar*/
const proyectosBuscar = async (req, res) => {
  try {
    let proyectos = await getProyectos();
  } catch (error) {}
};

/* events listener */
const clickBoton = async () => {
  let inputValueBuscador = document.getElementById("buscador").value;
  let inputValueMin = document.getElementById("minPrecio").value;
  let inputValueMax = document.getElementById("maxPrecio").value;
  //obtengo las categorías para iterarlas y utilizar el id
  let cat = await getCategorias();
  let catIds = [];
  for (let i = 0; i < cat.length; i++) {
    let check = document.getElementById(cat[i].idCategoria);
    //veo si está con tick el casillero
    if (check.checked == true) {
      catIds.push(cat[i].idCategoria);
    }
  }
  if (inputValueMin == "") {
    inputValueMin = 0;
  }
  if (inputValueMax == "") {
    inputValueMax = 100000;
  }
  await renderProyectosBuscar(
    inputValueBuscador,
    inputValueMin,
    inputValueMax,
    catIds
  );
};
