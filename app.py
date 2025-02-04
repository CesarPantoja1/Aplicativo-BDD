from flask import Flask, render_template, request, jsonify, url_for, flash, redirect, session
from Modelo.database import dbQuito, ClienteMembresia, EmpleadoLaboral, Producto, Proveedor, Factura, DetalleFactura, Tienda, EmpleadoInfo, ClienteInfo, ClienteGeneral, EmpleadoGeneral
from datetime import date




app = Flask(__name__, template_folder='Vista/templates', static_folder='Vista/static')
app.secret_key = "supersecretkey"

app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:P%40ssw0rd@26.236.136.95/Quito?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

dbQuito.init_app(app)

@app.route("/")
def ingreso():
    return render_template("ingreso.html")  

@app.route("/guardar", methods=["POST"])
def guardar():
    print("¡Ruta /guardar activada!")
    tienda = request.form.get("nombre_tienda")
    if tienda == "QUITO" or tienda == "CUMBAYA":
        session["tienda"] = tienda  
        return render_template("home.html", usuario=tienda)  
    else:
        return render_template("ingreso.html") 

@app.route("/home")
def home():
    tienda = session.get("tienda")
    if not tienda:
        return redirect(url_for("ingreso"))
    return render_template("home.html", usuario=tienda)


@app.route("/clientesRegistro")
def clientesRegistro():
    return render_template("clientes.html")  

@app.route("/clientesInfo")
def clientesInfo():
    return render_template("clientesInfo.html")  

@app.route("/compra")
def compra():
    return render_template("compra.html")  

@app.route("/clientesMembresia")
def clientesMembresia():
    tienda = session.get("tienda") 
    if not tienda:
        return redirect(url_for("ingreso"))
    
    clientesMembresia = ClienteMembresia.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return render_template("clientesMembresia.html", clientesMembresia=clientesMembresia) 

@app.route("/register")
def register():
    return render_template("register.html")  

@app.route("/empleados")
def empleadoRegistro():
    return render_template("empleados.html") 

@app.route("/empleadosInfo")
def empleadosInfo():
    return render_template("empleadosInfo.html") 

@app.route("/empleadosLaboral")
def empleadoLaboral():
    tienda = session.get("tienda")  
    if not tienda:
        return redirect(url_for("ingreso"))

    empleadosLaboral = EmpleadoLaboral.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return render_template("empleadosLaboral.html", empleadosLaboral=empleadosLaboral) 

@app.route("/productoRegistro")
def productoRegistro():
    return render_template("productoRegistro.html")   

@app.route("/producto")
def producto():
    return render_template("producto.html")   

@app.route("/proveedorRegistro")
def proveedorRegistro():
    return render_template("proveedorRegistro.html")   

@app.route("/proveedor")
def proveedor():
    tienda = session.get("tienda")  
    if not tienda:
        return redirect(url_for("ingreso"))

    proveedores = Proveedor.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return render_template("proveedor.html", proveedores=proveedores)  

@app.route("/factura")
def factura():
    tienda = session.get("tienda")  
    if not tienda:
        return redirect(url_for("ingreso"))

    facturas = Factura.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return render_template("factura.html", facturas=facturas)  

@app.route("/detalleFactura")
def detalleFactura():
    tienda = session.get("tienda")  
    if not tienda:
        return redirect(url_for("ingreso"))

    detallesFactura = DetalleFactura.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return render_template("detalleFactura.html", detallesFactura=detallesFactura) 

@app.route("/tienda")
def tienda():
    tiendas = Tienda.query.all()
    return render_template("tienda.html", tiendas=tiendas) 

@app.route("/getClienteInfo", methods=["GET"])
def api_clienteInfo():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    clientesInfo = ClienteInfo.query.all()
    return jsonify([clienteInfo.to_dict() for clienteInfo in clientesInfo])



@app.route("/deleteClienteInfo/<int:clienteID>", methods=["DELETE"])
def delete_clienteInfo(clienteID):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    clienteInfo = ClienteInfo.query.filter_by(clienteID=clienteID).first()
    
    if clienteInfo:
        dbQuito.session.delete(clienteInfo)
        dbQuito.session.commit()
        return jsonify({"message": "Cliente eliminado correctamente"}), 200
    else:
        return jsonify({"error": "Cliente no encontrado"}), 404

@app.route("/getClienteMembresia", methods=["GET"])
def api_clienteMembresia():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    clientesMembresia = ClienteMembresia.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([clienteMembresia.to_dict() for clienteMembresia in clientesMembresia])



