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


class ClienteInfo(dbQuito.Model):
    __tablename__ = 'Cliente_Info'

    # Columnas
    clienteID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Llave primaria
    nombreCliente = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    ciudad = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String

    def __repr__(self):
        return f'<ClienteInfo {self.nombreCliente}>'

    def to_dict(self):
        return {
            "clienteID": self.clienteID,
            "nombreCliente": self.nombreCliente,
            "telefono": self.telefono,
            "ciudad": self.ciudad,
        }

class ClienteMembresiaQuito(dbQuito.Model):
    __tablename__ = 'Cliente_MembresiaQuito'

    # Columnas
    clienteID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tipoMembresia = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    estado = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    puntos = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo

    def __repr__(self):
        return f'<ClienteMembresiaQuito {self.clienteID}>'

    def to_dict(self):
        return {
            "clienteID": self.clienteID,
            "tiendaID": self.tiendaID,
            "tipoMembresia": self.tipoMembresia,
            "estado": self.estado,
            "puntos": self.puntos,
        }

class EmpleadoInfo(dbQuito.Model):
    __tablename__ = 'Empleado_Info'

    # Columnas
    empleadoID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Llave primaria
    nombreEmp = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    correo = dbQuito.Column(dbQuito.String(40), nullable=False)  # Convertir CHAR a String

    def __repr__(self):
        return f'<EmpleadoInfo {self.nombreEmp}>'

    def to_dict(self):
        return {
            "empleadoID": self.empleadoID,
            "nombreEmp": self.nombreEmp,
            "telefono": self.telefono,
            "correo": self.correo,
        }

class EmpleadoLaboralQuito(dbQuito.Model):
    __tablename__ = 'Empleado_LaboralQuito'

    # Columnas
    empleadoID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    salario = dbQuito.Column(dbQuito.Float, nullable=False)  # Campo no nulo
    cargo = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    fechaIngreso = dbQuito.Column(dbQuito.Date, nullable=False)  # Tipo de dato fecha

    def __repr__(self):
        return f'<EmpleadoLaboralQuito {self.empleadoID} - {self.tiendaID} - {self.cargo}>'

    def to_dict(self):
        return {
            "empleadoID": self.empleadoID,
            "tiendaID": self.tiendaID,
            "salario": self.salario,
            "cargo": self.cargo,
            "fechaIngreso": self.fechaIngreso.isoformat() if self.fechaIngreso else None,
        }

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

class ProveedorQuito(dbQuito.Model):
    __tablename__ = 'ProveedorQuito'

    # Columnas
    proveedorID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    nombreProveedor = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    ciudad = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    telefono = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo

    def __repr__(self):
        return f'<ProveedorQuito {self.proveedorID} - {self.tiendaID} - {self.nombreProveedor}>'

    def to_dict(self):
        return {
            "proveedorID": self.proveedorID,
            "tiendaID": self.tiendaID,
            "nombreProveedor": self.nombreProveedor,
            "ciudad": self.ciudad,
            "telefono": self.telefono,
        }

class FacturaQuito(dbQuito.Model):
    __tablename__ = 'FacturaQuito'

    # Columnas
    facturaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    empleadoID = dbQuito.Column(dbQuito.Integer, nullable=False)  # Clave foránea
    clienteID = dbQuito.Column(dbQuito.Integer, nullable=False)  # Clave foránea
    fechaFactura = dbQuito.Column(dbQuito.Date, nullable=False)  # Campo tipo fecha
    metodoPago = dbQuito.Column(dbQuito.String(20), nullable=False)  # Convertir CHAR a String
    total = dbQuito.Column(dbQuito.Float, nullable=False)  # Campo tipo float

    def __repr__(self):
        return f'<FacturaQuito {self.facturaID} - Tienda {self.tiendaID}>'

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

class DetalleFacturaQuito(dbQuito.Model):
    __tablename__ = 'Detalle_FacturaQuito'

    # Columnas
    numDetalle = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    tiendaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    facturaID = dbQuito.Column(dbQuito.Integer, primary_key=True)  # Parte de la clave primaria
    productoID = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    cantidad = dbQuito.Column(dbQuito.Integer, nullable=False)  # Campo no nulo
    precio = dbQuito.Column(dbQuito.Float, nullable=False)  # Campo tipo float

    def __repr__(self):
        return f'<DetalleFacturaQuito NumDetalle: {self.numDetalle}, FacturaID: {self.facturaID}, TiendaID: {self.tiendaID}>'

    def to_dict(self):
        return {
            "numDetalle": self.numDetalle,
            "tiendaID": self.tiendaID,
            "facturaID": self.facturaID,
            "productoID": self.productoID,
            "cantidad": self.cantidad,
            "precio": self.precio,
        }
        
dbCumbaya = SQLAlchemy()

