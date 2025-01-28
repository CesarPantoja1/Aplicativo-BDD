from flask import Flask, render_template, request, jsonify, url_for, flash, redirect
from Modelo.database import dbQuito, ClienteInfo, ClienteMembresiaQuito, EmpleadoInfo, EmpleadoLaboralQuito, ProductoQuito, ProveedorQuito, FacturaQuito, DetalleFacturaQuito, Tienda

app = Flask(__name__, template_folder='Vista/templates', static_folder='Vista/static')
app.secret_key = "supersecretkey"

# Configura la conexión con SQL Server
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:P%40ssw0rd@26.236.136.95/Quito?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

dbQuito.init_app(app)

tienda = None

@app.route("/")
def ingreso():
    return render_template("ingreso.html")  

@app.route("/guardar", methods=["POST"])
def guardar():
    print("¡Ruta /guardar activada!")
    tienda = request.form.get("nombre_tienda")
    # Verificar si las credenciales son correctas
    if tienda == "QUITO" or tienda == "CUMBAYA":
        return render_template("home.html", usuario=tienda)  
    else:
        return render_template("ingreso.html") 

@app.route("/home")
def home():
    return render_template("home.html")  

@app.route("/clientesRegistro")
def clientesRegistro():
    return render_template("clientes.html")  

@app.route("/clientesInfo")
def clientesInfo():
    clientesInfo = ClienteInfo.query.all()
    return render_template("clientesInfo.html", clientesInfo=clientesInfo)  

@app.route("/clientesMembresia")
def clientesMembresia():
    clientesMembresia = ClienteMembresiaQuito.query.all()
    return render_template("clientesMembresia.html", clientesMembresia=clientesMembresia) 

@app.route("/register")
def register():
    return render_template("register.html")  

@app.route("/empleados")
def empleadoRegistro():
    return render_template("empleados.html") 

@app.route("/empleadosInfo")
def empleadoInfo():
    empleadosInfo = EmpleadoInfo.query.all()
    return render_template("empleadosInfo.html", empleadosInfo=empleadosInfo)  

@app.route("/empleadosLaboral")
def empleadoLaboral():
    empleadosLaboral = EmpleadoLaboralQuito.query.all()    
    return render_template("empleadosLaboral.html", empleadosLaboral=empleadosLaboral) 

@app.route("/producto")
def producto():
    productosQuito = ProductoQuito.query.all()
    return render_template("producto.html", productosQuito=productosQuito)   

@app.route("/proveedor")
def proveedor():
    proveedores = ProveedorQuito.query.all()
    return render_template("proveedor.html", proveedores=proveedores)  

@app.route("/factura")
def factura():
    facturas = FacturaQuito.query.all()
    return render_template("factura.html", facturas=facturas)  

@app.route("/detalleFactura")
def detalleFactura():
    detallesFactura = DetalleFacturaQuito.query.all()
    return render_template("detalleFactura.html", detallesFactura=detallesFactura) 

@app.route("/tienda")
def tienda():
    tiendas = Tienda.query.all()
    return render_template("tienda.html", tiendas=tiendas) 

# =========================================
# ============== EDICION ==================
# =========================================

@app.route("/getProductos", methods=["GET"])
def api_productos():
    productos = ProductoQuito.query.all()
    return jsonify([producto.to_dict() for producto in productos])


if __name__ == "__main__":
    # try:
    #     conn = pyodbc.connect(
    #         "DRIVER={ODBC Driver 17 for SQL Server};"
    #         "SERVER=DESKTOP-QMS69UL;"
    #         "DATABASE=Quito;"
    #         "UID=sa;"
    #         "PWD=P@ssw0rd;"
    #     )
    #     print("Conexión exitosa")
    # except pyodbc.Error as e:
    #     print("Error al conectar:", e) 
    
    app.run(debug=True)