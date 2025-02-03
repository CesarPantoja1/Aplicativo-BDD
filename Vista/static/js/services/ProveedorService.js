export default async function putProveedor(proveedor) {
    const response = await fetch("/proveedor", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedor),
    });

    const resData = await response.json();
    if ( !response.ok ){
        throw new Error(resData.error);
    }

    return resData;
}