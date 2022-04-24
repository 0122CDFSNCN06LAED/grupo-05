function editarPerfilDatos() {
  try {
    let html = "";
    let htmlSegmenet = `<div class="contenido-header">
                            <img class="imagen-usuario-config" src="./images/fotos-usuarios/yo.jpg" alt="foto-usuario">
                          </div>
                          <form class="contenedor-editar" action="/configEditarUsuario" method="POST"> 
                              <div class="editar-datos"> 
                                <label class="label-formu" for="nombreUsuario">Nombre</label>
                                <input type="text" name="nombreUsuario" id="nombreUsuario" placeholder="Juan" class="input">
                                <label class="label-formu" for="apellidoUsuario">Apellido</label>
                                <input type="text" name="apellidoUsuario" id="apellidoUsuario" placeholder="Quiroga" class="input">
                                <label class="label-formu" for="mailUsuario">Email</label>
                                <input type="mail" name="mailUsuario" id="mailUsuario" placeholder="Quiroga@hotmail.com" class="input">
                                <label class="label-formu" for="nombreUsuario">Nombre de usuario</label>
                                <input type="text" name="username" id="username" placeholder="juan_quiroga97" class="input">
                              </div>
                              <div class="editar-boton"> 
                                <button class="guardar-boton" type="submit" onclick="epa()">Guardar</button>
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

/* <form class="contenedor-editar" action="/configEditarUsuario" method="POST">
            <div class="editar-datos">
                <input type="text" name="nombreUsuario" id="nombreUsuario">
                <input type="text" name="apellidoUsuario" id="apellidoUsuario"
                    value="<%locals.old && locals.apellidoUsuario%>" placeholder="Quiroga">
                <input type="mail" name="emailUsuario" id="emailUsuario" value="<%locals.old && locals.emailUsuario%>"
                    placeholder="juan@gmail.com">
                <input type="text" name="username" id="username" readonly placeholder="juanQuiroga97">
                <%if(locals.errors && errors.name) {%>
                <p class="feedback"><%errors.name%></p>
                <%}%>
            </div>
            <div class="editar-boton">
                <button class="guardar-boton" type="submit">Guardar</button>
                <button class="boton-cancelar" type="cancel">Cancelar</button>
            </div>
        </form> */

function editarPerfilDescripcion() {
  try {
    let html = "";
    let htmlSegmenet = `<p>Portafolio</p>
                          <form action="/configEditarUsuario" method="POST"> 
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

function epa() {
  try {
    console.log("jij", document.getElementById("nombreUsuario").value);
  } catch (error) {
    console.log(error);
  }
}
