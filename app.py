from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import pyodbc

app = Flask(__name__, template_folder='Vista/templates', static_folder='Vista/static')

# Configura la conexión con SQL Server
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:P%40ssw0rd@26.236.136.95/Quito?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

dbQuito = SQLAlchemy(app)

class ProductoQuito(dbQuito.Model):
    __tablename__ = 'ProductoQuito'

    # Columnas
    productoID = dbQuito.Column(dbQuito.Integer, primary_key=True)
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  
    proveedorID = dbQuito.Column(dbQuito.Integer, nullable=False)
    nombreProducto = dbQuito.Column(dbQuito.String(20), nullable=False)
    precioProducto = dbQuito.Column(dbQuito.Float, nullable=False)
    stockProducto = dbQuito.Column(dbQuito.Integer, nullable=False)

    def __repr__(self):
        return f'<ProductoQuito {self.nombreProducto}>'

    def to_dict(self):
        return {
            "productoID": self.productoID,
            "tiendaID": self.tiendaID,
            "proveedorID": self.proveedorID,
            "nombreProducto": self.nombreProducto,
            "precioProducto": self.precioProducto,
            "stockProducto": self.stockProducto,
        }


@app.route("/producto")
def producto():
    productosQuito = ProductoQuito.query.all()
    return render_template("producto.html", productosQuito=productosQuito)  

@app.route("/ingreso")
def ingreso():
    return render_template("ingreso.html")  

@app.route("/")
def home():
    return render_template("home.html")  

@app.route("/clientesInfo")
def clientesInfo():
    return render_template("clientesInfo.html")  

@app.route("/clientesMembresia")
def clientesMembresia():
    return render_template("clientesMembresia.html") 

@app.route("/register")
def register():
    return render_template("register.html")  

@app.route("/empleadoInfo")
def empleadoInfo():
    return render_template("empleadosInfo.html")  

@app.route("/empleadoLaboral")
def empleadoLaboral():
    return render_template("empleadosLaboral.html")  



@app.route("/proveedor")
def proveedor():
    return render_template("proveedor.html")  

@app.route("/factura")
def factura():
    return render_template("factura.html")  

@app.route("/detalleFactura")
def detalleFactura():
    return render_template("detalleFactura.html") 

if __name__ == "__main__":
    try:
        conn = pyodbc.connect(
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER=DESKTOP-QMS69UL;"
            "DATABASE=Quito;"
            "UID=sa;"
            "PWD=P@ssw0rd;"
        )
        print("Conexión exitosa")
    except pyodbc.Error as e:
        print("Error al conectar:", e) 
    
    app.run(debug=True)