@app.route("/deleteClienteMembresia/<int:clienteID>/<int:tiendaID>", methods=["DELETE"])
def delete_clienteMembresia(clienteID, tiendaID):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    clienteMembresia = ClienteMembresia.query.filter_by(clienteID=clienteID, tiendaID=tiendaID).first()
    
    if clienteMembresia:
        dbQuito.session.delete(clienteMembresia)
        dbQuito.session.commit()
        return jsonify({"message": "Cliente eliminado correctamente"}), 200
    else:
        return jsonify({"error": "Cliente no encontrado"}), 404

@app.route("/getEmpleadoInfo", methods=["GET"])
def api_empleadoInfo():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    empleadosInfo = EmpleadoInfo.query.all()
    return jsonify([empleadoInfo.to_dict() for empleadoInfo in empleadosInfo])



@app.route("/deleteEmpleadoInfo/<int:empleadoID>", methods=["DELETE"])
def delete_empleadoInfo(empleadoID):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    empleadoInfo = EmpleadoInfo.query.filter_by(empleadoID=empleadoID).first()
    
    if empleadoInfo:
        dbQuito.session.delete(empleadoInfo)
        dbQuito.session.commit()
        return jsonify({"message": "Empleado eliminado correctamente"}), 200
    else:
        return jsonify({"error": "Empleado no encontrado"}), 404

@app.route("/getEmpleadoLaboral", methods=["GET"])
def api_empleadoLaboral():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    empleadosLaboral = EmpleadoLaboral.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([empleadoLaboral.to_dict() for empleadoLaboral in empleadosLaboral])



@app.route("/deleteEmpleadoLaboral/<int:empleadoID>/<int:tiendaID>", methods=["DELETE"])
def delete_empleadoLaboral(empleadoID, tiendaID):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    empleadoLaboral = EmpleadoLaboral.query.filter_by(empleadoID=empleadoID, tiendaID=tiendaID).first()
    
    if empleadoLaboral:
        dbQuito.session.delete(empleadoLaboral)
        dbQuito.session.commit()
        return jsonify({"message": "Cliente eliminado correctamente"}), 200
    else:
        return jsonify({"error": "Cliente no encontrado"}), 404


@app.route("/getProductos", methods=["GET"])
def api_productos():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    productos = Producto.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([producto.to_dict() for producto in productos])



@app.route("/deleteProducto/<int:productoID>/<int:tiendaID>", methods=["DELETE"])
def delete_producto(productoID, tiendaID):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    producto = Producto.query.filter_by(productoID=productoID, tiendaID=tiendaID).first()
    
    if producto:
        dbQuito.session.delete(producto)
        dbQuito.session.commit()
        return jsonify({"message": "Producto eliminado correctamente"}), 200
    else:
        return jsonify({"error": "Producto no encontrado"}), 404

@app.route("/getProveedores", methods=["GET"])
def api_proveedores():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    proveedores = Proveedor.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([proveedor.to_dict() for proveedor in proveedores])



@app.route("/deleteProveedor/<int:proveedorID>/<int:tiendaID>", methods=["DELETE"])
def delete_proveedor(proveedorID, tiendaID):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    proveedor = Proveedor.query.filter_by(proveedorID=proveedorID, tiendaID=tiendaID).first()
    
    if proveedor:
        dbQuito.session.delete(proveedor)
        dbQuito.session.commit()
        return jsonify({"message": "Proveedor eliminado correctamente"}), 200
    else:
        return jsonify({"error": "Proveedor no encontrado"}), 404


@app.route("/api/facturas", methods=["GET"])
def api_facturas():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    facturas = Factura.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([factura.to_dict() for factura in facturas])


@app.route("/api/factura/<int:facturaID>", methods=["GET"])
def api_factura_detalle(facturaID):
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    factura = Factura.query.filter_by(facturaID=facturaID, tiendaID=1 if tienda == "QUITO" else 2).first()
    if not factura:
        return jsonify({"error": "Factura no encontrada"}), 404

    detalles_factura = DetalleFactura.query.filter_by(facturaID=facturaID, tiendaID=factura.tiendaID).all()
    
    detalles = []
    for detalle in detalles_factura:
        producto = Producto.query.filter_by(productoID=detalle.productoID, tiendaID=factura.tiendaID).first()
        detalles.append({
            "productoID": detalle.productoID,
            "nombreProducto": producto.nombreProducto if producto else "Producto Desconocido",
            "cantidad": detalle.cantidad,
            "precio": detalle.precio
        })

    cliente = ClienteGeneral.query.filter_by(clienteID=factura.clienteID, tiendaID=factura.tiendaID).first()
    empleado = EmpleadoInfo.query.filter_by(empleadoID=factura.empleadoID).first()

    return jsonify({
        "factura": factura.to_dict(),
        "cliente": cliente.to_dict() if cliente else None,
        "empleado": empleado.to_dict() if empleado else None,
        "detalles": detalles 
    })





