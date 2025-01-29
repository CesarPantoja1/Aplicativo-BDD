from flask import Flask, render_template, request, jsonify, url_for, flash, redirect, session
from Modelo.database import dbQuito, ClienteMembresia, EmpleadoLaboral, Producto, Proveedor, Factura, DetalleFactura, Tienda, EmpleadoInfo, ClienteInfo, ClienteGeneral

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
    return render_template("producto.html", productosQuito=Producto)   

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


@app.route("/insertCliente", methods=["POST"])
def insert_cliente():
    tienda = session.get("tienda")  
    if not tienda:
        return jsonify({"error": "No se ha seleccionado una tienda"}), 400

    data = request.json 

    try:
        nuevo_cliente = ClienteGeneral(
            clienteID=data.get("clienteID"),
            tiendaID=1 if tienda == "QUITO" else 2,
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



if __name__ == '__main__':
    app.run(debug=True, port=8000)  
