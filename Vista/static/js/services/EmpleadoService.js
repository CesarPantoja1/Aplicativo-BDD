export async function putEmpleadoInfo(empleadoInfo){
    const response = await fetch("/empleadoInfo", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadoInfo),
    });
    const resData = await response.json();
    if ( !response.ok ){
        throw new Error(resData.error);
    }

    return resData;
}

export async function putEmpleadoLaboral(empleadolaboral){
    const response = await fetch("/empleadoLaboral", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadolaboral),
    });
    const resData = await response.json();
    if ( !response.ok ){
        throw new Error(resData.error);
    }

    return resData;
}

export default { putEmpleadoInfo, putEmpleadoLaboral };