@app.route("/insertCliente", methods=["POST"])
def insert_cliente():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    data = request.json 

    try:
        nuevo_cliente = ClienteGeneral(
            clienteID=data.get("clienteID"),
            tiendaID=data.get("tiendaID"),
            nombreCliente=data.get("nombreCliente"),
            telefono=data.get("telefono"),
            ciudad=data.get("ciudad"),
            tipoMembresia=data.get("tipoMembresia"),
            estado=data.get("estado"),
            puntos=data.get("puntos")
        )
        dbQuito.session.add(nuevo_cliente)
        dbQuito.session.commit()

        return jsonify({"message": "Cliente registrado con éxito"}), 201

    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    
@app.route("/insertEmpleado", methods=["POST"])
def insert_empleado():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    data = request.json 

    try:
        nuevo_empleado = EmpleadoGeneral(
            empleadoID=data.get("empleadoID"),
            tiendaID=data.get("tiendaID"),
            nombreEmp=data.get("nombreEmp"),
            telefono=data.get("telefono"),
            correo=data.get("correo"),
            salario=data.get("salario"),
            cargo=data.get("cargo"),
            fechaIngreso=data.get("fechaIngreso")
        )
        dbQuito.session.add(nuevo_empleado)
        dbQuito.session.commit()

        return jsonify({"message": "Empleado registrado con éxito"}), 201

    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/insertProducto", methods=["POST"])
def insert_producto():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    data = request.json 

    try:
        nuevo_producto = Producto(
            productoID=data.get("productoID"),
            tiendaID=data.get("tiendaID"),
            proveedorID=data.get("proveedorID"),
            nombreProducto=data.get("nombreProducto"),
            precioProducto=data.get("precioProducto"),
            stockProducto=data.get("stockProducto"),
        )
        dbQuito.session.add(nuevo_producto)
        dbQuito.session.commit()

        return jsonify({"message": "Producto registrado con éxito"}), 201

    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/insertProveedor", methods=["POST"])
def insert_proveedor():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    data = request.json 

    try:
        nuevo_proveedor = Proveedor(
            proveedorID=data.get("proveedorID"),
            tiendaID=data.get("tiendaID"),
            nombreProveedor=data.get("nombreProveedor"),
            ciudad=data.get("ciudad"),
            telefono=data.get("telefono"),
        )
        dbQuito.session.add(nuevo_proveedor)
        dbQuito.session.commit()

        return jsonify({"message": "Proveedor registrado con éxito"}), 201

    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500


