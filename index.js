// Interfaces
class Productos {
  constructor(id, nombre, precio, descripcion, imagen,disponible) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = imagen;
    this.disponible = disponible
  }
}
class ZonaDeEnvio {
    constructor(id,zona,value,precio){
        this.id = id;
        this.zona = zona;
        this.value = value;
        this.precio = precio;
    }
}

// Arrays
const productos = []
const zonaDeEnvio = []
const carrito = []
// Insertar productos
productos.push(new Productos (0,"Lampara Luna",5000,"lamparaluna","lampara_luna.jpg",true))
productos.push(new Productos (1,"Mate de Honda",1800,"mateHonda","mate_honda.jpg",true))
productos.push(new Productos (2,"Mate de la Snicth de Harry Potter",2200,"mateSnicth","mate_snitch.jpg",true))
productos.push(new Productos (3,"Lampara Saturno",5000,"lamparaSaturno","lampara_saturno.jpg",true))
productos.push(new Productos (4,"Llavero personalizado",500,"llaveroPersonalizado","llavero_personalizado.jpg",true))
productos.push(new Productos (5,"Llavero de la princesa", 500, "Llavero de la princesa", "llavero_princesa.jpg",true));
// Insertar zonas de envio
zonaDeEnvio.push(new ZonaDeEnvio(0,"Retiro en el local","retiro",0))
zonaDeEnvio.push(new ZonaDeEnvio(1,"Zona centro","centro",200))
zonaDeEnvio.push(new ZonaDeEnvio(2,"Zona Kuanip","kuanip",150))
zonaDeEnvio.push(new ZonaDeEnvio(3,"Zona 640","640",350))
zonaDeEnvio.push(new ZonaDeEnvio(4,"Zona Andorra","andorra",350))
zonaDeEnvio.push(new ZonaDeEnvio(5,"Zona barrio Pipo","pipo",200))
zonaDeEnvio.push(new ZonaDeEnvio(6,"Zona Ecologico","ecologico",200))
zonaDeEnvio.push(new ZonaDeEnvio(7,"Zona Alem al fondo","alemFondo",200))
zonaDeEnvio.push(new ZonaDeEnvio(8,"Zona barrio Escondido","escondido",200))
zonaDeEnvio.push(new ZonaDeEnvio(9,"Zona Los Morros","morros",250))
zonaDeEnvio.push(new ZonaDeEnvio(10,"Zona Malvinas","malvinas",150))
zonaDeEnvio.push(new ZonaDeEnvio(11,"Tolhuin","tolhuin",0))
zonaDeEnvio.push(new ZonaDeEnvio(11,"Rio Grande","rioGrande",0))

// Variables globales
let fraseCelebre = ""
let compra = " "
let precioEnvio = 0
let botonVaciar = `<div class="d-grid gap-2 d-md-flex justify-content-md-end"><button class="btn btn-carrito btn-warning" id="vacieCarrito" onclick="vaciarCarrito(),cambiarPrecio()">Vaciar carrito</button></div>`;

// fin var
// Peticiones
// fetch("./productos.json")
// .then(response => response.json())
// .then(data => {
//     productos.push(data)
//     console.log(productos);
//     console.log(data);
// })

fetch("https://ricardofort.herokuapp.com")
.then(response => response.json())
.then(data => { 
    fraseCelebre = data.frase + " By el comandante"
    console.log(data);
    document.getElementById("comandante").innerHTML = fraseCelebre;
})
.catch(e => console.log(e))


