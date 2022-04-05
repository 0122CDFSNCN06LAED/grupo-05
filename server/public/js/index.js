async function getCategorias() {
  let url = "./js/categorias.json";
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
  categorias.forEach((categoria) => {
    let htmlSegment = `<div class="label-checkbox">
                        <input type="checkbox" name="${categoria.nombreCategoria}" value="${categoria.idCategoria}" />
                        <label for="${categoria.idCategoria}">${categoria.nombreCategoria}</label>
                        </div>`;

    html += htmlSegment;
  });

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
  let html = "";
  for (let index = 0; index < proyectos.length; index++) {
    let categorias = await categoriaProyecto(proyectos[index].idProyecto);
    let categoriaSegment = "";
    categorias.forEach((c) => {
      categoriaSegment += `<p>${c}</p>`;
    });
    console.log(categoriaSegment);
    let htmlSegment = `<div class="card">
                            <h5 class="card-header">${proyectos[index].tituloProyecto}</h5>
                            <div class="card-body">
                                <p class="card-text">${proyectos[index].descripcionProyecto}</p>
                                <div class="requisitos-recomendados">
                                ${categoriaSegment}
                                </div>
                            </div>
                        </div>`;
    html += htmlSegment;
  }
  let container = document.querySelector(".tarjeta");
  container.innerHTML = html;
  let container1 = document.querySelector(".tarjeta-buscados");
  container1.innerHTML = html;
  console.log("container", container);
}

renderProyectos();

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
        console.log(proyecto.tituloProyecto);
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
        console.log(nombreCat);
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

async function getCatProy() {
  let url = "./js/proyectoCategoria.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
