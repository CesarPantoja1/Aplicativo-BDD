export default async function putTienda(tienda) {
    const response = await fetch("/tienda", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tienda),
    });
    const resData = await response.json();
    if ( !response.ok ){
        throw new Error(resData.error);
    }

    return resData;
}