## UPDATE (PUT)
@app.route("/productos", methods=["PUT"])
def update_producto():
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    data = request.json
    producto_id = data.get("productoID")
    tienda_id = data.get("tiendaID")
    if not producto_id or not tienda_id:
        return jsonify({"error": "Falta productoID o tiendaID"}), 400
    
    producto = Producto.query.filter_by(productoID=producto_id, tiendaID=tienda_id).first()

    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    try:
        producto.proveedorID = data.get("proveedorID", producto.proveedorID)
        producto.nombreProducto = data.get("nombreProducto", producto.nombreProducto)
        producto.precioProducto = data.get("precioProducto", producto.precioProducto)
        producto.stockProducto = data.get("stockProducto", producto.stockProducto)
        dbQuito.session.commit()
        return jsonify({"message": "Producto actualizado con éxito"}), 200

    except Exception as e:
        dbQuito.session.rollback()
        print(str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/proveedor', methods=['PUT'])
def update_proveedor():
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400
    
    data = request.get_json()
    proveedor_id = data.get("proveedorID")
    tienda_id = data.get("tiendaID")
    if not proveedor_id or not tienda_id:
        return jsonify({"error": "Falta proveedorID o tiendaID"}), 400
    
    proveedor = Proveedor.query.filter_by(proveedorID=proveedor_id, tiendaID=tienda_id).first()
    
    if not proveedor:
        return jsonify({"error": "Proveedor no encontrado"}), 404
    
    try:
        proveedor.nombreProveedor = data.get("nombreProveedor", proveedor.nombreProveedor)
        proveedor.ciudad = data.get("ciudad", proveedor.ciudad)
        proveedor.telefono = data.get("telefono", proveedor.telefono)    
        dbQuito.session.commit()
        return jsonify({"message": "Proveedor actualizado correctamente"}), 200
    
    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/empleadoInfo', methods=['PUT'])
def update_empleado():
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400
    
    data = request.get_json()
    empleado_id = data.get("empleadoID")
    if not empleado_id:
        return jsonify({"error": "Falta empleadoID"}), 400

    empleado = EmpleadoInfo.query.filter_by(empleadoID=empleado_id).first()
    
    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404
    
    try:
        empleado.nombreEmp = data.get("nombreEmp", empleado.nombreEmp)
        empleado.telefono = data.get("telefono", empleado.telefono)
        empleado.correo = data.get("correo", empleado.correo)
        dbQuito.session.commit()
        return jsonify({"message": "Empleado actualizado correctamente"}) , 200
    
    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/empleadoLaboral', methods=['PUT'])
def update_empleado_laboral():
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400
    
    data = request.get_json()
    empleado_id = data.get("empleadoID")
    tienda_id = data.get("tiendaID")
    
    if not empleado_id or not tienda_id:
        return jsonify({"error": "Falta empleadoID o tiendaID"}), 400

    empleado = EmpleadoLaboral.query.filter_by(empleadoID=empleado_id, tiendaID=tienda_id).first()
    
    if not empleado:
        return jsonify({"error": "Empleado no encontrado"}), 404

    try:
        empleado.salario = data.get("salario", empleado.salario)
        empleado.cargo = data.get("cargo", empleado.cargo)
        empleado.fechaIngreso = data.get("fechaIngreso", empleado.fechaIngreso)   
        dbQuito.session.commit()
        return jsonify({"message": "Empleado laboral actualizado correctamente"}), 200
    
    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": str(e)}), 500
    
    
@app.route("/api/clientes", methods=["GET"])
def get_clientes():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    clientes = ClienteGeneral.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([{"nombre": cliente.nombreCliente.strip()} for cliente in clientes])

@app.route("/api/empleados", methods=["GET"])
def get_empleados():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    empleados = EmpleadoGeneral.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([{"nombre": empleado.nombreEmp.strip()} for empleado in empleados])

@app.route("/api/productos", methods=["GET"])
def get_productos():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    productos = Producto.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2).all()
    return jsonify([{"nombre": producto.nombreProducto.strip()} for producto in productos])

@app.route("/api/tiendas", methods=["GET"])
def get_tiendas():
    tiendas = Tienda.query.all()
    return jsonify([{"nombre": tienda.nombreTienda.strip()} for tienda in tiendas])
@app.route("/api/cliente/<nombre>", methods=["GET"])
def get_cliente_por_nombre(nombre):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    cliente = ClienteGeneral.query.filter_by(nombreCliente=nombre.strip(), tiendaID=1 if tienda == "QUITO" else 2).first()
    
    if cliente:
        return jsonify({
            "nombre": cliente.nombreCliente,
            "telefono": cliente.telefono
        })
    else:
        return jsonify({"error": "Cliente no encontrado"}), 404


@app.route("/api/empleado/<nombre>", methods=["GET"])
def get_empleado_por_nombre(nombre):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    empleado = EmpleadoGeneral.query.filter_by(nombreEmp=nombre.strip(), tiendaID=1 if tienda == "QUITO" else 2).first()
    
    if empleado:
        return jsonify({
            "nombre": empleado.nombreEmp,
            "telefono": empleado.telefono
        })
    else:
        return jsonify({"error": "Empleado no encontrado"}), 404


@app.route("/api/proxima_factura", methods=["GET"])
def get_proxima_factura():
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    # Obtener la última factura de la tienda actual
    ultima_factura = Factura.query.filter_by(tiendaID=1 if tienda == "QUITO" else 2) \
                                  .order_by(Factura.facturaID.desc()).first()
    
    # Si hay facturas, sumamos 1 al último ID, sino empezamos en 1
    proximo_numero = ultima_factura.facturaID + 1 if ultima_factura else 1

    return jsonify({"numero_factura": f"N°{proximo_numero}"})

