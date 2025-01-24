from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def ingreso():
    return render_template("ingreso.html")  

@app.route("/home")
def home():
    return render_template("home.html")  

@app.route("/clientesinfo")
def clientesInfo():
    return render_template("clientesinfo.html")  

@app.route("/clientesMembresia")
def clientesMembresia():
    return render_template("clientesMembresia.html") 

@app.route("/register")
def register():
    return render_template("register.html")  

@app.route("/empleadosInfo")
def empleadoInfo():
    return render_template("empleadosInfo.html")  

@app.route("/empleadosLaboral")
def empleadoLaboral():
    return render_template("empleadosLaboral.html")  

@app.route("/producto")
def producto():
    return render_template("producto.html")  

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
    app.run(debug=True)
