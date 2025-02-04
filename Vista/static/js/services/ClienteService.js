export async function putClienteInfo(clienteInfo){
    const response = await fetch("/clienteInfo", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteInfo),
    });
    const resData = await response.json();
    if ( !response.ok ){
        throw new Error(resData.error);
    }

    return resData;
}

export async function putClienteMembresia(clienteMembresia){
    const response = await fetch("/clienteMembresia", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteMembresia),
    });
    const resData = await response.json();
    if ( !response.ok ){
        throw new Error(resData.error);
    }

    return resData;
}

export default { putClienteInfo, putClienteMembresia };