// Inicio
    
    // Carrito
    let carro = JSON.parse(localStorage.getItem("carrito"))
    if ( carro){
        carro.map(e => { carrito.push(e) })
        console.log(carrito);
        let total = carrito.map(e => {
            return `<p class="carrito-producto">${e.nombre} $${e.precio}<button class="btn btn-danger" onclick="eliminarDelCarrito(${e.index})">eliminar</button></p>`
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
        contenedor.innerHTML = `<h3> ${producto.nombre}</h3>
        <img src="${producto.img}" alt="${producto.descripcion}">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quaerat nihil doloribus pariatur amet optio aut rem enim ad ipsum ducimus sit adipisci, quae molestiae, provident suscipit, mollitia repellat harum!</p>
        <h3> Precio: $${producto.precio}</h3>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button onclick="agregarAlCarrito(${producto.id})" id="${producto.id} " class="btn btn-primary">Agregar al carrito :)</button>
        </div>`
        document.getElementById("productos").append(contenedor)
    }
    // Envios
    for (let zona of zonaDeEnvio) {
        let contenedor = document.createElement("option")
        contenedor.innerHTML = `<option value="${zona.value}"  >${zona.zona}</option>`
        document.getElementById("envio").append(contenedor)
    }
        
        
        // Envio
        function calcularEnvio() {
            let lugar = document.getElementById("envio").value;
            console.log(lugar);
            let zona = zonaDeEnvio.find(e => e.zona == lugar)
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
        precioTotal = `El precio final es: $${suma}`
    } else if (pago == "tarjeta") {
        precio = carrito.reduce((acc, e) => acc + e.precio, 0)
        if (precio){
            suma += precio + (precio * 0.10)
        }
        precioTotal = `El precio final es: $${suma}`
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
let borroProducto = document.getElementById("carrito")
borroProducto.addEventListener("click", calcularPrecioTotal)
function cambiarPrecio() {
    calcularPrecioTotal()
}
// Carrito

function  agregarAlCarrito(id) {
    let producto = productos[id]
    carrito.push(producto);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    carrito.forEach((e,index)=>{
        e.index = index
    })
    let total = carrito.map(e => {
        return `<p class="carrito-producto"> ${e.nombre} $${e.precio}<button class="btn btn-danger" onclick="eliminarDelCarrito(${e.index})">eliminar</button></p>`
    });
    compra = total.join("")
    console.log(total, "total");
    document.getElementById("carrito").innerHTML = compra;
    document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se agrego al carrito',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1500
      })
}
function vaciarCarrito(){
    Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras recuperar los productos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
        }).then((result) => {
        if (result.value) {

            localStorage.removeItem("carrito");
            for(let i = 0; i < carrito.length; i++){
                i--
                carrito.splice(i,1);
                console.log("borre 1 vez");
            }
            console.log(carrito);
            document.getElementById("carrito").innerHTML = "";
            document.getElementById("vacieCarrito").outerHTML = "";
        }})
        }

function eliminarDelCarrito(id){
    Swal.fire({
        title: 'Estas seguro que quieres eliminarlo del carrito?',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: 'Si, borrarlo!'
    }).then((result) => {
        if (result.value) {
            carrito.splice(id,1);
            localStorage.setItem("carrito",JSON.stringify(carrito));
            console.log(carrito);
            let total = carrito.map((e,index) => {
                return `<p class="carrito-producto"> ${e.nombre} $${e.precio}<button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">eliminar</button></p>`
            });
            compra = total.join("")
            console.log(total, "total");
            if(carrito.length != 0){
                document.getElementById("carrito").innerHTML = compra;
                document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
            }else{
                document.getElementById("carrito").innerHTML = "";
                document.getElementById("vaciarCarrito").innerHTML = "";

            }
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se elimino del carrito',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
              })
        }
    })
}
    // console.log(id);
    // carrito.splice(id,1)
    // carrito.forEach((e,index)=>{
    //     e.index = index
    // })
    // let carritoSinP = carrito.map(e => {
    //     return `<p class="carrito-producto"> ${e.nombre} $${e.precio}<button class="btn btn-danger" onclick="eliminarDelCarrito(${e.index})">eliminar</button></p>`
    // });
    // if (carrito && carrito.length >= 1){
    //     let carritoFilter = carritoSinP.join("")
    //     document.getElementById("carrito").innerHTML = carritoFilter;
    //     document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
    // }else{
    //     document.getElementById("carrito").innerHTML = "";
    //     document.getElementById("vacieCarrito").outerHTML = "";
    // }
    // }

// Escuchar los clicks
// for (let producto of productos){
//     console.log("Escuche", producto.descripcion); 
//     const agregar = document.getElementById(producto.descripcion)
//         agregar.addEventListener("click",agregarAlCarrito(producto.id))
// }




