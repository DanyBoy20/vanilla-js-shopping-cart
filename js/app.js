// VARIBLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
  // Agregar curso con boton "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);

  // Eliminar curso de carrito
  carrito.addEventListener('click', eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    carritoHTML();
  });


}

//FUNCIONES
function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }

}

function eliminarCurso(e){
  e.preventDefault();
  console.log(e.target.classList);
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');
    // Elimina del arreglo "articulosCarrito[]" por su atributo 'data-id'
    // filtramos el arreglo (sin el cursoID) y lo asignamos a articulosCarrito
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

    //Iteramos sobre nuestro carrito HTML para volver a cargar el carrito
    carritoHTML();

  }
}

// Leer contenido html del elemento donde dimos click y extraer información
function leerDatosCurso(curso){
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };

  // Comprueba si el curso ya esta en el carrito
  // si existe, actualizamos cantidad
  if(articulosCarrito.some( curso => curso.id === infoCurso.id )){
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id){
        curso.cantidad++;
        return curso; // retorna objeto actulizado
      }else{
        return curso; // retorna los objetos que no son duplicados
      }      
    });
    articulosCarrito = [...cursos];
  // si no existe, agregamos el curso al carrito
  }else{
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();

}

// Mostrar el carrito en el DOM
function carritoHTML(){

  // Limpiar el contenedor del carrito
  vaciarCarrito();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach( (curso) => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width=100
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;
    // Agrega el HTML del carrito al TBODY
    contenedorCarrito.appendChild(row);
  } );

}

// Elimina los cursos del tbody
function vaciarCarrito(){
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  // forma rapida
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }

}




