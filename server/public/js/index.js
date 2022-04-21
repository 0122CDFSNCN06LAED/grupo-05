/* Index */
async function getCategorias() {
  let url = "./js/categorias.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getMensajes() {
  let url = "./js/mensajes.json";
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

async function getMensajesParticular(mensajeId) {
  let url = "./js/mensajes.json";
  try {
    const proyectos = await fetch(url);
    const data = await proyectos.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].idMensaje == mensajeId) {
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

/* renderCategorias(); */

async function getProyectos() {
  let url = "./js/proyectos.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

function bubbleSort(items) {
  var length = items.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - i - 1; j++) {
      if (items[j] > items[j + 1]) {
        var tmp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = tmp;
      }
    }
  }
  return items;
  console.log(items);
}

//creo las tarjetas, tanto en recomendados como en el buscador
async function renderProyectos() {
  let proyectos = await getProyectos();
  // casteo a date la fecha
  let fechasProyectos = [];
  for (let i = 0; i < proyectos.length; i++) {
    let fecha = proyectos[i].fechaProyecto;
    let fechaPush = new Date(
      fecha.slice(0, 4),
      fecha.slice(5, 6),
      fecha.slice(7, 8)
    );
    fechasProyectos.push(fechaPush);
  }
  let fechasOrdenadas = bubbleSort(fechasProyectos);
  let cantidadProyectoMostrar = fechasOrdenadas.length;
  if (cantidadProyectoMostrar >= 3) {
    cantidadProyectoMostrar = 3;
  }
  console.log(cantidadProyectoMostrar);
  let html = "";
  for (let index = 0; index < cantidadProyectoMostrar; index++) {
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
                                  <p class="fecha"> ${proyectos[index].fechaFormateada}</p>
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

/* renderProyectos(); */

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
                                <div class="fecha-horario">
                                  <p class="price"> $${proyectos[index].precioProyecto} </p>
                                  <p class="fecha"> ${proyectos[index].fechaFormateada}</p>
                                </div>
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
                                <a class="hipervinculo" href="#">Carrito</a>
                                <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
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
                                <a class="hipervinculo" href="config">Ver perfil</a>
                                <a href="config"><img class="config-icon" src="./images/usuario.png" alt="usuario"></i></a>
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
/* renderUsuarioDatos(); */

async function renderMensajes(idUsuario) {
  let mensajes = await getMensajes();
  console.log("aberte", mensajes);
  let msjRem = [];
  let msjDest = [];
  let msjFecha = [];
  for (let i = 0; i < mensajes.length; i++) {
    if (mensajes[i].fk_Remitente == idUsuario) {
      msjRem.push(mensajes[i]);
    }
  }
  let nombreUsuariosRem = [];
  for (let j = 0; j < msjRem.length; j++) {
    let usuario = await getUsuariosParticular(msjRem[j].fk_Destinatario);
    nombreUsuariosRem.push(usuario.username);
  }
  let nombresUnicosRem = nombreUsuariosRem.filter(function (
    item,
    index,
    array
  ) {
    return array.indexOf(item) == index;
  });
  console.log("unicosRem", nombresUnicosRem, "msj", msjRem);

  for (let i = 0; i < mensajes.length; i++) {
    if (mensajes[i].fk_Destinatario == idUsuario) {
      msjDest.push(mensajes[i]);
    }
  }
  let nombreUsuariosDest = [];
  for (let j = 0; j < msjDest.length; j++) {
    let usuario = await getUsuariosParticular(msjDest[j].fk_Remitente);
    nombreUsuariosDest.push(usuario.username);
  }
  let nombresUnicosDest = nombreUsuariosDest.filter(function (
    item,
    index,
    array
  ) {
    return array.indexOf(item) == index;
  });
  console.log("unicosDest", nombresUnicosDest, "msj", msjDest);
  let usuariosTotales = nombresUnicosRem.concat(nombresUnicosDest);
  //vuelvo a aplicar cuales son únicos entre remitentes y destinatarios
  let nombresUnicos = usuariosTotales.filter(function (item, index, array) {
    return array.indexOf(item) == index;
  });
  console.log("nombres Unicos", nombresUnicos);
  let mensajesTotales = msjDest.concat(msjRem);
  console.log("totales", mensajesTotales);
  let html = "";
  let html3 = [];
  let html2 = [];
  let html4 = [];
  let html5 = [];

  //inner del contenedor de los mensajes
  for (let i = 0; i < nombresUnicos.length; i++) {
    let htmlSegment = `<li class="elemento-lista" id="c${i + 1}">
                    <div class="elemento-lista-datos">
                        <img class="imagen-usuario" id="c${
                          i + 1
                        }" src="./images/usuario-icono.jpg" alt="Imagen Usuario" />
                        <a class="contacto" href="#" id="c${i + 1}">
                            <p class="contacto-nombre">${nombresUnicos[i]}</p>
                            <p class="contacto-mensaje" id="men${
                              i + 1
                            }">Hola cómo estás? (último mensaje)</p>
                        </a>
                    </div>
                    <div class="fecha-ultimo-mensaje">
                        <p id="c${i + 1}">12/04/2022</p>
                    </div>
                </li>
                <div class="mensaje-lista" id="m${i + 1}">
                    
                </div>`;
    html += htmlSegment;
  }
  let container = document.querySelector(".contenedor-elemento-lista");
  container.innerHTML = html;

  //ordeno los mensajes
  let IdsMensajes = [];
  for (let j = 0; j < mensajesTotales.length; j++) {
    IdsMensajes.push(mensajesTotales[j].idMensaje);
  }
  let mensajesIdOrdenados = bubbleSort(IdsMensajes);

  //busco cada mensaje (objeto) para ordenarlos e iterarlos más fácilmente
  let mensajesTotalesOrdenados = [];
  for (let i = 0; i < mensajesIdOrdenados.length; i++) {
    mensajesTotalesOrdenados.push(
      await getMensajesParticular(mensajesIdOrdenados[i])
    );
  }
  console.log("kekeke", mensajesTotalesOrdenados);
  let remitentes = [];
  let destinatarios = [];
  for (let i = 0; i < nombresUnicos.length; i++) {
    console.log("uniqueee", nombresUnicos[i]);
    remitentes = [];
    destinatarios = [];
    let usuarioAnterior; //variable utilizada para verificar en el siguiente for que el destinatario sea la misma persona
    for (let j = 0; j < mensajesTotalesOrdenados.length; j++) {
      console.log("que puto mensaje sos", mensajesTotalesOrdenados[j]);
      let usuario = await getUsuariosParticular(
        mensajesTotalesOrdenados[j].fk_Remitente
      );
      let usuarioNo = await getUsuariosParticular(
        mensajesTotalesOrdenados[j].fk_Destinatario
      );
      let usernameNo = usuarioNo.username;
      let username = usuario.username;
      let usuarioParametro = await getUsuariosParticular(idUsuario);
      let usuarioParametroNombre = usuarioParametro.username;
      let htmlSegment3;
      let htmlSegment4;

      /* if (j == 0 && i == 1) {
        console.log(
          "hipppp",
          j,
          mensajesTotalesOrdenados[j].contenidoMensaje,
          username,
          nombresUnicos[i],
          usernameNo,
          usuarioParametroNombre,
          username == nombresUnicos[i],
          usernameNo == usuarioParametroNombre
        );
      } */
      /* 
      if (j >= 1 && i == 1) {
        console.log(
          "hipppp",
          j,
          mensajesTotalesOrdenados[j].contenidoMensaje,
          username,
          nombresUnicos[i],
          usernameNo,
          usuarioParametroNombre,
          username == nombresUnicos[i],
          usernameNo == usuarioParametroNombre
        );
      } */

      if (
        j == 0 &&
        username == nombresUnicos[i] &&
        usernameNo == usuarioParametroNombre
      ) {
        console.log("je1", j, mensajesTotalesOrdenados[j].contenidoMensaje);
        htmlSegment3 = renderAuxDest(mensajesTotalesOrdenados[j]);
        html3 += htmlSegment3;
        usuarioAnterior = username;
        let push = renderAuxRem(mensajesTotalesOrdenados[j]);
        console.log("holaaaaaaaa", push, j);
        remitentes.push(push);
      }
      //guardo los objetos antes, sino no funciona, y no sé por que :(
      let username1;
      let username2;
      if (j >= 1) {
        let e = await getUsuariosParticular(
          mensajesTotalesOrdenados[j - 1].fk_Remitente
        );
        username1 = e.username;
        let e2 = await getUsuariosParticular(
          mensajesTotalesOrdenados[j].fk_Remitente
        );
        username2 = e2.username;
      }
      if (
        j >= 1 &&
        //verifico que no cambie de usuario remitente
        /* username1 == username2 && */
        //verifico que coincidan los remitentes y destinatarios
        username == nombresUnicos[i] &&
        usernameNo == usuarioParametroNombre
      ) {
        console.log("je2", i, mensajesTotalesOrdenados[j].contenidoMensaje);
        console.log("mojonnnn", i, mensajesTotalesOrdenados[j]);
        htmlSegment3 = renderAuxDest(mensajesTotalesOrdenados[j]);
        html3 += htmlSegment3;
        usuarioAnterior = username;
        let push = renderAuxRem(mensajesTotalesOrdenados[j]);
        console.log("holaaaaaaaa", push, j);
        remitentes.push(push);
      }
      /* if (i == 1 && j == 6) {
        console.log(
          "qqqqqqqq",
          mensajesTotalesOrdenados[j].contenidoMensaje,
          "truee",
          username == nombresUnicos[i],
          username,
          nombresUnicos[i],
          usernameNo == usuarioParametroNombre,
          usernameNo,
          usuarioParametroNombre,
          "gordatrolaaaa",
          username1 == username2
        );
      } */
      /* else if (
        j >= 1 &&
        //verifico que coincidan los remitentes y destinatarios
        username == nombresUnicos[i] &&
        usernameNo == usuarioParametroNombre
      ) {
        console.log(
          "je else primero",
          j,
          mensajesTotalesOrdenados[j].contenidoMensaje
        );
        htmlSegment4 = renderAuxDest(mensajesTotalesOrdenados[j]);
        html4 += htmlSegment4;
        usuarioAnterior = username;
      } */
    }
    console.log("remiiiii", remitentes);

    for (let j = 0; j < mensajesTotalesOrdenados.length; j++) {
      let usuario = await getUsuariosParticular(
        mensajesTotalesOrdenados[j].fk_Destinatario
      );
      let usuarioNo = await getUsuariosParticular(
        mensajesTotalesOrdenados[j].fk_Remitente
      );

      let usernameNo = usuarioNo.username;
      let username = usuario.username;
      let usuarioParametro = await getUsuariosParticular(idUsuario);
      let usuarioParametroNombre = usuarioParametro.username;
      let htmlSegment2;
      let htmlSegment5;
      if (j >= 1 && i == 1) {
        console.log(
          "oppppppp",
          j,
          mensajesTotalesOrdenados[j].contenidoMensaje,
          username,
          nombresUnicos[i],
          usernameNo,
          usuarioParametroNombre,
          username == nombresUnicos[i],
          usernameNo == usuarioParametroNombre
        );
      }
      if (
        j == 0 &&
        username == nombresUnicos[i] &&
        usernameNo == usuarioParametroNombre &&
        username == usuarioAnterior
      ) {
        console.log("je3", j, mensajesTotalesOrdenados[j].contenidoMensaje);
        htmlSegment2 = renderAuxRem(mensajesTotalesOrdenados[j]);
        html2 += htmlSegment2;
        let push = renderAuxDest(mensajesTotalesOrdenados[j]);
        destinatarios.push(push);
        console.log("adiosssssssss", push, j);
      }
      //guardo los objetos antes, sino no funciona, y no sé por que :(
      let username1;
      let username2;
      if (j >= 1) {
        let e = await getUsuariosParticular(
          mensajesTotalesOrdenados[j - 1].fk_Remitente
        );
        username1 = e.username;
        let e2 = await getUsuariosParticular(
          mensajesTotalesOrdenados[j].fk_Remitente
        );
        username2 = e2.username;
      } //creo que como ahora está ordenados los msjs no hace falta esto

      if (
        j >= 1 &&
        //verifico que no cambie de usuario remitente
        // username1 == username2 &&
        //verifico que coincidan los remitentes y destinatarios
        username == nombresUnicos[i] &&
        usernameNo == usuarioParametroNombre
      ) {
        console.log("je4", j, mensajesTotalesOrdenados[j].contenidoMensaje);
        htmlSegment2 = renderAuxRem(mensajesTotalesOrdenados[j]);
        html2 += htmlSegment2;
        usuarioAnterior = username;
        let push = renderAuxDest(mensajesTotalesOrdenados[j]);
        destinatarios.push(push);
        console.log("adiosssssssss", push, j);
      } /* else if (
        j >= 1 &&
        //verifico que coincidan los remitentes y destinatarios
        username == nombresUnicos[i] &&
        usernameNo == usuarioParametroNombre
      ) {
        console.log(
          "je else segundo",
          j,
          mensajesTotalesOrdenados[j].contenidoMensaje
        );
        htmlSegment5 = renderAuxRem(mensajesTotalesOrdenados[j]);
        html5 += htmlSegment5;
        usuarioAnterior = username;
      } */
    }
    console.log("unicosssssss", remitentes, "dest", destinatarios);

    let inner = "";
    for (let i = 0; i < remitentes.length; i++) {
      inner += remitentes[i];
    }

    let inner1 = "";
    for (let i = 0; i < destinatarios.length; i++) {
      inner1 += destinatarios[i];
    }

    let container1 = document.querySelector(`#m${i + 1}`);
    console.log("containerrr", container1);
    if (container1 != null) {
      container1.innerHTML = inner + inner1;
    }
    console.log("destiiii", remitentes[0], remitentes[1], remitentes[2], i);
    console.log(
      "remiiii",
      destinatarios[0],
      destinatarios[1],
      destinatarios[2],
      i
    );
  }
}
/* mensajeDesplegar(); */

function renderAuxDest(mensaje) {
  let fecha = mensaje.fechaMensaje;
  let fechaFormat =
    fecha.slice(6, 8) + "/" + fecha.slice(4, 6) + "/" + fecha.slice(0, 4);

  let htmlSegment3 = `<div class="mensaje-contenedor remitente ">
                        <div class="color-rem">
                            <p class="mensaje-unico">${
                              mensaje.contenidoMensaje +
                              "" +
                              mensaje.fk_Remitente +
                              "dest: " +
                              mensaje.fk_Destinatario
                            }</p>
                            <p class="fecha-mensaje">${fechaFormat}</p>
                        </div>
                        </div>`;
  return htmlSegment3;
  /* let htmlSegment3 = `<div class="mensaje-contenedor remitente ">
                        <div class="color-rem">
                            <p class="mensaje-unico">${mensajesTotales[j].contenidoMensaje}</p>
                            <p class="fecha-mensaje">6626</p>
                        </div>
                        </div>`;
  return htmlSegment3; */
}

function renderAuxRem(mensaje) {
  let fecha = mensaje.fechaMensaje;
  let fechaFormat =
    fecha.slice(6, 8) + "/" + fecha.slice(4, 6) + "/" + fecha.slice(0, 4);

  let htmlSegment3 = `<div class="mensaje-contenedor destinatario ">
                        <div class="color-dest">
                            <p class="mensaje-unico">${
                              mensaje.contenidoMensaje +
                              "" +
                              mensaje.fk_Remitente +
                              "dest: " +
                              mensaje.fk_Destinatario
                            }</p>
                            <p class="fecha-mensaje">${fechaFormat}</p>
                        </div>
                        </div>`;
  return htmlSegment3;
}

/* let MsjsOrdenados = bubbleSort(msjDest);
  let nombreUsuarios = [];
  for (let j = 0; j < msjDest.length; j++) {
    let usuario = await getUsuariosParticular(msjDest[j].fk_Destinatario);
    nombreUsuarios.push(usuario.username);
  } */
/* let x = nombreUsuarios;
  let nombresUnicos = x.filter(function (item, index, array) {
    return array.indexOf(item) == index;
  }); */

/* data = [1, 2, 3];
  let datinho = [];
  for (let l = 0; l < data.length; l++) {
    if (data.includes(1) && !datinho.includes(1)) {
      datinho.push(1);
      console.log("leireeeeeee");
    }
  } */
//}
/* for (let i = 0; i < mensajes.length; i++) {
    let nombre = await getUsuariosParticular(mensajes[i].fk_Remitente);
    let htmlSegment = `<li class="elemento-lista" id="c${i + 1}">
                    <div class="elemento-lista-datos">
                        <img class="imagen-usuario" id="c${
                          i + 1
                        }" src="./images/usuario-icono.jpg" alt="Imagen Usuario" />
                        <a class="contacto" href="#" id="c${i + 1}">
                            <p class="contacto-nombre">${
                              nombre.firstName + " " + nombre.lastName
                            }</p>
                            <p class="contacto-mensaje" id="men${i + 1}">${
      mensajes[i].contenidoMensaje
    }</p>
                        </a>
                    </div>
                    <div class="fecha-ultimo-mensaje">
                        <p id="c${i + 1}">12/04/2022</p>
                    </div>
                </li>
                <div class="mensaje-lista" id="m${i + 1}">
                    <div class="mensaje-contenedor remitente ">
                        <div class="color-rem">
                            <p class="mensaje-unico">${
                              mensajes[i].contenidoMensaje
                            }</p>
                            <p class="fecha-mensaje">${
                              mensajes[i].fechaMensaje
                            }</p>
                        </div>
                    </div>
                    <div class="mensaje-contenedor  destinatario">
                        <div class="color-dest">
                            <p class="mensaje-unico">Hola Ricardo me contacto con vos</p>
                            <p class="fecha-mensaje">13/04/2022</p>
                        </div>
                    </div>
                </div>`;
    html += htmlSegment;
  }
  let container = document.querySelector(".contenedor-elemento-lista");
  container.innerHTML = html;
  mensajeDesplegar(); */
renderMensajes("1112");

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
  console.log(inputValueBuscador, inputValueMin, inputValueMax);
  //obtengo las categorías para iterarlas y utilizar el id
  let cat = await getCategorias();
  let catIds = [];
  for (let i = 0; i < cat.length; i++) {
    /* let check = document.getElementById(cat[i].idCategoria); */
    let check = document.getElementById(cat[i].idCategoria);
    console.log("check", check);
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

const viewAll = async () => {
  let proyectos = await getProyectos();
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
                                  <p class="fecha"> ${proyectos[index].fechaFormateada}</p>
                                </div>
                                <p class="card-text">${proyectos[index].descripcionProyecto}</p>
                                <div class="requisitos-recomendados">
                                ${categoriaSegment}
                                </div>
                            </div>
                        </a>`;
    html += htmlSegment;
  }
  let container1 = document.querySelector(".tarjeta-buscados");
  container1.innerHTML = html;
};

/* Mailbox */

//despliegue del chat
function mensajeDesplegar() {
  let li = document.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", myScript);
  }

  let a = document.getElementsByTagName("a");

  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", myScript);
  }

  let p = document.getElementsByTagName("p");

  for (let i = 0; i < p.length; i++) {
    p[i].addEventListener("click", myScript);
  }
}

function myScript(e) {
  id = e.target.attributes.id.value;
  idDesplegable = id.replace("c", "m");
  idMensaje = id.replace("c", "men");

  if (document.getElementById(idDesplegable).style.display == "none") {
    document.getElementById(idDesplegable).style.display = "block";
    document.getElementById(idMensaje).style.display = "none";
  } else {
    document.getElementById(idDesplegable).style.display = "none";
    document.getElementById(idMensaje).style.display = "block";
  }
}

/* config */

function editarPerfilDatos() {
  try {
    let html = "";
    let htmlSegmenet = `<div class="contenido-header">
                          <img class="imagen-usuario-config" src="./images/fotos-usuarios/yo.jpg" alt="foto-usuario">
                        </div>
                        <form class="contenedor-editar" action="/edit"> 
                            <div class="editar-datos"> 
                              <input type="text" name="nombreUsuario" id="nombreUsuario" placeholder="Juan">
                              <input type="text" name="apellidoUsuario" id="apellidoUsuario" placeholder="Quiroga">
                              <input type="mail" name="mailUsuario" id="mailUsuario" placeholder="Juan.Quiroga@mail.com">
                              <input type="text" name="username" id="username" placeholder="@Juan_Quiroga">
                            </div>
                            <div class="editar-boton"> 
                              <button class="guardar-boton" type="submit">Guardar</button>
                              <button class="boton-cancelar" type="cancel">Cancelar</button>
                            </div>
                        </form>`;

    let container = document.querySelector(".editable");
    html += htmlSegmenet;
    container.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function editarPerfilDescripcion() {
  try {
    let html = "";
    let htmlSegmenet = `<p>Portafolio</p>
                        <form action="/editDescripcion"> 
                        <textarea class="textarea-descrip" name="descripcion" id="descripcion" cols="30" rows="10">Modificado Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente recusandae dolores suscipitofficiispariatur rem dolore velit fuga! Autem ducimus maiores minus sunt ullam blanditiis voluptates eos,laborum similique ad sit amet consectetur adipisicing elit. Sapiente recusandae dolores suscipitofficiispariatur rem dolore velit fuga!.</textarea>
                        </form>
                        <div class="editar-boton-descrip"> 
                              <button class="guardar-boton" type="submit">Guardar</button>
                              <button class="boton-cancelar" type="cancel">Cancelar</button>
                        </div>`;
    let container = document.querySelector(".contenedor-descripcion");
    html += htmlSegmenet;
    container.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

/* //subir foto
const image_input = document.querySelector("#image_input");
image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector(
      "#display_image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
}); */