@app.route("/api/productos_tienda", methods=["GET"])
def get_productos_por_tienda():
    tienda = session.get("tienda")  # Obtener la tienda seleccionada en la sesión
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    # Determinar el ID de la tienda
    tienda_id = 1 if tienda == "QUITO" else 2

    # Filtrar los productos que pertenecen a la tienda seleccionada
    productos = Producto.query.filter_by(tiendaID=tienda_id).all()

    # Convertir los productos en un formato JSON
    return jsonify([{"nombre": producto.nombreProducto} for producto in productos])

@app.route("/api/producto_precio/<nombre>", methods=["GET"])
def get_precio_producto(nombre):
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    tienda_id = 1 if tienda == "QUITO" else 2

    producto = Producto.query.filter_by(nombreProducto=nombre.strip(), tiendaID=tienda_id).first()
    
    if producto:
        return jsonify({"precio": producto.precioProducto})
    else:
        return jsonify({"error": "Producto no encontrado"}), 404


@app.route('/clienteMembresia', methods=['PUT'])
def actualizar_cliente_membresia():
    tienda = session.get("tienda")
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400
    
    data = request.json
    cliente_id = data.get("clienteID")
    tienda_id = data.get("tiendaID")

    if not cliente_id or not tienda_id:
        return jsonify({"error": "clienteID y tiendaID son requeridos"}), 400
    
    cliente_membresia = clienteMembresia = ClienteMembresia.query.filter_by(clienteID=cliente_id, tiendaID=tienda_id).first()
    if not cliente_membresia:
        return jsonify({"error": "Membresía no encontrada"}), 404

    try:
        cliente_membresia.tipoMembresia = data.get("tipoMembresia", cliente_membresia.tipoMembresia)
        cliente_membresia.estado = data.get("estado", cliente_membresia.estado)
        cliente_membresia.puntos = data.get("puntos", cliente_membresia.puntos)
        dbQuito.session.commit()
        return jsonify({"message": "Membresía actualizada correctamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/clienteInfo', methods=['PUT'])
def actualizar_cliente_info():
    data = request.json
    cliente_id = data.get('clienteID')

    if not cliente_id:
        return jsonify({"error": "ID del cliente es requerido"}), 400

    cliente = ClienteInfo.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    try:
        cliente.nombreCliente = data.get('nombreCliente', cliente.nombreCliente)
        cliente.telefono = data.get('telefono', cliente.telefono)
        cliente.ciudad = data.get('ciudad', cliente.ciudad)
        dbQuito.session.commit()
        return jsonify({"message": "Cliente actualizado exitosamente"})
    
    except Exception as e:
        dbQuito.session.rollback()
        return jsonify({"error": f"Error al actualizar el cliente: {str(e)}"}), 500


@app.route("/api/clientes/<tienda>", methods=["GET"])
def get_cliente_por_tienda(tienda):
    # Ajustamos los nombres para que coincidan con las opciones del combo box
    tienda = tienda.strip().lower()
    if "quito" in tienda:
        tienda_id = 1
    elif "cumbayá" in tienda or "cumbaya" in tienda:
        tienda_id = 2
    else:
        return jsonify({"error": "Tienda no válida"}), 400

    clientes = ClienteGeneral.query.filter_by(tiendaID=tienda_id).all()
    return jsonify([{"nombre": cliente.nombreCliente.strip()} for cliente in clientes])


@app.route("/api/empleados/<tienda>", methods=["GET"])
def get_empleado_por_tienda(tienda):
    tienda = tienda.strip().lower()
    if "quito" in tienda:
        tienda_id = 1
    elif "cumbayá" in tienda or "cumbaya" in tienda:
        tienda_id = 2
    else:
        return jsonify({"error": "Tienda no válida"}), 400

    empleados = EmpleadoGeneral.query.filter_by(tiendaID=tienda_id).all()
    return jsonify([{"nombre": empleado.nombreEmp.strip()} for empleado in empleados])


@app.route("/api/productos/<tienda>", methods=["GET"])
def get_producto_por_tienda(tienda):
    tienda = tienda.strip().lower()
    if "quito" in tienda:
        tienda_id = 1
    elif "cumbayá" in tienda or "cumbaya" in tienda:
        tienda_id = 2
    else:
        return jsonify({"error": "Tienda no válida"}), 400

    productos = Producto.query.filter_by(tiendaID=tienda_id).all()
    return jsonify([{"nombre": producto.nombreProducto.strip()} for producto in productos])

if __name__ == '__main__':
    app.run(debug=True, port=8000)  
