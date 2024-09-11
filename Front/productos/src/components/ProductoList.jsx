import { useEffect,useState } from "react"

const ProductoList = () => {
    const[productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/productos/')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

    return(
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {productos.map((producto) => (
                    <li key={productoid}>
                        <strong> {producto.nombre} </strong>: {producto.descripcion} - ${producto.precio}
                     </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductoList;