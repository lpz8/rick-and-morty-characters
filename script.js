const estado = {
    paginaActual: 1,
    urlAnterior: null,
    urlSiguiente: null
};


function obtenerPersonajes(pagina) {
    fetch("https://rickandmortyapi.com/api/character?page=" + pagina)
        .then(respuesta => respuesta.json())
        .then(datos => {
            
            estado.urlAnterior = datos.info.prev;
            estado.urlSiguiente = datos.info.next;

            
            const botonAnterior = document.getElementById("anterior");
            const botonSiguiente = document.getElementById("siguiente");
            botonAnterior.disabled = !estado.urlAnterior;
            botonSiguiente.disabled = !estado.urlSiguiente;

            
            const contenedor = document.getElementById("contenedor-personajes");
            contenedor.innerHTML = ""; 

            datos.results.forEach(personaje => {
                const divPersonaje = document.createElement("div");
                divPersonaje.className = "personaje";
                
                divPersonaje.innerHTML = "<img src=\"" + personaje.image + "\" alt=\"" + personaje.name + "\">" +
                    "<h3>" + personaje.name + "</h3>" +
                    "<p>Especie: " + personaje.species + "</p>";
                contenedor.appendChild(divPersonaje);
            });
        })
        .catch(error => {
            console.log("Hubo un error al obtener los personajes: " + error);
        });
}


function cambiarPagina(direccion) {
    if (direccion === "anterior" && estado.urlAnterior) {
        estado.paginaActual--;
    } else if (direccion === "siguiente" && estado.urlSiguiente) {
        estado.paginaActual++;
    }
    obtenerPersonajes(estado.paginaActual);
}


const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");

botonAnterior.addEventListener("click", function() {
    cambiarPagina("anterior");
});

botonSiguiente.addEventListener("click", function() {
    cambiarPagina("siguiente");
});


obtenerPersonajes(estado.paginaActual);