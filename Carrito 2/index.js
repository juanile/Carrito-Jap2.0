window.onload = function() {
    var nombre = prompt("Por favor, ingrese su nombre:");
    var rut = prompt("Por favor, ingrese su RUT:");
    if (nombre === null || nombre === "") {
        nombre = "Consumidor final"; // Establecer "Consumidor final" como valor predeterminado
    }

    // Mostrar el nombre en la página
    var nombreElement = document.createElement("h3");
    nombreElement.textContent = "Hola, " + nombre + ". ¡Bienvenido a ElectroTech!";
    nombreElement.classList.add("text-center", "mt-3"); // Agregar clases Bootstrap para centrar y dar margen superior
    document.body.insertBefore(nombreElement, document.body.firstChild);
};



// Lista de productos con sus datos (puedes modificar estos datos según tus necesidades)
var productos = [
    { id: 1, nombre: "Iphone 15", precio: 35671 },
    { id: 2, nombre: "playstation 5", precio: 21018 },
    { id: 3, nombre: "Tarjeta gráfica RTX 4090", precio: 78565 }
];

// Función para agregar un producto a la tabla
function agregarProducto() {
    var select = document.getElementById("selectProductos");
    var selectedProductId = select.value;

    // Buscamos el producto seleccionado en la lista de productos
    var productoSeleccionado = productos.find(function(producto) {
        return producto.id == selectedProductId;
    });

    if (productoSeleccionado) {
// Agregamos una nueva fila a la tabla con los detalles del producto y campos de entrada para la cantidad
var tabla = document.getElementById("tablaProductos");
var newRow = tabla.insertRow(-1);
var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);
var cell5 = newRow.insertCell(4); // Celda para el botón de eliminar
var cell6 = newRow.insertCell(5); // Celda para el campo de entrada de cantidad

cell1.innerHTML = productoSeleccionado.nombre;
cell2.innerHTML = "$" + productoSeleccionado.precio;


    // Campo de entrada para la cantidad
    var cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.value = 1; // Valor predeterminado
    cantidadInput.min = 1; // Valor mínimo
    cantidadInput.classList.add("form-control");
    cantidadInput.oninput = function() {
        actualizarTotal(newRow, cantidadInput.value);
    };
    cell3.appendChild(cantidadInput);

// Celda para el total
cell4.innerHTML = "$" + productoSeleccionado.precio;

// Botón de eliminar
var eliminarButton = document.createElement("button");
eliminarButton.textContent = "Eliminar";
eliminarButton.classList.add("btn", "btn-danger");
eliminarButton.onclick = function() {
    eliminarFila(newRow);
};
cell5.appendChild(eliminarButton);

// Calculamos el importe total
calcularImporteTotal();
}
function eliminarFila(row) {
    var tabla = document.getElementById("tablaProductos");
    tabla.deleteRow(row.rowIndex);

    // Calculamos el importe total después de eliminar la fila
    calcularImporteTotal();
}


function actualizarTotal(row, cantidad) {
    var precioUnitario = parseFloat(row.cells[1].textContent.replace("$", ""));
    var total = precioUnitario * cantidad;
    row.cells[3].textContent = "$" + total.toFixed(2);

    // Calculamos el importe total después de actualizar el total de la fila
    calcularImporteTotal();
}


// Función para calcular el importe total
function calcularImporteTotal() {
    var tabla = document.getElementById("tablaProductos");
    var rows = tabla.rows;
    var total = 0;

    // Recorremos las filas de la tabla (empezando desde la segunda fila, ya que la primera es el encabezado)
    for (var i = 1; i < rows.length; i++) {
        var precioTotal = parseFloat(rows[i].cells[3].innerHTML.replace("$", ""));
        total += precioTotal;
    }

    // Mostramos el importe total en el elemento HTML
    var importeTotalElement = document.getElementById("importeTotal");
    importeTotalElement.textContent = "$" + total.toFixed(2); // Formateamos el número a 2 decimales
}

}

