from flask_sqlalchemy import SQLAlchemy

dbQuito = SQLAlchemy()

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

class ClienteInfoQuito(dbQuito.Model):
    __tablename__ = 'Cliente_Info'

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
        
