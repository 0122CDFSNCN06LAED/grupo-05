async function getMensajes() {
  let url = "./js/mensajes.json";
  try {
    let res = await fetch(url);
    return await res.json();
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

async function renderMensajes(idUsuario) {
  let mensajes = await getMensajes();
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
      }
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

renderMensajes("1112");
