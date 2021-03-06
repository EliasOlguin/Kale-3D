// Arrays
const productos = []
const zonaDeEnvio = []
const carrito = []
// Variables globales
let compra = " "
let precioEnvio = 0
let botonVaciar = `<div class="d-grid gap-2 d-md-flex justify-content-md-end"><button class="btn btn-carrito btn-warning" id="vacieCarrito" onclick="vaciarCarrito(),cambiarPrecio()">Vaciar carrito</button></div>`;
// fin var

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
    async function getProductos(){
        await fetch("./productos.json")
        .then(response=>{
            return response.json();
        })
        .then(jsondata =>
            jsondata.forEach( p =>{
                productos.push(p)
            })
            );
        console.log(productos);
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            console.log(producto);
            let contenedor = document.createElement("span")
            contenedor.className = "producto"
            contenedor.innerHTML = `<div class="contenedor-productos"> <div class="col-6 contenedor-productos2"><img src="assets/${producto.img}" alt="${producto.descripcion}"></div>
            <div class="col-6 contenedor-productos2"> <h3> ${producto.nombre}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quaerat nihil doloribus pariatur amet optio aut rem enim ad ipsum ducimus sit adipisci, quae molestiae, provident suscipit, mollitia repellat harum!</p>
        <h4> Precio: $${producto.precio}</h4>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button onclick="agregarAlCarrito(${producto.id})" id="${producto.id} " class="btn btn-primary" style="margin: auto;">Agregar al carrito :)</button>
        </div>
        </div></div>`
        document.getElementById("productos").append(contenedor)
        }
    }
    console.log(productos);
    getProductos()
    // Envios
    async function getZonaDeEnvios(){
        await fetch("./zonaDeEnvio.json")
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            data.forEach(z=>{
                zonaDeEnvio.push(z)
            })
        })
        console.log(zonaDeEnvio);
        for (let i = 0; i < zonaDeEnvio.length; i++) {
            const zona = zonaDeEnvio[i];
            let contenedor = document.createElement("option")
            contenedor.innerHTML = `<option value="${zona.value}"  >${zona.zona}</option>`
            document.getElementById("envio").append(contenedor)
            
        }
    }
    getZonaDeEnvios()
        
        
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
                let precio = "Zona no v??lida."
                precioEnvio = 0
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
// Fin inicio

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
        title: '??Estas seguro?',
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
            calcularPrecioTotal()
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
            let total = carrito.map(e => {
                return `<p class="carrito-producto"> ${e.nombre} $${e.precio}<button class="btn btn-danger" onclick="eliminarDelCarrito(${e.index})">eliminar</button></p>`
            });
            compra = total.join("")
            console.log(total, "total");
            if ( carrito.length !=0){
                document.getElementById("carrito").innerHTML = compra;
                document.getElementById("vaciarCarrito").innerHTML = botonVaciar;
            }else{
                document.getElementById("carrito").innerHTML = compra;
                document.getElementById("vaciarCarrito").innerHTML = "";
            }
            calcularPrecioTotal()
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
function finalizarCompra(){
    Swal.fire({
        title: 'Quieres finalizar y pagar la compra?',
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: 'Si, comprar!'
    }).then((result) => {
        if(result.value){
            localStorage.removeItem("carrito");
            for(let i = 0; i < carrito.length; i++){
                i--
                carrito.splice(i,1);
                console.log("borre 1 vez");
            }
            console.log(carrito);
            document.getElementById("carrito").innerHTML = "";
            document.getElementById("vacieCarrito").outerHTML = "";
            calcularPrecioTotal()
            
        }
        precio=0
        precioEnvio = 0
        precioTotal = ""
        document.getElementById("precioFinal").innerHTML = precioTotal;
        document.getElementById("costoEnvio").innerHTML = precioTotal;
        document.getElementById("tipoPago").value = "";
        document.getElementById("envio").value = "";
    })
}




