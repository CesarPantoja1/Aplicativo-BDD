from flask_sqlalchemy import SQLAlchemy

dbQuito = SQLAlchemy()

class Tienda(dbQuito.Model):
    __tablename__ = 'Tienda'

    # Columnas
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Llave primaria
    nombreTienda = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    ubicacion = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo

    def __repr__(self):
        return f'<Tienda {self.nombreTienda}>'

    def to_dict(self):
        return {
            "tiendaID": self.tiendaID,
            "nombreTienda": self.nombreTienda,
            "ubicacion": self.ubicacion,
            "telefono": self.telefono,
        }
              
# VISTAS

class ClienteMembresia(dbQuito.Model):
    __tablename__ = 'Cliente_Membresia'

    # Columnas
    clienteID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tipoMembresia = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    estado = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    puntos = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo

    def __repr__(self):
        return f'<ClienteMembresia {self.clienteID}>'

    def to_dict(self):
        return {
            "clienteID": self.clienteID,
            "tiendaID": self.tiendaID,
            "tipoMembresia": self.tipoMembresia,
            "estado": self.estado,
            "puntos": self.puntos,
        }

class EmpleadoLaboral(dbQuito.Model):
    __tablename__ = 'Empleado_Laboral'

    # Columnas
    empleadoID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    salario = dbQuito.Column(dbQuito.Float, nullable=False)  # Campo no nulo
    cargo = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    fechaIngreso = dbQuito.Column(dbQuito.Date, nullable=False)  # Tipo de dato fecha

    def __repr__(self):
        return f'<EmpleadoLaboral {self.empleadoID}>'

    def to_dict(self):
        return {
            "empleadoID": self.empleadoID,
            "tiendaID": self.tiendaID,
            "salario": self.salario,
            "cargo": self.cargo,
            "fechaIngreso": self.fechaIngreso.isoformat() if self.fechaIngreso else None,
        }

class Producto(dbQuito.Model):
    __tablename__ = 'Producto'

    # Columnas
    productoID = dbQuito.Column(dbQuito.Integer, primary_key=True)
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  
    proveedorID = dbQuito.Column(dbQuito.Integer, nullable=False)
    nombreProducto = dbQuito.Column(dbQuito.String(20), nullable=False)
    precioProducto = dbQuito.Column(dbQuito.Float, nullable=False)
    stockProducto = dbQuito.Column(dbQuito.Integer, nullable=False)

    def __repr__(self):
        return f'<Producto {self.nombreProducto}>'

    def to_dict(self):
        return {
            "productoID": self.productoID,
            "tiendaID": self.tiendaID,
            "proveedorID": self.proveedorID,
            "nombreProducto": self.nombreProducto,
            "precioProducto": self.precioProducto,
            "stockProducto": self.stockProducto,
        }       

class Proveedor(dbQuito.Model):
    __tablename__ = 'Proveedor'

    # Columnas
    proveedorID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    nombreProveedor = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    ciudad = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo

    def __repr__(self):
        return f'<Proveedor {self.proveedorID}>'

    def to_dict(self):
        return {
            "proveedorID": self.proveedorID,
            "tiendaID": self.tiendaID,
            "nombreProveedor": self.nombreProveedor,
            "ciudad": self.ciudad,
            "telefono": self.telefono,
        }

class Factura(dbQuito.Model):
    __tablename__ = 'Factura'

    # Columnas
    facturaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    empleadoID = dbQuito.Column(dbQuito.Integer, nullable=False)  # Clave foránea
    clienteID = dbQuito.Column(dbQuito.Integer, nullable=False)  # Clave foránea
    fechaFactura = dbQuito.Column(dbQuito.Date, nullable=False)  # Campo tipo fecha
    metodoPago = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    total = dbQuito.Column(dbQuito.Float, nullable=False)  # Campo tipo float

    def __repr__(self):
        return f'<Factura {self.facturaID} - Tienda {self.tiendaID}>'

    def to_dict(self):
        return {
            "facturaID": self.facturaID,
            "tiendaID": self.tiendaID,
            "empleadoID": self.empleadoID,
            "clienteID": self.clienteID,
            "fechaFactura": self.fechaFactura.isoformat() if self.fechaFactura else None,
            "metodoPago": self.metodoPago,
            "total": self.total,
        }

class DetalleFactura(dbQuito.Model):
    __tablename__ = 'Detalle_Factura'

    # Columnas
    numDetalle = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    facturaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    productoID = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    cantidad = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    precio = dbQuito.Column(dbQuito.Float, nullable=False)  # Campo tipo float

    def __repr__(self):
        return f'<DetalleFactura {self.numDetalle}>'

    def to_dict(self):
        return {
            "numDetalle": self.numDetalle,
            "tiendaID": self.tiendaID,
            "facturaID": self.facturaID,
            "productoID": self.productoID,
            "cantidad": self.cantidad,
            "precio": self.precio,
        }
        

class ClienteInfo(dbQuito.Model):
    _tablename_ = 'Cliente_Info'
    # Columnas
    clienteID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Llave primaria
    nombreCliente = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    ciudad = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    def _repr_(self):
        return f'<ClienteInfo {self.nombreCliente}>'
    def to_dict(self):
        return {
            "clienteID": self.clienteID,
            "nombreCliente": self.nombreCliente,
            "telefono": self.telefono,
            "ciudad": self.ciudad,
        }
              

class EmpleadoInfo(dbQuito.Model):
    _tablename_ = 'Empleado_Info'
    # Columnas
    empleadoID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Llave primaria
    nombreEmp = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    correo = dbQuito.Column(dbQuito.String(40), nullable=False)  # Convertir CHAR a String
    def _repr_(self):
        return f'<EmpleadoInfo {self.nombreEmp}>'
    def to_dict(self):
        return {
            "empleadoID": self.empleadoID,
            "nombreEmp": self.nombreEmp,
            "telefono": self.telefono,
            "correo": self.correo,
        }
        

dbCumbaya = SQLAlchemy()
    
