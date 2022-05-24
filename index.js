// Arrays
const productos = [
    {
        id: 0,
        nombre: "Lampara Luna",
        name_id: "lamparaluna",
        precio: 5000,
        img: "lampara_luna.jpg",
        disponible: true
    },
    {
        id: 1,
        nombre: "Mate de Honda",
        name_id: "mateHonda",
        precio: 1800,
        img: "mate_honda.jpg",
        disponible: true

    },
    {
        id: 2,
        nombre: "Mate de la Snicth de Harry Potter",
        name_id: "mateSnicth",
        precio: 2200,
        img: "mate_snitch.jpg",
        disponible: true
    },
    {
        id: 3,
        nombre: "Lampara Saturno",
        name_id: "lamparaSaturno",
        precio: 5000,
        img: "lampara_saturno.jpg",
        disponible: true
    },
    {
        id: 4,
        nombre: "Llavero personalizado",
        name_id: "llaveroPersonalizado",
        precio: 0,
        img: "llavero_personalizado.jpg",
        disponible: true
    }
]
const zonasDeEnvio = [
    {
        id: 0,
        zona: "Retiro en el local",
        value: "retiro",
        precio: 0
    },
    {
        id: 1,
        zona: "Zona centro",
        value: "centro",
        precio: 200
    },
    {
        id: 2,
        zona: "Zona Kuanip",
        value: "kuanip",
        precio: 150
    },
    {
        id: 3,
        zona: "Zona 640",
        value: "640",
        precio: 350
    },
    {
        id: 4,
        zona: "Zona Andorra",
        value: "andorra",
        precio: 350
    },
    {
        id: 5,
        zona: "Zona barrio Pipo",
        value: "pipo",
        precio: 200
    },
    {
        id: 6,
        zona: "Zona Ecologico",
        value: "ecologico",
        precio: 200
    },
    {
        id: 7,
        zona: "Zona Alem al fondo",
        value: "alemFondo",
        precio: 200
    },
    {
        id: 8,
        zona: "Zona barrio Escondido",
        value: "escondido",
        precio: 200
    },
    {
        id: 9,
        zona: "Zona Los Morros",
        value: "morros",
        precio: 250
    },
    {
        id: 10,
        zona: "Zona Malvinas",
        value: "malvinas",
        precio: 150
    },
    {
        id: 11,
        zona: "Tolhuin",
        value: "tolhuin",
        precio: 0
    },
    {
        id: 11,
        zona: "Rio Grande",
        value: "rioGrande",
        precio: 0
    },
]
const carrito = []
// Variables globales
let compra = " "
let precioEnvio = 0
let botonVaciar = '<div class="d-grid gap-2 d-md-flex justify-content-md-end"><button class="btn btn-carrito btn-warning" id="vacieCarrito" onclick="vaciarCarrito(),cambiarPrecio()">Vaciar carrito</button></div>';

// fin var

