
const productos =[
    {
        id: 0,
        nombre:"Lampara Luna" ,
        precio: 5000 ,
        img: "lampara_luna.jpg"

    },
    {
        id: 1,
        nombre:"Mate de Honda" ,
        precio: 1800 ,
        img: "mate_honda.jpg"

    },
    {
        id: 2,
        nombre:"Mate de la Snicth de Harry Potter" ,
        precio: 2200 ,
        img: "mate_snitch.jpg"

    }
]
const carrito = []

// function agregarAlCarrito(id) {
    //     let producto = this.productos[id]
    //     console.log(producto);
    //     this.carrito.push(producto)
    //     console.log(carrito);
    // }
// let robot = prompt("Ingrese la palabra 'papaya' para verificar que no es un robot");
// while (robot != "papaya"){
    //     robot = prompt("Ingrese la palabra 'papaya' para verificar que no es un robot");
// }

function calcularEnvio() {
    let lugar = document.getElementById("envio").value;
    console.log(lugar);
    if (lugar == "640"){
        let precio = "$350"
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  ${precio}`;
    }else if (lugar == "centro"){
        let precio = "$200"
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  ${precio}`;
    }else if (lugar == "kuanip"){
        let precio = "$150"
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  ${precio}`;
    }else{
        let precio = "Zona no valida"
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  ${precio}`;
    }
  }

function calcularPrecioTotal(){
    let pago = document.getElementById("tipoPago").value;
    if (pago == "efectivo"){
        let precioTotal = 5000 - (5000  * 0.05)
        document.getElementById("precioFinal").innerHTML = `Precio de final:  $${precioTotal}`;
    }else if (pago == "tarjeta"){
        let precioTotal = 5000 + (5000  * 0.10)
        document.getElementById("precioFinal").innerHTML = `Precio de final:  $${precioTotal}`;
    }else{
        let precioTotal = "Tipo de pago no valido"
        document.getElementById("precioFinal").innerHTML = `Precio de final:  ${precioTotal}`;
    }
}

function agregarAlCarrito() {
    console.log("Se acciono");
}
