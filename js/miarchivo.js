

  const baseDeDatos = [
      {
          id: 1,
          nombre: 'L001',
          precio: 3255,        
      },
      {
          id: 2,
          nombre: 'L002',
          precio: 6233,         
      },
      {
          id: 3,
          nombre: 'L003',
          precio: 4225,        
      },
      {
        id: 4,
        nombre: 'M001',
        precio: 25342,      
      },
      {
        id: 5,
        nombre: 'M002',
        precio: 32569,     
      },
      {
        id: 6,
        nombre: 'M003',
        precio: 55000,      
    },
    
  ];


let carrito = [];
let total = 0;
//const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;


function calcularTotal() {
  total = 0;                                                      // Limpiamos precio anterior
  carrito.forEach((item) => {                                     // Recorremos el array del carrito
      const miItem = baseDeDatos.filter((itemBaseDatos) => {      // De cada elemento obtenemos su precio      
          return itemBaseDatos.id === parseInt(item);
      });
      total = total + miItem[0].precio;
  });
  
  DOMtotal.textContent = total.toFixed(2);      // Renderizamos el precio en el HTML
}

function vaciarCarrito() {                       // Limpiamos los productos guardados                                    
  carrito = [];                                  // Renderizamos los cambios                                     
  renderizarCarrito();
  calcularTotal();                               // Borra LocalStorage                                         
  miLocalStorage.clear();
}

                                                                        
function anyadirProductoAlCarrito(evento) {          // Anyadimos el Nodo a nuestro carrit
  carrito.push(evento.getAttribute('marcador'))
  console.log(carrito);                             // Calculo el total
  calcularTotal();                                  // Actualizamos el carrito 
  renderizarCarrito();
  guardarCarritoEnLocalStorage();
}


function renderizarCarrito() {    // Vaciamos todo el html
  //DOMcarrito.textContent = '';    
  DOMcarrito.innerHTML = ''; // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)]; // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {  // Obtenemos el item que necesitamos de la variable base de datos
      
      const miItem = baseDeDatos.filter((itemBaseDatos) => {  // ¿Coincide las id? Solo puede existir un caso      
          return itemBaseDatos.id === parseInt(item);  // Cuenta el número de veces que se repite el producto
      });
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {  // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
          return itemId === item ? total += 1 : total;
      }, 0);
      const miNodo = document.createElement('li'); // Creamos el nodo del item del carrito
      miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $ ${miItem[0].precio}`;
      const miBoton = document.createElement('button'); // Boton de borrar
      miBoton.classList.add('btn', 'btn-primary', 'mx-5');
      miBoton.textContent = 'Eliminar';
      miBoton.style.marginLeft = '1rem';
      miBoton.dataset.item = item;
      miBoton.addEventListener('click', borrarItemCarrito);
      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
  });
}



function borrarItemCarrito(evento) {    // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;    // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
  });
  renderizarCarrito();  // volvemos a renderizar
  calcularTotal();  // Calculamos de nuevo el precio
  guardarCarritoEnLocalStorage();
}


function guardarCarritoEnLocalStorage () {
  console.log(JSON.stringify(carrito))
  miLocalStorage.setItem('carrito', JSON.stringify(carrito)); 
}

function cargarCarritoDeLocalStorage () {
  // ¿Existe un carrito previo guardado en LocalStorage?
  if (miLocalStorage.getItem('carrito') !== null) {
      // Carga la información
      carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}

cargarCarritoDeLocalStorage();          
calcularTotal();
renderizarCarrito();



$(document).ready(function(){
  $('.zoom').hover(function() {
      $(this).addClass('transition');
  }, function() {
      $(this).removeClass('transition');
  });

}); 

$(document).ready(function(){
  $('.carritoTexto').hover(function(){
    $('.carritoTexto').hide(5000);
    $('.carritoTexto').show(5000);
  });
});


const urlGet = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
$("#dolar").prepend('<button class="btn btn-primary dolar">Ver cotización Dolar</button>');

$(".dolar").click(() =>{
    $.get(urlGet, function(respuesta, estado){
        
        if(estado == "success"){
            let datos = respuesta;
            
           // for(const dato of datos){
                $("#dolar").prepend(`<div>
                                    <p> Precio de compra:$ ${datos[0].casa.compra}</p>
                                    <p> Precio de Venta:$ ${datos[0].casa.venta}</p>
                                     </div>`)
            //}
        }
    })
}) 









