import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null); 
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [cantidad, setCantidad] = useState('')

  // Función para obtener los productos de la API
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/productos/');
      const data = await response.json();
      setProductos(data);  // Almacenar los productos en el estado
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleProductDetails = (id) => {
    // Cambia el estado para mostrar/ocultar detalles
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/productos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          precio: parseFloat(precio),
          descripcion,
          cantidad: parseInt(cantidad),
        }),
      });

      if (response.ok) {
        fetchProductos(); // Actualizar la lista de productos
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setCantidad('');
      } else {
        console.error('Error al crear producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

 

  // Función para eliminar un producto
 // Función para eliminar un producto
const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/productos/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Filtrar el producto eliminado del estado
      setProductos(productos.filter(producto => producto.id !== id)); 
    } else {
      console.error('Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  
  
  
  // Llamamos a la API cuando el componente se monte
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Productos</h1>

      {/* Formulario para crear un producto */}
      <form onSubmit={crearProducto}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>

      <ul>
        {productos.map((producto) => (
          <li key={producto.id} onClick={() => toggleProductDetails(producto.id)}>
            <span>{producto.nombre}</span> - <span>{producto.precio} USD</span>
            {expandedProductId === producto.id && (
              <div className="product-details">
                <p>Descripción: {producto.descripcion}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;