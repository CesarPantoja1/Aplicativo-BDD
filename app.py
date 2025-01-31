from flask import Flask, render_template, request, jsonify, url_for, flash, redirect, session
from Modelo.database import dbQuito, ClienteMembresia, EmpleadoLaboral, Producto, Proveedor, Factura, DetalleFactura, Tienda, EmpleadoInfo, ClienteInfo, ClienteGeneral, EmpleadoGeneral

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
    clientesInfo = ClienteInfo.query.all()
    return render_template("clientesInfo.html", clientesInfo=clientesInfo)  

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
    empleadosInfo = EmpleadoInfo.query.all()
    return render_template("empleadosInfo.html", empleadosInfo=empleadosInfo) 

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

if __name__ == '__main__':
    app.run(debug=True, port=8000)  
