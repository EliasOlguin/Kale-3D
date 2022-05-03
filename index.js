

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
let compra = " "
const carrito = []
let precioEnvio = 0

function calcularEnvio() {
    let lugar = document.getElementById("envio").value;
    console.log(lugar);
    if (lugar == "640"){
        let precio = 350
        precioEnvio = precio
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  $${precio}`;
    }else if (lugar == "centro"){
        let precio = 200
        precioEnvio = precio
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  $${precio}`;
    }else if (lugar == "kuanip"){
        let precio = 150
        precioEnvio = precio
        document.getElementById("costoEnvio").innerHTML = `Costo de envio:  $${precio}`;
    }else{
        let precio = "Zona no válida."
        document.getElementById("costoEnvio").innerHTML = precio;
    }
    
  }

function calcularPrecioTotal(){
    let precioTotal
    let suma = 0 + precioEnvio
    let pago = document.getElementById("tipoPago").value;
    if (pago == "efectivo"){
        carrito.map(e => {
            let precio = e.precio
            let descuento = precio - (precio  * 0.05);
            suma = suma + descuento;
        })
        precioTotal = '<p>'+'El precio final es: $'+ suma +'</p>';
    }else if (pago == "tarjeta"){
        carrito.map(e => {
            let precio = e.precio
            let descuento = precio + (precio  * 0.10);
            suma = suma + descuento;
            console.log(suma);
        })
        precioTotal = '<p>'+'El precio final es: $'+ suma +'</p>';
    }else{
        precioTotal = '<p>'+'Ingrese un tipo de pago válido.'+'</p>';
    }
    document.getElementById("precioFinal").innerHTML = precioTotal;

}

function agregarAlCarrito(i) {
    let producto = productos[i] 
    carrito.push(producto);
    console.log(carrito);
    let total = carrito.map(e => {
        return '<p>'+e.nombre +' $'+e.precio+'</p>'
    });
    compra = total.join("")
    console.log(total, "total" );
    document.getElementById("carrito").innerHTML = compra;
    
}
