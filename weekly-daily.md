# Sprint 4:

## 25/04:

### Hecho

- Revisamos comentarios y separamos tareas pendientes.

### Haciendo:

### Hacer:

- Revisar campos de los JSON.
- Modificiar carpetas: sacar js del frontend y agregar data para JSON en /scr
- Agregar JSON de datos (licitaciones y usuarios), verificar que no rompa nada.
- Crear JSON para usuarios teniendo en cuenta los campos del PDF.
- CRUD de productos:
  - /products. (listado de productos).
  - /products/create. (formulario de creación de productos).
  - /products/:id. (detalle de un producto en particular).
  - /products/ Acción de creación (a donde se envía el formulario).
  - /products/:id/edit (GET,Formulario de edición de productos).
  - /products/:id/ (PUT, acción de edicón a donde se envía el formulario).
  - /products/:id/ (DELETE, acción de edicón en donde se borra el producto).

Entregable: A

### Consultar:

- Tenemos dos index? Una para usuarios y otra para empresas? Por ahora usamos uno solo?

## 02/05:

### Hecho:

-

### Haciendo:

-

### Hacer:

- En register: 
 - Preguntar si es freelancer o empresa.
   - Pedir datos correspondientes al rol.
   
- Si el usuario es empresa:
 - En hamburger menu:
   - mostrar carrito con postulantes.
   - Botón de crear proyecto.
   - listar proyectos creados.
    - una vez que están listados, mostrar botones de edición y eliminación.
 - En index mostrar los mismos proyectos que vería un freelancer.
- Si es freelancer:
  - En hamburger menu:
   - Mostrar proyectos en los que se postuló (Con ícono de clipoard-list).
   - Mostrar proyectos en los que está trabajando.
   - Config: PENDIENTE
## 03/05:

### Hecho:
- Se agregó botón en el login que redirige al register, para que el usuario cree una cuenta en caso de no tener.
- Se dejó fijo qué campos va a tener el objeto de proyecto en proyectos.json.
- Get de proyectos en el index y bidding-list.
- 

### Haciendo:
- Get de proyect-detail.
- Archivo de bidding-routes y bidding-controller.
- Formulario de creación de proyectos que agregue el mismo a proyect.json y rediriga al listado de proyectos creados  (o detalle del proyecto creado) por ese usuario.
- Rutas de edición y eliminación de biddings.

### Hacer:
- En register: Primero preguntar datos básicos y si se va a crear usuario de freelancer o empresa, luego redirigir a página de registro correspondiente y pedir datos correspondientes al rol.
- Cambiar todas las referencias a "bidding" y reemplazarlas por "proyects".
- Hacer header sin hamburger menu para mostrar en register y login.

## 04/05
### Hecho:
- Cambiamos nombres de bidding por proyect.
- js de proyect-controller y proyect-routes.
- Formulario de creación de proyectos que agregue el mismo a proyect.json y rediriga al listado de proyectos creados  (o detalle del proyecto creado) por   ese usuario.
- Formulario de creación de proyectos.
- Get de todos los proyectos.
- Get de detalles de un proyecto.

### Haciendo:
- Get de edición de proyectos.
- Put de edición de proyectos.
- 
### Hacer:
- Permitir editar las categorías en el formulario de edición.
- En register: Primero preguntar datos básicos y si se va a crear usuario de freelancer o empresa, luego redirigir a página de registro correspondiente y   pedir datos correspondientes al rol.
- Hacer header sin hamburger menu para mostrar en register y login.
- Hacer delete de proyect.
- Mostrar bien las etiquetas de categorías en la vista de edit.
