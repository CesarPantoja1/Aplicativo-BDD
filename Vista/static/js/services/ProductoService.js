export default async function putProduct(producto){
    const { productoID, tiendaID } = producto; 

    const response = await fetch(`/updateProducto/${productoID}/${tiendaID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });
    const resData = await response.json();
    if ( !response.ok ){
        throw new Error('Error al actualizar producto');
    }

    return resData;
}