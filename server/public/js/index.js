/* alert("hola");
// querySelector
const heading = document.querySelector(".header"); // 0 o 1 elemento
heading.classList.add("nueva-clase");

// querySelectorAll
const enlaces = document.querySelectorAll(".filtrado-precio p");
enlaces[0].textContent = "Nuevo texto";

// getElemenById
const headingId = document.getElementById('heading'); */

const nuevoEnlace = document.createElement("A");
nuevoEnlace.href = "nuevo-enlace.html";
nuevoEnlace.textContent = "Nuevo enlace";
nuevoEnlace.classList.add("requisitos-recomendados");

/* const navegacion = document.querySelector('.navegacion');
navegacion.appendChild(nuevoEnlace); */
