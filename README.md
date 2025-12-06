# GlobalMarket---UNEG
El proyecto se conecta al siguiente clúster:
mongodb+srv://omarecastell_db_user:5UQh6KyIJ3RdMpzW@cluster0.p34inet.mongodb.net

MongoDB Compass

Descargar desde:
https://www.mongodb.com/try/download/compass

 amazon_products.csv
(Estructura basada en productos reales de Amazon)

Cómo levantar el proyecto
 Conectar a MongoDB Atlas desde Compass

Abre MongoDB Compass

En New Connection, pega:
mongodb+srv://omarecastell_db_user:5UQh6KyIJ3RdMpzW@cluster0.p34inet.mongodb.net

Clic en Connect
Crear la base de datos GlobalMarket

En Compass, clic en Create Database

Nombre:GlobalMarket
Colección inicial:productos

Importar el dataset Amazon Products

Selecciona:GlobalMarket → productos
Clic en Import Data

Selecciona el archivo:amazon_products.csv
Formato: CSV

Importar
No se requiere "Try to parse dates" ya que este dataset no incluye fechas.

Índices recomendados (para rendimiento)
En la colección productos

Crear índices sobre:

product_id

category

title (ideal para búsquedas por texto)

índice de texto en title + description

Ejemplo:

En Compass → pestaña Indexes → Create Index

Consultas recomendadas (productos)
Todos los productos
db.productos.find()

 Producto por ID
db.productos.find({ product_id: "B00L3KNWJA" })

 Productos por categoría
db.productos.find({ category: "Electronics" })

 Productos arriba de un precio
db.productos.find({ price: { $gt: 500 } })

 Búsqueda por coincidencia en nombre
db.productos.find({ title: /laptop/i })

 Búsquedas de texto (recomendado para e-commerce)

Crear índice de texto:

db.productos.createIndex({ title: "text", description: "text" })


Consulta:

db.productos.find({
  $text: { $search: "gaming laptop" }
})


Búsqueda con relevancia:

db.productos.find(
  { $text: { $search: "laptop pro" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })

Consultas de análisis (sin ventas)

Aunque no hay ventas, puedes analizar tu catálogo:

Cantidad de productos por categoría
db.productos.aggregate([
  { $group: { _id: "$category", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])

Precio promedio por categoría
db.productos.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
])

Productos más caros
db.productos.find().sort({ price: -1 }).limit(10)

 Uso de Explain Plan

Escribe una consulta en Compass

Haz clic en Explain Plan

Observa:

COLLSCAN = lento

IXSCAN = optimizado
