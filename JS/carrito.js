/* DOM */
const librosOfrecidos = document.getElementById('librosOfrecidos');
const librosSeleccionados = document.getElementById('librosSeleccionados');
const botonCarrito = document.getElementById("botonCarrito");
const compradelCarrito = document.getElementById("compradelCarrito");
const precioTotal = document.getElementById("precioTotal");
const cerrarCarrito = document.getElementById("cerrarCarrito");

/* Carrito vacio */
let carrito = [];

/* Ejecucion de la funcion mostrarLibros con JSON*/
fetch("../JS/data.json")
    .then(response => response.json())
    .then(data => mostrarLibos(data))

/* mostrarLibos(libros); */



/* Declaracion de la funcion mostrarLibros */
function mostrarLibos(arreglo) {
    librosOfrecidos.innerHTML = '';

    for (const Producto of arreglo) {
        let contenedor = document.createElement("div");
        contenedor.className = "libro";
        contenedor.innerHTML = `
        <div class="contenedorLibros">
        <h3>${Producto.nombre}</h3>
        <img src="${Producto.img}">
        <div>
            <p>${Producto.descripcion}</p>
        </div>
        <p class="precio">$ ${Producto.precio}</p>
        <button id="botonElegir${Producto.id}" class="btn btn-primary">Comprar</button>
        </div>
        
        `
        librosOfrecidos.appendChild(contenedor);

        let botonElegir = document.getElementById(`botonElegir${Producto.id}`)
        botonElegir.addEventListener('click', () => {
            console.log(`Se eligió el Libro ${Producto.nombre}`);

            /* Ejecucion de la funcion agregaralcarrito */
            agregaralcarrito(Producto.id)
        })
    }
};

/* Declaracion de la funcion agregaralcarrito */
function agregaralcarrito(id) {
    let agregar = carrito.find(item => item.id == id)

    if (agregar) {

        agregar.cantidad = agregar.cantidad + 1;
        console.log(agregar.cantidad);
        document.getElementById(`cantidad${agregar.id}`).innerHTML = `<p id=cantidad${agregar.id}> ${agregar.cantidad}</p>`

        actualizarPrecioTotal()

    } else {
        let agregarLibro = libros.find(element => element.id == id);
        carrito.push(agregarLibro);
        actualizarPrecioTotal();

        let librosComprados = document.createElement("librosComprados")
        librosComprados.className = "compra"
        librosComprados.innerHTML = `
        <div class="contenedorLibrosComprados">
        <h3>${agregarLibro.nombre}</h3>
        <img src="${agregarLibro.img}" alt="">
        <div class="textoPaquete">
        Cantidad: <span id=cantidad${agregarLibro.id}>${agregarLibro.cantidad}</span>
        </div>
        <p class="precio">precio por unidad: ${agregarLibro.precio}</p>
        <button id="eliminar${agregarLibro.id}" class="btn btn-primary">Eliminar</button>
        </div>
        `
        compradelCarrito.appendChild(librosComprados);

        let eliminarLibro = document.getElementById(`eliminar${agregarLibro.id}`)

        eliminarLibro.addEventListener('click', () => {
            eliminarLibro.parentElement.remove()
            carrito = carrito.filter(elemento => elemento.id != agregarLibro.id)

            actualizarPrecioTotal()
            localStorage.setItem("ComprasCarritoLibros", JSON.stringify(carrito))
        })

    }

    localStorage.setItem("ComprasCarritoLibros", JSON.stringify(carrito))

}

/* Declaracion funcion actualizarPrecioTotal */
function actualizarPrecioTotal() {
    precioTotal.innerText = carrito.reduce((acumulador, el) => acumulador + (el.precio * el.cantidad), 0)
}

function traerStorage() {
    let Storage = JSON.parse(localStorage.getItem("ComprasCarritoLibros"))

    if (Storage) {
        Storage.forEach(item => {

            for (let i = 0; i < item.cantidad; i++) {

                agregaralcarrito(item.id)
            }

        });
    }
}
traerStorage();