// Inicio
let carro = JSON.parse(localStorage.getItem("carrito"))
    if ( carro){
        carro.map(e => { carrito.push(e) })
        console.log(carrito);
        let total = carrito.map(e => {
            return '<p class="carrito-producto">' + e.nombre + ' $' + e.precio + '<button class="btn btn-danger" onclick="eliminarDelCarrito('+ e.index +')">eliminar</button></p>'
        });
        compra = total.join("")
        console.log(total, "total");
        document.getElementById("carrito").innerHTML = compra;
        document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
    }
    
    
    // Productos
    for (let producto of productos) {
        let contenedor = document.createElement("span")
        contenedor.className = "producto"
        contenedor.innerHTML = `<h3>` + producto.nombre + `</h3>` +
                                `<img src="` + producto.img + `" alt="` + producto.img + `">` +
                                `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quaerat nihil doloribus pariatur amet optio aut rem enim ad ipsum ducimus sit adipisci, quae molestiae, provident suscipit, mollitia repellat harum!</p>
                                <h3> Precio: $`+ producto.precio + `</h3>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button onclick="agregarAlCarrito(`+ producto.id + `)" name="` + producto.name_id + `" id="` + producto.name_id + `" class="btn btn-primary">Agregar al carrito :)</button>
                                </div>`
        document.getElementById("productos").append(contenedor)
    }
    // Envios
    for (let zona of zonasDeEnvio) {
        let contenedor = document.createElement("option")
        contenedor.innerHTML = `<option value="` + zona.value + `"  >` + zona.zona + `</option>`
        document.getElementById("envio").append(contenedor)
    
    
    
// Envio
function calcularEnvio() {
    let lugar = document.getElementById("envio").value;
    console.log(lugar);
    let zona = zonasDeEnvio.find(e => e.zona == lugar)
    console.log(zona);
    if (zona?.value == "retiro") {
        let precio = "Genial, te esperamos!:)"
        document.getElementById("costoEnvio").innerHTML = precio;
    }else if (zona?.value == "tolhuin" || zona?.value == "rioGrande") {
        let precio = "Envio por CargasExpress, consultar precio."
        document.getElementById("costoEnvio").innerHTML = precio;
    }else if (zona) {
        precioEnvio= zona.precio
        console.log(precioEnvio);
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  $${zona.precio}`;
    } else {
        let precio = "Zona no válida."
        document.getElementById("costoEnvio").innerHTML = precio;
    }
    
}
//   Precio

function calcularPrecioTotal() {
    let precioTotal
    let suma = 0 + precioEnvio
    let pago = document.getElementById("tipoPago").value;
    if (pago == "efectivo") {
        precio = carrito.reduce((acc, e) => acc + e.precio, 0)
        if (precio){
            suma += precio - (precio * 0.05)
        }
        precioTotal = 'El precio final es: $' + suma
    } else if (pago == "tarjeta") {
        precio = carrito.reduce((acc, e) => acc + e.precio, 0)
        if (precio){
            suma += precio + (precio * 0.10)
        }
        precioTotal = 'El precio final es: $' + suma
        console.log(precioTotal);
    } else {
        precioTotal = ''
    }
    document.getElementById("precioFinal").innerHTML = precioTotal;
}

let cambio = document.getElementById("envio")
cambio.addEventListener("click", calcularPrecioTotal)
let agregoProducto = document.getElementById("productos")
agregoProducto.addEventListener("click", calcularPrecioTotal)
function cambiarPrecio() {
    calcularPrecioTotal()
}
// Carrito

let contador = -1

function agregarAlCarrito(i) {
    contador++
    let producto = productos[i]
    producto.index = contador
    carrito.push(producto);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    console.log(carrito);
    let total = carrito.map(e => {
        return '<p class="carrito-producto">' + e.nombre + ' $' + e.precio +'<button class="btn btn-danger" onclick="eliminarDelCarrito('+ e.index +')">eliminar</button></p>'
    });
    compra = total.join("")
    console.log(total, "total");
    document.getElementById("carrito").innerHTML = compra;
    document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
    
}
function vaciarCarrito(){
    localStorage.removeItem("carrito");
    for(let i = 0; i < carrito.length; i++){
        i--
        carrito.splice(i,1);
        console.log("borre 1 vez");
    }
    console.log(carrito);
    document.getElementById("carrito").innerHTML = "";
    document.getElementById("vacieCarrito").outerHTML = "";
}
let contador1 = -1
function eliminarDelCarrito(id){
    contador--
    contador1++
    console.log(id);
    carrito.splice(id,1)
    if (carrito){
        let carritoSinP = carrito.map(e => {
            e.index = contador1
            return '<p class="carrito-producto">' + e.nombre + ' $' + e.precio +'<button class="btn btn-danger" onclick="eliminarDelCarrito('+e.index+')">eliminar</button></p>'
        });
        let carritoFilter = carritoSinP.join("")
        document.getElementById("carrito").innerHTML = carritoFilter;
        document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
    }else{
        document.getElementById("carrito").innerHTML = "";
        document.getElementById("vacieCarrito").outerHTML = "";
    }

}
}
