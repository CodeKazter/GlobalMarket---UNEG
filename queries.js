
//Este es el pipeline de top productos la coleccion de productos en Compass
[
  {
    $match:
      {
        rating: {
          $gte: 4.5
        },
        rating_count: {
          $gte: 50
        }
      }
  },
  {
    $sort: {
      rating: -1,
      rating_count: -1
    }
  },
  {
    $project: {
      _id: 0,
      product_name: 1,
      category: 1,
      rating: "$rating",
      reviews: "$rating_count",
      // Mostramos el número limpio
      price: "$discounted_price"
    }
  }
]

//Este es el pipeline de Bucket Pattern de la collecion productos en el Compass
[
  {
    $addFields:
      {
        precio_num: {
          $toDouble: {
            $replaceAll: {
              input: {
                $replaceAll: {
                  input: "$discounted_price",
                  find: "₹",
                  replacement: ""
                }
              },
              find: ",",
              replacement: ""
            }
          }
        }
      }
  },
  {
    $bucket: {
      groupBy: "$precio_num",
      boundaries: [0, 500, 2000, 100000],
      // 0-500, 500-2000, 2000+
      default: "Otros",
      output: {
        count: {
          $sum: 1
        },
        ejemplos: {
          $push: "$product_name"
        }
      }
    }
  },
  {
    $addFields:

      {
        etiqueta: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ["$_id", 0]
                },
                then: "Económico (0-500)"
              },
              {
                case: {
                  $eq: ["$_id", 500]
                },
                then: "Estándar (500-2000)"
              },
              {
                case: {
                  $eq: ["$_id", 2000]
                },
                then: "Premium (+2000)"
              }
            ],
            default: "Desconocido"
          }
        }
      }
  }
]

//por ultimo este es para hacer el query de $search, con una busqueda de ejemplo para buscar un cargador
// escrito mal a proposito ("Charge") para demostrar la funcionalidad de la busqueda difusa.
//Tambien esta ubicado en la coleccion de productos de la BD de amazon
[
  {
    $search:
      {
        index: "productos",
        text: {
          query: "Charge",
          path: ["product_name", "about_product"],
          // Campos donde buscar
          fuzzy: {
            maxEdits: 1,
            // Permite hasta 1 error (edición)
            prefixLength: 2
          }
        }
      }
  },
  {
    $project: {
      _id: 0,
      product_name: 1,
      about_product: 1,
      score: {
        $meta: "searchScore"
      }
    }
  }
]

//esto esta formateado de forma que se cargue en MongoShell usando:
// db.productos.aggregate([pipeline seleccionado]) o en su defecto, cargado en Compass via la pestaña
// "text" en aggregations